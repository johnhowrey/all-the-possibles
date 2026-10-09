export const space = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  xxxl: 32,
} as const;

/** Deliberately near-flat — the Paper Ledger direction uses hairlines and
 * cut corners for structure, not rounded corners. */
export const radius = {
  none: 0,
  hairline: 1,
} as const;
