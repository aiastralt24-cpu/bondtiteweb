"use client";

import {isUsablePhone} from "@/lib/phone";
import { useEffect, useRef, useState, type FormEvent } from "react";

export function TdsDownload({ productName, productSlug }: { productName: string; productSlug: string }) {
  const submission = useRef({payload:"",key:""});
  const dialog = useRef<HTMLDialogElement>(null);
  const successClose = useRef<HTMLButtonElement>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [downloadUrl, setDownloadUrl] = useState("");
  useEffect(() => {
    if (downloadUrl && dialog.current?.open) successClose.current?.focus();
    return () => { if (downloadUrl) URL.revokeObjectURL(downloadUrl); };
  }, [downloadUrl]);
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if(busy)return;
    setBusy(true); setError("");
    const data = new FormData(event.currentTarget);
    if(!isUsablePhone(data.get('mobile'))){setError('Enter a valid mobile number, including your country code if needed.');setBusy(false);event.currentTarget.querySelector<HTMLInputElement>('input[name="mobile"]')?.focus();return;}
    const payload=JSON.stringify({ product: productSlug, source_page:window.location.origin+window.location.pathname, name: data.get("name"), mobile: data.get("mobile"), consent: data.get("consent") === "on", website:data.get("website") });
    if(submission.current.payload!==payload)submission.current={payload,key:crypto.randomUUID()};
    try {
      const response = await fetch("/api/tds", { method: "POST", headers: { "Content-Type": "application/json", "Idempotency-Key":submission.current.key }, body: payload });
      if (!response.ok) throw new Error(await response.text() || "Please try again.");
      const url = URL.createObjectURL(await response.blob());
      const link = document.createElement("a"); link.href = url; link.download = `${productSlug}-tds.pdf`; document.body.appendChild(link); link.click(); link.remove();
      setDownloadUrl(url);
    } catch (error) { setError(error instanceof Error ? error.message : "Please try again."); }
    finally { setBusy(false); }
  }
  return <>
    <button className="button hydra-tds-button" type="button" onClick={() => { setError(""); dialog.current?.showModal(); }}>Download TDS </button>
    <dialog ref={dialog} className="tds-dialog" aria-labelledby="tds-title" aria-describedby="tds-description">
      <button className="tds-dialog__close" type="button" aria-label="Close TDS form" onClick={() => dialog.current?.close()}>×</button>
      <span className="mono">Technical data sheet</span>
      <h2 id="tds-title">{downloadUrl ? "Your TDS is ready." : `Get the ${productName} TDS.`}</h2>
      <p id="tds-description">{downloadUrl ? "Your details have been saved. The download has been requested in your browser." : "Enter your details to download the official technical data sheet."}</p>
      {downloadUrl ? <div className="tds-dialog__success">
        <p role="status">Thank you. You can now close this window.</p>
        <button ref={successClose} className="button button--primary" type="button" onClick={() => dialog.current?.close()}>Close</button>
        <p>Need the file? <a href={downloadUrl} download={`${productSlug}-tds.pdf`}>Download again</a></p>
      </div> : <form onSubmit={submit}>
        <label className="enquiry-trap" aria-hidden="true">Website<input name="website" tabIndex={-1} autoComplete="off" /></label>
        <label htmlFor="tds-name">Full name <span>*</span></label><input id="tds-name" name="name" autoComplete="name" required minLength={2} maxLength={100} pattern=".*\S.*" />
        <label htmlFor="tds-mobile">Mobile number <span>*</span></label><input id="tds-mobile" name="mobile" type="tel" autoComplete="tel" placeholder="+91 98765 43210" required pattern="\+?[0-9\s\(\)\-]{7,25}" maxLength={25} />
<p className="form-privacy-note">Read how we use your details in our <a href="/privacy-policy" target="_blank" rel="noopener noreferrer">Privacy Policy (opens in a new tab)</a>.</p>
        <label className="tds-dialog__consent"><input name="consent" type="checkbox" required /><span>I agree to the use of these details to process this TDS download.</span></label>
        <button className="button button--primary" type="submit" disabled={busy}>{busy ? "Preparing download…" : "Submit & download"}</button>
        {error && <p role="alert">{error}</p>}
      </form>}
    </dialog>
  </>;
}
