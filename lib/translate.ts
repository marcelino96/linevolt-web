import { translate } from "@vitalets/google-translate-api";

/**
 * Translate a string from Indonesian to English using Google Translate (free).
 * Returns the original string if translation fails.
 */
export async function translateToEN(text: string): Promise<string> {
  if (!text?.trim()) return text;
  try {
    const result = await translate(text, { from: "id", to: "en" });
    return result.text || text;
  } catch {
    return text;
  }
}

/**
 * Translate multiple fields at once. Only translates fields that are non-empty.
 */
export async function translateFields<T extends Record<string, string | undefined>>(
  fields: T
): Promise<T> {
  const entries = Object.entries(fields).filter(([, v]) => typeof v === "string" && v.trim());
  const results = await Promise.all(
    entries.map(async ([key, value]) => [key, await translateToEN(value as string)])
  );
  return Object.fromEntries(results) as T;
}
