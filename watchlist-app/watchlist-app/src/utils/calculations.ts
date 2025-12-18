/* 
Calculate percentage change between current price and previous close
 */
export const calculatePercentageChange = (
  price: number,
  previousClose: number
): number => {
  if (previousClose === 0) return 0;
  return ((price - previousClose) / previousClose) * 100;
};

/*
 Format percentage change with sign and 2 decimal places
 */
export const formatPercentageChange = (percentage: number): string => {
  const sign = percentage >= 0 ? "+" : "";
  return `${sign}${percentage.toFixed(2)}%`;
};

/*
  Get color for percentage change display
 */
export const getPercentageColor = (percentage: number): string => {
  if (percentage > 0) return "#22c55e"; // Green
  if (percentage < 0) return "#ef4444"; // Red
  return "#6b7280"; // Gray
};
