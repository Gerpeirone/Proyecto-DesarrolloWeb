import { useEffect, useState } from "react";

/**
 * Hook que ejecuta una consulta a la API y guarda su resultado.
 * Vuelve a consultar cada vez que cambia el argumento.
 * @method useConsulta
 * @param {Function} consulta - Función de la API que devuelve una promesa.
 * @param {string|number} [argumento] - Valor que se le pasa a la consulta.
 * @return {{datos: object|null, cargando: boolean, error: boolean}} Estado de la consulta.
 */
export const useConsulta = (consulta, argumento) => {
  const [resultado, setResultado] = useState({ argumento, datos: null, error: false, listo: false });

  useEffect(() => {
    let vigente = true;

    consulta(argumento)
      .then((datos) => {
        if (vigente) {
          setResultado({ argumento, datos, error: false, listo: true });
        }
      })
      .catch(() => {
        if (vigente) {
          setResultado({ argumento, datos: null, error: true, listo: true });
        }
      });

    return () => {
      vigente = false;
    };
  }, [consulta, argumento]);

  const actual = resultado.listo && Object.is(resultado.argumento, argumento);

  return {
    datos: actual ? resultado.datos : null,
    cargando: !actual,
    error: actual && resultado.error,
  };
};

/**
 * Hook que cambia el título de la pestaña del navegador.
 * @method useTitulo
 * @param {string} titulo - Texto que identifica a la página actual.
 * @return {void}
 */
export const useTitulo = (titulo) => {
  useEffect(() => {
    document.title = `CrewLab - ${titulo}`;
  }, [titulo]);
};
