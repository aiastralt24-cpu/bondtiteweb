// Official Astral documents reviewed 29 September 2026. Files are served only after lead capture.
export const tdsDocuments: Record<string, {file: string; source: string}> = {
  "bondtite-fast-and-clear": {
    "file": "bondtite-fast-and-clear-tds.pdf",
    "source": "https://www.astraladhesives.com/media/catalog/product/attachment/b/o/bondtite_fast_clear_-_new_tds.pdf"
  },
  "bondtite-strong-and-clear": {
    "file": "bondtite-strong-and-clear-tds.pdf",
    "source": "https://www.astraladhesives.com/media/catalog/product/attachment/b/o/bondtite_strong_clear_-_new_tds.pdf"
  },
  "bondtite-rapid": {
    "file": "bondtite-rapid-tds.pdf",
    "source": "https://www.astraladhesives.com/media/catalog/product/attachment/b/o/bondtite_rapid_-_new_tds.pdf"
  },
  "bondtite-super-strength": {
    "file": "bondtite-super-strength-tds.pdf",
    "source": "https://www.astraladhesives.com/media/catalog/product/attachment/b/o/bondtite_super_strength_-_new_tds.pdf"
  },
  "bondtite-metallic": {
    "file": "bondtite-metallic-tds.pdf",
    "source": "https://www.astraladhesives.com/media/catalog/product/attachment/b/o/bondtite_metallic_-_new_tds.pdf"
  },
  "bondtite-white-paste": {
    "file": "bondtite-white-paste-tds.pdf",
    "source": "https://www.astraladhesives.com/media/catalog/product/attachment/b/o/bondtite_white_paste-tds.pdf"
  },
  "bondtite-wood": {
    "file": "bondtite-wood-tds.pdf",
    "source": "https://www.astraladhesives.com/media/catalog/product/attachment/t/d/tds_-_bondtite_wood.pdf"
  },
  "bondtite-foambond": {
    "file": "bondtite-foambond-tds.pdf",
    "source": "https://www.astraladhesives.com/media/catalog/product/attachment/t/d/tds_-_bondtite_foam_bond_sr.pdf"
  },
  "bondtite-heatbond": {
    "file": "bondtite-heatbond-tds.pdf",
    "source": "https://www.astraladhesives.com/media/catalog/product/attachment/t/d/tds_-_bondtite_heatbond_-_sr.pdf"
  },
  "bondtite-multibond": {
    "file": "bondtite-multibond-tds.pdf",
    "source": "https://www.astraladhesives.com/media/catalog/product/attachment/t/d/tds_-_bondtite_multibond_sr.pdf"
  },
  "bondtite-wpc-fix": {
    "file": "bondtite-wpc-fix-tds.pdf",
    "source": "https://www.astraladhesives.com/media/catalog/product/attachment/t/d/tds_-_bondtite_wpc_fix.pdf"
  },
  "bondtite-multifix": {
    "file": "bondtite-multifix-tds.pdf",
    "source": "https://www.astraladhesives.com/media/catalog/product/attachment/t/d/tds_-_bondtite_multifix.pdf"
  },
  "bondtite-acrylic-fix": {
    "file": "bondtite-acrylic-fix-tds.pdf",
    "source": "https://www.astraladhesives.com/media/catalog/product/attachment/t/d/tds_-_bondtite_acrylic_fix.pdf"
  },
  "clearbond": {
    "file": "clearbond-tds.pdf",
    "source": "https://www.astraladhesives.com/media/catalog/product/attachment/t/d/tds_-_bondtite_clearbond.pdf"
  },
  "bondtite-quick": {
    "file": "bondtite-quick-tds.pdf",
    "source": "https://www.astraladhesives.com/media/catalog/product/attachment/b/o/bondtite_quick_-_new_tds.pdf"
  },
  "bondtite-quik-spray": {
    "file": "bondtite-quik-spray-tds.pdf",
    "source": "https://www.astraladhesives.com/media/catalog/product/attachment/t/d/tds_-_bondtite_quick_spray.pdf"
  },
  "bondtite-total": {
    "file": "bondtite-total-tds.pdf",
    "source": "https://www.astraladhesives.com/media/catalog/product/attachment/b/o/bondtite_total_-_new_tds.pdf"
  },
  "bondtite-uniweld": {
    "file": "bondtite-uniweld-tds.pdf",
    "source": "https://www.astraladhesives.com/media/catalog/product/attachment/b/o/bondtite_uniweld_-_new_tds_1.pdf"
  },
  "bondtite-deluxe": {
    "file": "bondtite-deluxe-tds.pdf",
    "source": "https://www.astraladhesives.com/media/catalog/product/attachment/t/d/tds_-_bondtite_deluxe.pdf"
  },
  "bondtite-pvc-bond": {
    "file": "bondtite-pvc-bond-tds.pdf",
    "source": "https://www.astraladhesives.com/media/catalog/product/attachment/t/d/tds_-_bondtite_pvc_bond.pdf"
  },
  "bondtite-aqua": {
    "file": "bondtite-aqua-tds.pdf",
    "source": "https://www.astraladhesives.com/media/catalog/product/attachment/t/d/tds_-_bondtite_aqua.pdf"
  },
  "bondtite-hydra": {
    "file": "bondtite-hydra-tds.pdf",
    "source": "https://www.astraladhesives.com/media/catalog/product/attachment/t/d/tds_-_bondtite_hydra_.pdf"
  }
};
export const hasDownloadableTds = (slug: string) => Object.hasOwn(tdsDocuments, slug);
