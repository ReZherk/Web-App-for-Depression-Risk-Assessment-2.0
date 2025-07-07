// phq9-prediction.js

export function predictNextMonth(monthlyData) {
  const completedMonths = Object.entries(monthlyData)
    .filter(
      // eslint-disable-next-line no-unused-vars
      ([_, data]) =>
        data?.completed &&
        data?.results &&
        typeof data.results.percentage === "number"
    )
    .map(([month, data]) => ({
      month,
      percentage: data.results.percentage,
    }))
    .slice(-3); // Últimos 3 meses

  if (completedMonths.length === 0) {
    return {
      prediction: "Sin datos",
      confidence: "Baja",
      trend: "Desconocida",
    };
  }

  if (completedMonths.length === 1) {
    const current = completedMonths[0].percentage;
    return {
      prediction: `${Math.max(0, current - 10)}-${Math.min(
        100,
        current + 10
      )}%`,
      confidence: "Baja",
      trend: "Estable",
    };
  }

  const percentages = completedMonths.map((m) => m.percentage);
  const avgChange =
    percentages.length > 1
      ? (percentages[percentages.length - 1] - percentages[0]) /
        (percentages.length - 1)
      : 0;

  const lastPercentage = percentages[percentages.length - 1];
  const predictedPercentage = Math.max(
    0,
    Math.min(100, lastPercentage + avgChange)
  );

  const range = Math.abs(avgChange) > 10 ? 15 : 10;
  const minPred = Math.max(0, predictedPercentage - range);
  const maxPred = Math.min(100, predictedPercentage + range);

  let trend;
  if (avgChange > 5) trend = "Empeorando";
  else if (avgChange < -5) trend = "Mejorando";
  else trend = "Estable";

  return {
    prediction: `${Math.round(minPred)}-${Math.round(maxPred)}%`,
    confidence: completedMonths.length >= 3 ? "Alta" : "Media",
    trend,
  };
}
