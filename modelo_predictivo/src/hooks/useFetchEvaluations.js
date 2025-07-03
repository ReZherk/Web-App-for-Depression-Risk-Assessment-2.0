import { useEffect, useState } from "react";

export function useFetchEvaluations(username, months) {
  const [questionSaved, setQuestionSaved] = useState({});

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const responses = await Promise.all(
          months.map(async (month) => {
            try {
              const res = await fetch(
                `http://localhost:5000/api/evaluation/${username}/${month}`,
                {
                  method: "GET",
                  headers: { "Content-Type": "application/json" },
                }
              );

              const data = await res.json();
              return { month, success: data.success };
            } catch (error) {
              console.error(`Error procesando JSON de ${month}`, error);
              return { month, success: false };
            }
          })
        );

        const results = {};
        responses.forEach(({ month, success }) => {
          results[month] = success;
        });

        setQuestionSaved(results);
      } catch (err) {
        console.error("Error al obtener evaluaciones:", err);
      }
    };

    fetchAll();
  }, [username, months]);

  return questionSaved;
}
