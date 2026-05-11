import type { Stat } from "@/lib/types";

export function LegacyStats({ stats }: { stats: Stat[] }) {
  return (
    <section className="stats" id="legacy">
      <div className="container">
        <div className="stats__grid">
          {stats.map((stat) => (
            <div className="stat" key={stat.label}>
              <strong>
                {stat.value}
                {stat.suffix ? <sup>{stat.suffix}</sup> : null}
              </strong>
              <span>{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
