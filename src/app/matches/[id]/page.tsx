import React from "react";
import { notFound, redirect } from "next/navigation";
import ClientProfilePreview from "./ClientProfilePreview";
import { getProfileById } from "@/app/actions/profile";

export default async function MatchesDetailPage({ params }: { params: { id: string } }) {
  const { data: profile, error } = await getProfileById(params.id);

  if (error === "Not authenticated") {
    redirect("/login");
  }

  if (!profile || error === "Profile not found") {
    notFound();
  }

  return <ClientProfilePreview initialProfile={profile} />;
}
