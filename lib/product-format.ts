export function formatPackSizes(value: string) {
  if (!value || value === "See official page") return value;

  return value
    .split(/\s*,\s*|\s+(?=\d)/)
    .map((item) => item.trim())
    .filter(Boolean)
    .join(" | ");
}

export function firstPackSize(value: string) {
  return formatPackSizes(value).split("|")[0]?.trim() ?? value;
}

/** Keep catalogue copy complete and brief without changing detailed product data. */
export function productCardDescription(product: { name: string; productSummary: string; substrates: string[] }) {
  if (/quick gel/i.test(product.name)) return "An instant adhesive in gel form for controlled application.";
  const summary = product.productSummary.trim();
  const firstSentence = summary.match(/^.*?[.!?](?:\s|$)/)?.[0]?.trim() ?? summary;
  const withoutName = firstSentence.toLowerCase().startsWith(product.name.toLowerCase() + " is ")
    ? firstSentence.slice(product.name.length + 4)
    : firstSentence;
  if (withoutName.length <= 150 && !/listed|workbook|official/i.test(withoutName)) {
    const sentence = withoutName.charAt(0).toUpperCase() + withoutName.slice(1);
    return /[.!?]$/.test(sentence) ? sentence : sentence + ".";
  }
  return "Applications include " + product.substrates.slice(0, 3).join(", ") + ".";
}
