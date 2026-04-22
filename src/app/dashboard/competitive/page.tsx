import { redirect } from "next/navigation";

/** Old path; competitive lives at /competitive (same tier as /dashboard). */
export default function LegacyCompetitiveRedirect() {
  redirect("/competitive");
}
