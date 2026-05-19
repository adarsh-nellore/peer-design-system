export function docPath(docId: string, params: Record<string, string | undefined> = {}) {
  const p = new URLSearchParams();
  Object.entries(params).forEach(([k, v]) => {
    if (v) p.set(k, v);
  });
  const q = p.toString();
  return q ? `/documents/${docId}?${q}` : `/documents/${docId}`;
}

/** Resolves compact mock href tokens into real app routes. */
export function resolveActionHref(docId: string, token: string, fallbackTab = "copilot"): string {
  if (token.startsWith("section:")) {
    const [section, ...rest] = token.replace("section:", "").split("&");
    const extra: Record<string, string> = { tab: fallbackTab, section };
    rest.forEach((pair) => {
      const [k, v] = pair.split("=");
      if (k && v) extra[k] = v;
    });
    return docPath(docId, extra);
  }
  if (token.startsWith("tab:")) {
    const qs = token.replace("tab:", "");
    const p = new URLSearchParams(qs);
    const out: Record<string, string> = {};
    p.forEach((v, k) => {
      out[k] = v;
    });
    return docPath(docId, out);
  }
  if (token.startsWith("overlay:")) {
    return docPath(docId, { tab: fallbackTab, overlay: token.replace("overlay:", "") });
  }
  if (token === "path:reimport") {
    return `/documents/${docId}/reimport`;
  }
  if (token.startsWith("dismiss:")) {
    return docPath(docId, { tab: fallbackTab });
  }
  return docPath(docId, { tab: fallbackTab });
}
