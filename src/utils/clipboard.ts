// Copy text to the clipboard. Resolves to false instead of throwing when the
// Clipboard API is unavailable (non-secure context) or permission is denied.
export async function copyText(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    return false;
  }
}
