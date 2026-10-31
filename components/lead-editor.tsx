'use client';
import { useState, type FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import type { Lead } from '@/lib/server/leads';
export function LeadEditor({lead,accounts}:{lead:Lead;accounts:string[]}) {
 const [busy,setBusy]=useState(false),[notice,setNotice]=useState(''),[error,setError]=useState('');
 const router=useRouter();
 async function submit(event:FormEvent<HTMLFormElement>){
  event.preventDefault();if(busy)return;setBusy(true);setError('');setNotice('');
  const body=new URLSearchParams(new FormData(event.currentTarget) as unknown as Record<string,string>);
  try{const response=await fetch('/api/admin/leads',{method:'POST',headers:{Accept:'application/json'},body});if(!response.ok){const text=await response.text();throw new Error(response.status===401?'Your session expired. Sign in again in another tab, then retry.':text.startsWith('{')?'Unable to save. Please retry.':text);}setNotice('Update saved.');router.refresh();}catch(e){setError(e instanceof Error?e.message:'Unable to save. Please retry.');}finally{setBusy(false);}
 }
 return <form className="crm-editor" onSubmit={submit}>
  <input type="hidden" name="id" value={lead.id}/><input type="hidden" name="version" value={lead.version}/>
  <label>Status<select name="status" defaultValue={lead.status}>{['new','contacted','qualified','closed'].map(s=><option key={s} value={s}>{s[0].toUpperCase()+s.slice(1)}</option>)}</select></label>
  <label>Assigned to<select name="assignee" defaultValue={lead.assignee}><option value="">Unassigned</option>{accounts.map(a=><option key={a}>{a}</option>)}</select></label>
  <label>Follow-up date (UTC)<input name="follow_up" type="date" defaultValue={lead.follow_up}/></label>
  <label className="crm-editor__notes">Internal notes<textarea name="notes" maxLength={4000} rows={3} defaultValue={lead.notes} placeholder="Record the conversation and next action."/></label>
  <div className="crm-editor__submit"><button disabled={busy} type="submit">{busy?'Saving…':'Save update'}</button>{notice&&<span role="status">{notice}</span>}{error&&<p role="alert">{error}</p>}</div>
 </form>;
}
export function PrintLeadReport(){return <button type="button" className="crm-secondary" onClick={()=>window.print()}>Print / save PDF</button>;}
