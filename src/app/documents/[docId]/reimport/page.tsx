import Link from "next/link";
import { NavPrimary } from "@/components/csr/NavPrimary";
import { DEMO_DOC_ID } from "@/lib/mock-data";

export default function ReimportPage() {
  const back = `/documents/${DEMO_DOC_ID}?tab=copilot&overlay=version-history`;

  return (
    <div className="flex h-dvh overflow-hidden bg-white text-zinc-900">
      <div className="flex-1 border-r border-zinc-200 p-6 overflow-y-auto scroll-tame">
        <h1 className="text-zinc-900 font-semibold text-lg mb-2">Word export (v4.2)</h1>
        <p className="text-zinc-700 text-sm">SEC 10.1 edited offline. Compare before merge.</p>
        <div className="mt-4 rounded-lg border border-zinc-200 p-4 text-sm text-zinc-600">
          … disposition table paragraph with tracked changes …
        </div>
      </div>
      <div className="w-96 p-6 border-l border-zinc-200 flex flex-col">
        <h2 className="font-semibold text-zinc-900 mb-2">Merge to new version</h2>
        <p className="text-zinc-700 text-sm mb-4">Creates v6 working. Does not overwrite pinned v4.</p>
        <NavPrimary href={`/documents/${DEMO_DOC_ID}?tab=copilot&drift=1`}>Merge as v6</NavPrimary>
        <Link href={back} className="mt-3 text-zinc-500 text-sm underline">
          Cancel
        </Link>
      </div>
    </div>
  );
}
