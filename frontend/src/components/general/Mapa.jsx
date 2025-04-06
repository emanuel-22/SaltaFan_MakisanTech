import React, { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const Mapa = ({ direccion }) => {
  const mapRef = useRef(null); 
  const mapInstance = useRef(null); 

  useEffect(() => {
    if (mapInstance.current) return;

    mapInstance.current = L.map(mapRef.current).setView([51.505, -0.09], 16); // Zoom inicial ajustado

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(mapInstance.current);

    const fetchCoordinates = async () => {
      const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${direccion}`);
      const data = await response.json();
      if (data.length > 0) {
        const { lat, lon } = data[0];
        mapInstance.current.setView([lat, lon], 16); // Zoom ajustado para la ubicación obtenida
        L.marker([lat, lon]).addTo(mapInstance.current); 
      }
    };

    fetchCoordinates();
  }, [direccion]); 

  return <div ref={mapRef} style={{ height: "300px", borderRadius:"20px" }}></div>;
};

export default Mapa;

