export const changeHighLow = (change: string): "high" | "low" => {
  return parseFloat(change) >= 0 ? "high" : "low";
};
