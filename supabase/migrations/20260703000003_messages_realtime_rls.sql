-- Setup Realtime and RLS for The Lounge (messages)

-- 1. Enable RLS on messages
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;

-- 2. Policies
-- A user can select messages if they are part of the match
CREATE POLICY "Users can view their own match messages"
    ON public.messages FOR SELECT
    USING (
        EXISTS (
            SELECT 1 FROM public.matches 
            WHERE matches.id = match_id 
            AND (matches.user_a_id = auth.uid() OR matches.user_b_id = auth.uid())
            AND matches.status = 'accepted'
        )
    );

-- A user can insert messages if they are part of the match and are the sender
CREATE POLICY "Users can send messages to their active matches"
    ON public.messages FOR INSERT
    WITH CHECK (
        auth.uid() = sender_id AND
        EXISTS (
            SELECT 1 FROM public.matches 
            WHERE matches.id = match_id 
            AND (matches.user_a_id = auth.uid() OR matches.user_b_id = auth.uid())
            AND matches.status = 'accepted'
        )
    );

-- A user can update read_at status if they are the recipient
CREATE POLICY "Users can mark messages as read"
    ON public.messages FOR UPDATE
    USING (
        sender_id != auth.uid() AND
        EXISTS (
            SELECT 1 FROM public.matches 
            WHERE matches.id = match_id 
            AND (matches.user_a_id = auth.uid() OR matches.user_b_id = auth.uid())
        )
    );

-- 3. Enable Realtime on Messages
ALTER PUBLICATION supabase_realtime ADD TABLE public.messages;
