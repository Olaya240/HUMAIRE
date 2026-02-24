// Simple content moderation service.
// Scans text for a small list of banned words and returns whether content is allowed.

const banned = [
  'violence',
  'kill',
  'terror',
  'porn',
  'hate',
  'bomb',
];

export const check = (text) => {
  if (!text) return { allowed: true, matches: [] };
  const lowered = text.toLowerCase();
  const matches = banned.filter((w) => lowered.includes(w));
  return { allowed: matches.length === 0, matches };
};
