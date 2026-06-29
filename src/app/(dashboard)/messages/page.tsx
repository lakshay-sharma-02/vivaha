import { Metadata } from "next"
import { MessageSquare, Search } from "lucide-react"
import { Input } from "@/shared/ui/input/input"

export const metadata: Metadata = {
  title: "Messages",
}

export default function MessagesPage() {
  return (
    <div className="flex h-[calc(100vh-12rem)] flex-col space-y-6 md:flex-row md:space-x-6 md:space-y-0">
      {/* Conversation List */}
      <div className="flex w-full flex-col md:w-80 md:shrink-0">
        <div className="mb-4">
          <h1 className="font-playfair text-4xl font-semibold tracking-tight text-foreground">
            Messages
          </h1>
          <p className="mt-2 text-[15px] text-muted-foreground">
            Your conversations with matches.
          </p>
        </div>

        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="Search messages..." className="pl-9" />
        </div>

        <div className="flex-1 overflow-y-auto rounded-2xl border border-border/40 bg-card/30 backdrop-blur-md">
          {/* Empty state */}
          <div className="flex h-full flex-col items-center justify-center gap-4 p-8 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
              <MessageSquare className="h-8 w-8 text-primary/60" />
            </div>
            <div>
              <p className="font-medium text-foreground">No messages yet</p>
              <p className="mt-1 text-sm text-muted-foreground">
                Start a conversation by sending an interest from the Discover page.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Chat Panel */}
      <div className="hidden flex-1 flex-col items-center justify-center rounded-2xl border border-border/40 bg-card/30 p-8 backdrop-blur-md md:flex">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
          <MessageSquare className="h-10 w-10 text-primary/40" />
        </div>
        <p className="mt-6 text-xl font-medium text-foreground">
          Select a conversation
        </p>
        <p className="mt-2 text-center text-sm text-muted-foreground">
          Choose a match from the list to start messaging.
        </p>
      </div>
    </div>
  )
}
