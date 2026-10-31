import type { TaskId } from '@/lib/advisor-tasks';

const paths: Record<Exclude<TaskId, 'custom'>, string> = {
  repair: 'M20 12v26h26V12M20 20h26M16 38h34v8H16zM20 46v12M46 46v12M35 28l-5 6 5 5',
  build: 'M10 24l22-12 22 12-22 12zM10 24v8l22 12 22-12v-8M14 34v20M50 34v20M32 44v16',
  laminate: 'M8 22l24-12 24 12-24 12zM8 32l24 12 24-12M8 42l24 12 24-12',
  kitchen: 'M10 14h44v40H10zM32 14v40M10 28h44M26 34v9M38 34v9M14 54v5M50 54v5',
  foam: 'M16 32V20q0-6 6-6h20q6 0 6 6v12M16 28H9v22h46V28h-7v14H16zM16 34h32M15 50v8M49 50v8M32 16v18',
  acrylic: 'M12 18l30-8v38l-30 8zM22 16l30 8v32l-10-3M19 26l15-4M19 34l9-2',
};
export function AdvisorJobIcon({ job }: { job: Exclude<TaskId, 'custom'> }) {
  return <svg className="advisor-job-art" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={paths[job]} /></svg>;
}
