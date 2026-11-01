'use client';
import { useState } from 'react';
import Link from 'next/link';

export function HydraMaterialCheck({ materials }: { materials: string[] }) {
  const [first, setFirst] = useState('Plywood');
  const [second, setSecond] = useState('Laminate');
  return <div className="hydra-material-check">
    <h3>What are you bonding?</h3>
    <p>Choose from Hydra+’s compatible materials to ask for guidance on your application.</p>
    <div className="hydra-material-check__fields">
      <label>First material<select aria-label="First material" value={first} onChange={event => setFirst(event.target.value)}>{materials.map(material => <option key={material}>{material}</option>)}</select></label>
      <label>Second material<select aria-label="Second material" value={second} onChange={event => setSecond(event.target.value)}>{materials.map(material => <option key={material}>{material}</option>)}</select></label>
    </div>
    <Link href={`/contact?product=bondtite-hydra&project=${encodeURIComponent(`Please advise on using Bondtite Hydra+ to bond ${first} and ${second}.`)}`}>Get guidance for these materials</Link>
  </div>;
}
