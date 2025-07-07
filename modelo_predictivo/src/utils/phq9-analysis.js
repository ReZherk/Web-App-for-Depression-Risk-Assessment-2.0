// phq9-analysis.js

export function analyzeProgress(monthlyData) {
  const completedEntries = Object.entries(monthlyData)
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
      hasDepression: data.results.result === 1,
    }));

  if (completedEntries.length === 0) {
    return {
      totalEvaluations: 0,
      averagePercentage: 0,
      bestMonth: null,
      worstMonth: null,
      trend: "Sin datos",
      riskDistribution: { low: 0, medium: 0, high: 0 },
    };
  }

  const percentages = completedEntries.map((e) => e.percentage);
  const averagePercentage =
    percentages.reduce((sum, p) => sum + p, 0) / percentages.length;

  const bestMonth = completedEntries.reduce((best, current) =>
    current.percentage < best.percentage ? current : best
  );

  const worstMonth = completedEntries.reduce((worst, current) =>
    current.percentage > worst.percentage ? current : worst
  );

  const riskDistribution = completedEntries.reduce(
    (dist, entry) => {
      if (entry.percentage < 30) dist.low++;
      else if (entry.percentage < 70) dist.medium++;
      else dist.high++;
      return dist;
    },
    { low: 0, medium: 0, high: 0 }
  );

  let trend = "Estable";
  if (completedEntries.length >= 2) {
    const recent = percentages.slice(-2);
    const change = recent[1] - recent[0];
    if (change > 10) trend = "Empeorando";
    else if (change < -10) trend = "Mejorando";
  }

  return {
    totalEvaluations: completedEntries.length,
    averagePercentage: Math.round(averagePercentage * 10) / 10,
    bestMonth,
    worstMonth,
    trend,
    riskDistribution,
  };
}
