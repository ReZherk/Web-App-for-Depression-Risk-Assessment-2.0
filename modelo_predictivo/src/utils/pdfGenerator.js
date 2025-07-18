import jsPDF from "jspdf";

export function generateEvaluationPDF(evaluations) {
  const doc = new jsPDF();

  // Título
  doc.setFontSize(20);
  doc.setFont(undefined, "bold");
  doc.text("REPORTE DE EVALUACIONES PHQ-9", 20, 25);

  // Info básica
  doc.setFontSize(12);
  doc.setFont(undefined, "normal");
  doc.text(
    `Fecha del reporte: ${new Date().toLocaleDateString("es-ES")}`,
    20,
    40
  );
  doc.text("Evaluación: Cuestionario de Salud del Paciente (PHQ-9)", 20, 50);

  // Separador
  doc.setLineWidth(0.5);
  doc.line(20, 60, 190, 60);

  let y = 75;

  if (!evaluations || evaluations.length === 0) {
    doc.setFontSize(14);
    doc.text("No hay evaluaciones completadas disponibles.", 20, y);
    return doc;
  }

  // Resumen
  doc.setFontSize(14);
  doc.setFont(undefined, "bold");
  doc.text("RESUMEN GENERAL", 20, y);
  y += 15;

  doc.setFontSize(11);
  doc.setFont(undefined, "normal");
  doc.text(`Total de evaluaciones: ${evaluations.length}`, 20, y);
  y += 10;

  // Corrección aquí → evitar usar 'eval'
  const severityCount = evaluations.reduce((acc, evaluation) => {
    acc[evaluation.level] = (acc[evaluation.level] || 0) + 1;
    return acc;
  }, {});

  Object.entries(severityCount).forEach(([level, count]) => {
    doc.text(`${level}: ${count} evaluacion${count > 1 ? "es" : ""}`, 30, y);
    y += 8;
  });

  y += 10;

  // Detalle mensual
  doc.setFontSize(14);
  doc.setFont(undefined, "bold");
  doc.text("DETALLE POR MES", 20, y);
  y += 15;

  evaluations.forEach((evaluation, index) => {
    if (y > 250) {
      doc.addPage();
      y = 25;
    }

    doc.setFontSize(12);
    doc.setFont(undefined, "bold");
    doc.text(`${index + 1}. ${evaluation.month}`, 20, y);
    y += 12;

    doc.setFontSize(11);
    doc.setFont(undefined, "normal");
    doc.text(`Puntuación: ${evaluation.score} puntos`, 30, y);
    y += 8;
    doc.text(`Nivel: ${evaluation.level}`, 30, y);
    y += 8;
    doc.text(`Descripción: ${evaluation.description}`, 30, y);
    y += 8;

    let interpretation = "";
    let color = [0, 0, 0];

    switch (evaluation.level) {
      case "Severa":
        interpretation = "REQUIERE ATENCIÓN PROFESIONAL INMEDIATA";
        color = [220, 53, 69];
        break;
      case "Mod. Severa":
        interpretation =
          "Se recomienda consulta con profesional de salud mental";
        color = [253, 126, 20];
        break;
      case "Moderada":
        interpretation = "Considerar apoyo profesional y seguimiento";
        color = [255, 193, 7];
        break;
      case "Leve":
        interpretation = "Síntomas leves, monitoreo recomendado";
        color = [40, 167, 69];
        break;
      case "Mínima":
        interpretation = "Síntomas mínimos o ausentes";
        color = [23, 162, 184];
        break;
    }

    if (interpretation) {
      doc.setTextColor(...color);
      doc.setFont(undefined, "bold");
      doc.text(`→ ${interpretation}`, 30, y);
      doc.setTextColor(0, 0, 0);
      doc.setFont(undefined, "normal");
      y += 12;
    }

    y += 8;
  });

  // Nueva página: información sobre PHQ-9
  doc.addPage();
  y = 25;

  doc.setFontSize(16);
  doc.setFont(undefined, "bold");
  doc.text("INFORMACIÓN SOBRE EL PHQ-9", 20, y);
  y += 20;

  doc.setFontSize(11);
  doc.setFont(undefined, "normal");

  const infoText = [
    "El PHQ-9 (Patient Health Questionnaire-9) es una herramienta de evaluación",
    "ampliamente utilizada para detectar y medir la severidad de los síntomas",
    "depresivos. Los rangos de puntuación son:",
    "",
    "• 0-4 puntos: Depresión mínima o ausente",
    "• 5-9 puntos: Depresión leve",
    "• 10-14 puntos: Depresión moderada",
    "• 15-19 puntos: Depresión moderadamente severa",
    "• 20-27 puntos: Depresión severa",
    "",
    "IMPORTANTE: Este reporte es solo para fines informativos y NO sustituye",
    "la evaluación profesional. Si tienes pensamientos de autolesión o",
    "puntuaciones altas, busca ayuda profesional inmediatamente.",
    "",
    "En caso de emergencia, contacta:",
    "• Línea de Prevención del Suicidio: 113",
    "• Emergencias: 911",
    "• Centro de Atención Psicológica: [TELÉFONO LOCAL]",
  ];

  infoText.forEach((line) => {
    if (y > 270) {
      doc.addPage();
      y = 25;
    }

    if (line.startsWith("•")) {
      doc.text(line, 30, y);
    } else if (line.startsWith("IMPORTANTE:")) {
      doc.setFont(undefined, "bold");
      doc.text(line, 20, y);
      doc.setFont(undefined, "normal");
    } else {
      doc.text(line, 20, y);
    }

    y += 8;
  });

  return doc;
}
