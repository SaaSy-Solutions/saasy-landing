const DAY_MS = 86400000;
const toISO = (ms) => new Date(ms).toISOString().slice(0, 10);

// Older entries only carry a date. New entries record the instant the source
// query began so PRs merged later that same day remain eligible next week.
export function mergeWindow(sinceDate, sourceThrough, through) {
  const from = sourceThrough
    ? sourceThrough.slice(0, 10)
    : toISO(Date.parse(`${sinceDate}T00:00:00Z`) + DAY_MS);
  return { from, to: through.slice(0, 10) };
}

export function mergedInWindow(pr, sourceThrough, through) {
  const mergedAt = pr.pull_request?.merged_at || pr.closed_at;
  if (!mergedAt) {
    throw new Error(`Merged PR #${pr.number} has no merge timestamp`);
  }
  return (!sourceThrough || mergedAt > sourceThrough) && mergedAt <= through;
}
