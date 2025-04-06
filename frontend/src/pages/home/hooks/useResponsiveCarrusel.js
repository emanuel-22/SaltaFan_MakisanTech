import { useState, useEffect } from "react";

const useResponsiveCarrusel = () => {
  const [itemsPerPage, setItemsPerPage] = useState(3); // Valor predeterminado

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 900) {
        setItemsPerPage(1); // En pantallas pequeñas mostramos 1 item
      } else if (window.innerWidth <= 1400) {
        setItemsPerPage(2); // En pantallas medianas mostramos 2 items
      } else {
        setItemsPerPage(3); // En pantallas grandes mostramos 3 items
      }
    };

    handleResize(); // Ajustamos al inicio
    window.addEventListener("resize", handleResize); // Escuchamos cambios en tamaño de la ventana

    return () => {
      window.removeEventListener("resize", handleResize); // Limpiamos el evento
    };
  }, []);

  return itemsPerPage; // Devolvemos el número de items por fila
};

export default useResponsiveCarrusel;

