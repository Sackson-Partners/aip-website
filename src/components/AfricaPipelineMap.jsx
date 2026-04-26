import React, { useEffect, useRef } from 'react';

// Active partner countries with approx center coordinates and sample projects
const activeCountries = [
  { name: "Guinea", lat: 11.0, lng: -11.5, projects: 3, sector: "Energy, Water" },
  { name: "Ghana", lat: 7.9, lng: -1.0, projects: 5, sector: "Transport, Energy" },
  { name: "Senegal", lat: 14.5, lng: -14.5, projects: 4, sector: "Energy, TMT" },
  { name: "Côte d'Ivoire", lat: 7.5, lng: -5.5, projects: 6, sector: "Transport, Energy" },
  { name: "Liberia", lat: 6.4, lng: -9.4, projects: 2, sector: "Agriculture, Water" },
  { name: "Sierra Leone", lat: 8.5, lng: -11.8, projects: 2, sector: "Healthcare, Energy" },
  { name: "Guinea-Bissau", lat: 11.8, lng: -15.2, projects: 1, sector: "Agriculture" },
  { name: "Niger", lat: 17.6, lng: 8.1, projects: 2, sector: "Energy, Water" },
];

const comingSoonCountries = [
  { name: "Nigeria", lat: 9.0, lng: 8.7 },
  { name: "Mali", lat: 17.6, lng: -4.0 },
  { name: "Burkina Faso", lat: 12.4, lng: -1.6 },
  { name: "Angola", lat: -11.2, lng: 17.9 },
  { name: "Kenya", lat: 0.0, lng: 38.0 },
  { name: "DRC", lat: -4.0, lng: 21.8 },
  { name: "Tanzania", lat: -6.4, lng: 34.9 },
  { name: "Ethiopia", lat: 9.1, lng: 40.5 },
  { name: "South Africa", lat: -29.0, lng: 25.0 },
  { name: "Rwanda", lat: -1.9, lng: 29.9 },
  { name: "Botswana", lat: -22.3, lng: 24.7 },
];

const AfricaPipelineMap = () => {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);

  useEffect(() => {
    if (mapInstanceRef.current) return; // Already initialized

    // Dynamically load Leaflet CSS
    if (!document.getElementById('leaflet-css')) {
      const link = document.createElement('link');
      link.id = 'leaflet-css';
      link.rel = 'stylesheet';
      link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
      document.head.appendChild(link);
    }

    // Dynamically load Leaflet JS then init map
    const initMap = async () => {
      const L = (await import('leaflet')).default;

      // Fix default marker icon path issue with Vite
      delete L.Icon.Default.prototype._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
        iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
        shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
      });

      if (!mapRef.current || mapInstanceRef.current) return;

      const map = L.map(mapRef.current, {
        center: [7, 0],
        zoom: 4,
        zoomControl: true,
        scrollWheelZoom: false,
      });

      mapInstanceRef.current = map;

      // OpenStreetMap tiles (dark-ish theme via CartoDB)
      L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/">CARTO</a>',
        subdomains: 'abcd',
        maxZoom: 19
      }).addTo(map);

      // Active country markers (gold)
      activeCountries.forEach((c) => {
        const marker = L.circleMarker([c.lat, c.lng], {
          radius: 12,
          fillColor: '#D4AF37',
          color: '#fff',
          weight: 2,
          opacity: 1,
          fillOpacity: 0.9,
        }).addTo(map);

        marker.bindPopup(`
          <div style="font-family:sans-serif; min-width:160px;">
            <div style="font-weight:bold; font-size:14px; color:#D4AF37; margin-bottom:4px;">${c.name}</div>
            <div style="font-size:12px; color:#333;"><b>Status:</b> Active Partner</div>
            <div style="font-size:12px; color:#333;"><b>Projects:</b> ${c.projects}</div>
            <div style="font-size:12px; color:#333;"><b>Sectors:</b> ${c.sector}</div>
          </div>
        `, { maxWidth: 220 });
      });

      // Coming soon markers (muted)
      comingSoonCountries.forEach((c) => {
        const marker = L.circleMarker([c.lat, c.lng], {
          radius: 8,
          fillColor: '#6b7280',
          color: '#9ca3af',
          weight: 1.5,
          opacity: 0.7,
          fillOpacity: 0.5,
        }).addTo(map);

        marker.bindPopup(`
          <div style="font-family:sans-serif; min-width:140px;">
            <div style="font-weight:bold; font-size:14px; color:#9ca3af; margin-bottom:4px;">${c.name}</div>
            <div style="font-size:12px; color:#555;"><b>Status:</b> Coming Soon</div>
          </div>
        `, { maxWidth: 180 });
      });
    };

    initMap();

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  return (
    <div className="rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
      {/* Legend */}
      <div className="bg-[#0a1628] border-b border-white/10 px-6 py-3 flex items-center gap-6 flex-wrap">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-[#D4AF37] border-2 border-white/30" />
          <span className="text-sm text-gray-300">Active Partner (8 countries)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-gray-500 border-2 border-gray-400/30 opacity-60" />
          <span className="text-sm text-gray-500">Coming Soon (11 countries)</span>
        </div>
        <span className="ml-auto text-xs text-gray-600">Click markers for details · OpenStreetMap</span>
      </div>

      {/* Map Container */}
      <div ref={mapRef} style={{ height: '480px', width: '100%', background: '#111827' }} />
    </div>
  );
};

export default AfricaPipelineMap;
