"use client";

import {isUsablePhone} from "@/lib/phone";
import { useState, useRef, useEffect, type FormEvent } from "react";

const topics = ["Product selection", "Technical support", "Project / specification enquiry", "Dealer / distributor enquiry", "Product availability", "Technical document request", "Complaint / product issue", "General enquiry"];

export function ContactDesk({ productName, documentation, products, project, dealer = false }: { productName?: string; documentation: boolean; products: string[]; dealer?: boolean; project?: string }) {
  const submission=useRef({payload:'',key:''});
  const [busy,setBusy]=useState(false);
  const [reference,setReference]=useState('');
  const [error,setError]=useState('');
  const success = useRef<HTMLHeadingElement>(null);
  useEffect(() => { if(reference) { success.current?.focus({preventScroll:true}); success.current?.scrollIntoView({block:"center",behavior:"instant"}); } }, [reference]);
  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); if(busy)return; setBusy(true);setError('');
    const data=new FormData(event.currentTarget);
    if(!isUsablePhone(data.get('mobile'))){setError('Enter a valid mobile number, including your country code if needed.');setBusy(false);event.currentTarget.querySelector<HTMLInputElement>('input[name="mobile"]')?.focus();return;}
    const payload=JSON.stringify({...Object.fromEntries(data),source_page:window.location.origin+window.location.pathname,consent:data.get('consent')==='on'});
    if(submission.current.payload!==payload)submission.current={payload,key:crypto.randomUUID()};
    try { const response=await fetch('/api/leads',{method:'POST',headers:{'Content-Type':'application/json','Idempotency-Key':submission.current.key},body:payload});const result=await response.json();if(!response.ok)throw new Error(result.error||'Please try again.');setReference(result.id); }catch(e){setError(e instanceof Error?e.message:'Please try again.');}finally{setBusy(false);}
  }
  if(reference)return <div className="enquiry-desk" role="status"><h2 ref={success} tabIndex={-1}>Thank you. We’ve received your enquiry.</h2><p>Our team will use the details you shared to help with your request.</p><p>Enquiry reference: {reference.slice(0,8).toUpperCase()}</p><button type="button" className="button button--primary" onClick={()=>{submission.current={payload:'',key:''};setReference('');}}>Send another enquiry</button></div>;

  return <form className="enquiry-desk" aria-label="Contact Bondtite" onSubmit={handleSubmit}>
    <label className="enquiry-trap" aria-hidden="true">Website<input name="website" tabIndex={-1} autoComplete="off" /></label><p className="enquiry-desk__required">Fields marked * are required.</p>
    <fieldset className="enquiry-desk__group">
      <legend>Your details</legend>
      <div className="enquiry-desk__grid">
      <div className="enquiry-desk__field"><label htmlFor="enquiry-name">Your name <span aria-hidden="true">*</span></label><input id="enquiry-name" name="name" autoComplete="name" required maxLength={100} pattern=".*\S.*" placeholder="Enter your name" /></div>
      <div className="enquiry-desk__field"><label htmlFor="enquiry-mobile">Mobile number <span aria-hidden="true">*</span></label><input id="enquiry-mobile" name="mobile" type="tel" autoComplete="tel" required minLength={7} maxLength={25} pattern="\+?[0-9\s\(\)\-]{7,25}" title="Enter a valid phone number, including your country code if needed." placeholder="+91 98765 43210" /></div>
      </div>
    </fieldset>
    <fieldset className="enquiry-desk__group">
      <legend>Your enquiry</legend>
      <div className="enquiry-desk__grid">
      <div className="enquiry-desk__field"><label htmlFor="enquiry-topic">Enquiry type <span aria-hidden="true">*</span></label><select id="enquiry-topic" name="topic" required defaultValue={documentation ? "Technical document request" : dealer ? "Dealer / distributor enquiry" : project ? "Product selection" : ""}><option value="" disabled>Select an enquiry type</option>{topics.map(topic => <option key={topic}>{topic}</option>)}</select></div>
      <div className="enquiry-desk__field enquiry-desk__field--wide"><label htmlFor="enquiry-product">Product interest</label><select id="enquiry-product" name="product" defaultValue={productName ?? ""}><option value="">Not sure yet</option>{products.map(name => <option key={name}>{name}</option>)}</select></div>
      <div className="enquiry-desk__field enquiry-desk__field--wide"><label htmlFor="enquiry-message">Application or project details <span aria-hidden="true">*</span></label><textarea id="enquiry-message" name="message" defaultValue={project} required maxLength={1500} rows={5} placeholder="Describe the surfaces, application and working conditions." /></div>
      </div>
    </fieldset>
    <details className="enquiry-desk__optional"><summary>Add optional details</summary><div className="enquiry-desk__grid">      <div className="enquiry-desk__field"><label htmlFor="enquiry-email">Email address <span>(optional)</span></label><input id="enquiry-email" name="email" type="email" autoComplete="email" maxLength={254} placeholder="Enter your email address" /></div>
      <div className="enquiry-desk__field"><label htmlFor="enquiry-city">City <span>(optional)</span></label><input id="enquiry-city" name="city" autoComplete="address-level2" maxLength={100} placeholder="Enter your city" /></div>
      <div className="enquiry-desk__field"><label htmlFor="enquiry-role">I am a <span>(optional)</span></label><select id="enquiry-role" name="role" defaultValue=""><option value="">Select an option</option>{["Home user", "Contractor / applicator", "Architect / consultant", "Dealer / distributor", "Industrial / OEM"].map(role => <option key={role}>{role}</option>)}</select></div>
</div></details>
    <div className="enquiry-desk__footer">
<p className="form-privacy-note">Read how we use your details in our <a href="/privacy-policy" target="_blank" rel="noopener noreferrer">Privacy Policy (opens in a new tab)</a>.</p>
    <label className="enquiry-desk__consent"><input name="consent" type="checkbox" required /> <span>I agree that Bondtite may contact me about this enquiry.</span></label>
    <button className="enquiry-desk__action" type="submit" disabled={busy}>{busy?"Submitting…":"Submit"}</button>
    {error && <p className="enquiry-desk__status" role="alert">{error}</p>}
    </div>
  </form>;
}
