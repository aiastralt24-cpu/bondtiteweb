export function CampaignDvc() {
  return (
    <section className="dvc" aria-label="Bondtite campaign film">
      <video
        className="dvc__video"
        aria-label="Bondtite campaign film with Ranbir Kapoor"
        autoPlay
        loop
        muted
        playsInline
        poster="/assets/campaign/ranbir-slider-image.png"
      >
        <source src="/assets/campaign/ranbir-kapoor-bondtite.mp4" type="video/mp4" />
      </video>
    </section>
  );
}
