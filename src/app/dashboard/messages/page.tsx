import React, { Suspense } from "react";
import ClientMessages from "./ClientMessages";
import { getConversations } from "@/app/actions/messages";
import { redirect } from "next/navigation";

export default async function MessagesPage() {
  const { data, error } = await getConversations();

  if (error === "Not authenticated") {
    redirect("/login");
  }

  return (
    <Suspense fallback={<div className="h-full flex items-center justify-center">Loading The Lounge...</div>}>
      <ClientMessages initialConversations={data || []} />
    </Suspense>
  );
}
