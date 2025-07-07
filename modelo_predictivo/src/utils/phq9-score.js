export function calculatePHQ9Score(responses) {
  if (!responses || responses.length !== 9) {
    return {
      score: 0,
      level: "Sin datos",
      description: "No hay respuestas disponibles",
    };
  }

  // Suma todas las respuestas del PHQ-9 convirtiéndolas a número;
  // si alguna respuesta es nula o vacía, se considera como 0
  const totalScore = responses.reduce(
    (sum, response) => sum + Number(response || 0),
    0
  );

  let level, description;

  if (totalScore <= 4) {
    level = "Mínima";
    description = "Depresión mínima o ausente";
  } else if (totalScore <= 9) {
    level = "Leve";
    description = "Depresión leve";
  } else if (totalScore <= 14) {
    level = "Moderada";
    description = "Depresión moderada";
  } else if (totalScore <= 19) {
    level = "Mod. Severa";
    description = "Depresión moderadamente severa";
  } else {
    level = "Severa";
    description = "Depresión severa";
  }

  return { score: totalScore, level, description };
}
