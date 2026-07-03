import React from "react";
import ClientInterests from "./ClientInterests";
import { getInterests } from "@/app/actions/interests";
import { redirect } from "next/navigation";

export default async function InterestsPage() {
  try {
    const [received, sent, accepted, declined] = await Promise.all([
      getInterests("received"),
      getInterests("sent"),
      getInterests("accepted"),
      getInterests("declined")
    ]);

    if (received.error && received.error === "Not authenticated") {
      redirect("/login");
    }

    return (
      <ClientInterests 
        initialReceived={received.data || []}
        initialSent={sent.data || []}
        initialAccepted={accepted.data || []}
        initialDeclined={declined.data || []}
      />
    );
  } catch (err) {
    redirect("/login");
  }
}
