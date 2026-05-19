import { redirect } from "next/navigation";
import { DEMO_DOC_ID } from "@/lib/mock-data";

export default function HomePage() {
  redirect(`/documents/${DEMO_DOC_ID}?tab=copilot`);
}
