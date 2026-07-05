export const dynamic = "force-dynamic";

import React from "react";
import { getSettingsData } from "@/app/actions/settings";
import { redirect } from "next/navigation";
import ClientSettings from "./ClientSettings";

export default async function SettingsPage() {
  const { data, error, success } = await getSettingsData();

  if (!success || error === "Not authenticated") {
    redirect("/login");
  }

  return <ClientSettings initialData={data} />;
}
