/**
 * Rounds a number to the specified number of decimal places.
 * @param {number} value - The number to round.
 * @param {number} decimals - The number of decimal places to round to.
 * @returns {number} - The rounded number.
 */
export const roundTo = (value: number, decimals: number = 2): number => {
  return Number(Math.round(Number(value + 'e' + decimals)) + 'e-' + decimals);
};
