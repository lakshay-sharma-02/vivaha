-- Express Interest / Swipe Right
CREATE OR REPLACE FUNCTION public.express_interest(target_user_id UUID) 
RETURNS UUID AS $$
DECLARE
    lesser_id UUID;
    greater_id UUID;
    existing_match_id UUID;
    existing_status match_status;
    new_match_id UUID;
BEGIN
    IF auth.uid() < target_user_id THEN
        lesser_id := auth.uid();
        greater_id := target_user_id;
    ELSE
        lesser_id := target_user_id;
        greater_id := auth.uid();
    END IF;

    SELECT id, status INTO existing_match_id, existing_status 
    FROM public.matches 
    WHERE user_a_id = lesser_id AND user_b_id = greater_id;

    IF existing_match_id IS NULL THEN
        INSERT INTO public.matches (user_a_id, user_b_id, status, action_by_id)
        VALUES (lesser_id, greater_id, 'pending', auth.uid())
        RETURNING id INTO new_match_id;
        RETURN new_match_id;
    ELSE
        IF existing_status = 'pending' AND action_by_id != auth.uid() THEN
            UPDATE public.matches 
            SET status = 'accepted', updated_at = NOW()
            WHERE id = existing_match_id;
            RETURN existing_match_id;
        END IF;
        
        RETURN existing_match_id;
    END IF;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
