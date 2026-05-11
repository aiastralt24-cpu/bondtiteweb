"use client";

import { useEffect, useRef, useState } from "react";

export function CampaignDvc() {
  const sectionRef = useRef<HTMLElement>(null);
  const [shouldLoadVideo, setShouldLoadVideo] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoadVideo(true);
          observer.disconnect();
        }
      },
      { rootMargin: "420px 0px" }
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  return (
    <section className="dvc" aria-label="Bondtite campaign film" ref={sectionRef}>
      <video
        className="dvc__video"
        aria-label="Bondtite campaign film with Ranbir Kapoor"
        autoPlay
        loop
        muted
        playsInline
        preload="none"
        poster="/assets/campaign/ranbir-slider-image.png"
      >
        {shouldLoadVideo ? (
          <source src="/assets/campaign/ranbir-kapoor-bondtite.mp4" type="video/mp4" />
        ) : null}
      </video>
    </section>
  );
}
