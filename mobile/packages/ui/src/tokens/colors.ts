/**
 * "Paper Ledger" direction — approved visual direction for the studio's
 * apps. Flat paper, hairline rules, one accent color per app. No shadows,
 * no gradients, no pill chrome — see mobile/README.md for the rationale.
 */
export const colors = {
  paper: "#FAF8F2",
  panel: "#FFFFFF",
  ink: "#2B2620",
  inkSecondary: "#6B6355",
  hairline: "#DAD0BC",
  hairlineLight: "#D8CFBA",
  dotLeader: "#C9BFA8",
  perforation: "#B8AE94",
  danger: "#B3261E",
} as const;

export type AtpColors = typeof colors;
