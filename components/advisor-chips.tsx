"use client";
import { useId, useState } from 'react';

type Choice = { value: string; label: string };
export function AdvisorChips({ label, value, options, onChange, compact = false }: {
  label: string; value: string; options: Choice[]; onChange: (value: string) => void; compact?: boolean;
}) {
  const name = useId();
  const [expanded, setExpanded] = useState(false);
  const visible = compact && !expanded ? options.filter((option, index) => index < 8 || option.value === value || option.value === 'Other / not sure') : options;
  return <fieldset className="advisor-chip-group"><legend>{label}</legend><div className="advisor-chip-list">{visible.map(option => <label className="advisor-chip" key={option.value}><input type="radio" name={name} value={option.value} checked={value === option.value} onChange={() => onChange(option.value)} /><span>{option.label}</span></label>)}</div>{compact && options.length > 8 && <button type="button" className="advisor-chip-more" aria-expanded={expanded} onClick={() => setExpanded(!expanded)}>{expanded ? 'Fewer materials' : 'More materials'}</button>}</fieldset>;
}
