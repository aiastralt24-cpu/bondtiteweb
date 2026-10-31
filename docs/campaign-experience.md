# Campaign experience

The homepage leads with the existing approved campaign assets. The dedicated `/campaign` route offers the same film and Hydra+ story for campaign traffic. The new DVC has not yet been supplied.

## Replacing the campaign

Update `lib/campaign.ts` with the film, poster, featuring credit and caption file together. The hero headline is “Bondtite. Lakadi ka Chumbak.” in `components/hero.tsx`. Update campaign metadata if the cast changes. The chair feature has been removed and the earlier Hydra+ bonding layout restored.

Use a composition that keeps the subject and product clear in both desktop and mobile crops. Supply a WebVTT caption track alongside the final film. No caption text or new campaign footage has been fabricated. The hero plays the existing film muted and looping over a poster extracted from that film, beneath a dark gradient. A visible control pauses or resumes it. Playback pauses offscreen, in hidden tabs, and while the full-film dialog is open. Reduced-motion and Save-Data users initially see the poster without downloading video; they can explicitly start playback. A native video link remains available without JavaScript. Closing the dialog pauses and releases the media, then restores focus to the opener.

## Motion system

- Easing: `cubic-bezier(.22,1,.36,1)` for entrances and product handoffs.
- Feedback: 180 ms for buttons and ordinary route content.
- Product entrance: 220 ms opacity fade on the decoded destination image. No cloned packs, size morphing, or hidden destination images. Next handles routing, history and focus.
- Film entrance: 260 ms, small vertical travel and scale.
- Hero entrance: 650 ms with 60–160 ms stagger offsets.
- Bonding demonstration: existing 650 ms surface transforms and 240 ms opacity changes, driven by Prepare / Apply / Press buttons. The earlier desktop scroll sequence and pin are restored; smaller screens retain button navigation.
- Product hover: 7 px lift; application imagery: 1.035 scale. The hero film is the only ambient loop.

Reduced-motion mode shows final hero states, skips route handoffs, and changes bonding states instantly. Motion requires neither a new dependency nor an alternate router. Pending product handoffs clean up after 1.8 seconds, on history navigation, resize, a new navigation, preference changes or unmount; the real route is never delayed for animation. Unrelated page links retain their normal behavior.

## Launch checks

Production build and catalogue checks are necessary but do not establish real-device performance. Target LCP below 2.5 seconds, INP below 200 ms and CLS below 0.1 on representative mobile connections. Recheck Safari, a mid-range Android device, caption timing and the final mobile crop once the new campaign assets are available.
