import { Metadata } from "next";
import ClientVerifications from "./ClientVerifications";

export const metadata: Metadata = {
  title: "Admin Verifications | Vivah",
  description: "Review and approve identity verification documents.",
};

export default function AdminVerificationsPage() {
  return <ClientVerifications />;
}
