import React from "react";
import ClientDashboard from "./ClientDashboard";
import { getDashboardData } from "@/app/actions/dashboard";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  try {
    const data = await getDashboardData();
    return <ClientDashboard initialData={data} />;
  } catch (error) {
    // If not authenticated, redirect to login
    redirect("/login");
  }
}
