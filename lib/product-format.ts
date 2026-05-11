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
