import { useEffect, useRef, useCallback } from 'react';
import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet.markercluster';
import 'leaflet.markercluster/dist/MarkerCluster.css';
import 'leaflet.markercluster/dist/MarkerCluster.Default.css';

const MARKER_COLORS = {
  VIP: '#e74c3c',
  frecuente: '#3498db',
  nuevo: '#2ecc71',
};

function createIcon(tipo) {
  const color = MARKER_COLORS[tipo] || '#95a5a6';
  return L.divIcon({
    className: 'custom-marker',
    html: `<div style="
      background-color: ${color};
      width: 22px;
      height: 22px;
      border-radius: 50%;
      border: 3px solid white;
      box-shadow: 0 0 0 2px ${color}, 0 3px 8px rgba(0,0,0,0.4);
    "></div>`,
    iconSize: [22, 22],
    iconAnchor: [11, 11],
    popupAnchor: [0, -14],
  });
}

function buildPopup(client) {
  const badgeColor = MARKER_COLORS[client.tipo_cliente] || '#95a5a6';
  return `
    <div style="font-family: 'Segoe UI', sans-serif; min-width: 200px; padding: 4px;">
      <h3 style="margin: 0 0 8px; font-size: 15px; color: #1a1a2e; font-weight: 700;">
        ${client.nombre}
      </h3>
      <p style="margin: 4px 0; font-size: 12px; color: #555;">
        <strong>Dirección:</strong> ${client.direccion}
      </p>
      <p style="margin: 4px 0; font-size: 12px; color: #555;">
        <strong>Ciudad:</strong> ${client.ciudad}
      </p>
      <p style="margin: 4px 0; font-size: 12px; color: #555;">
        <strong>Vendedor:</strong> ${client.vendedor}
      </p>
      <p style="margin: 8px 0 0;">
        <span style="
          display: inline-block;
          padding: 3px 10px;
          border-radius: 12px;
          font-size: 11px;
          font-weight: 600;
          color: white;
          background-color: ${badgeColor};
          letter-spacing: 0.5px;
        ">${client.tipo_cliente.toUpperCase()}</span>
      </p>
    </div>
  `;
}

function MarkerLayer({ clients, onVisibleCountChange }) {
  const map = useMap();
  const clusterGroupRef = useRef(null);

  const updateMarkers = useCallback(() => {
    if (!map) return;

    const bounds = map.getBounds();
    const visibleClients = clients.filter((c) =>
      bounds.contains([c.lat, c.lng]),
    );

    if (clusterGroupRef.current) {
      map.removeLayer(clusterGroupRef.current);
    }

    const cluster = L.markerClusterGroup({
      chunkedLoading: true,
      maxClusterRadius: 50,
      spiderfyOnMaxZoom: true,
      showCoverageOnHover: false,
      animate: true,
      animateAddingMarkers: false,
      iconCreateFunction: (clusterObj) => {
        const count = clusterObj.getChildCount();
        let size = 'small';
        let dim = 36;
        if (count >= 50) {
          size = 'large';
          dim = 52;
        } else if (count >= 20) {
          size = 'medium';
          dim = 44;
        }
        return L.divIcon({
          html: `<div class="cluster-icon cluster-${size}"><span>${count}</span></div>`,
          className: 'custom-cluster',
          iconSize: L.point(dim, dim),
        });
      },
    });

    visibleClients.forEach((client) => {
      const marker = L.marker([client.lat, client.lng], {
        icon: createIcon(client.tipo_cliente),
      });
      marker.bindPopup(buildPopup(client));
      cluster.addLayer(marker);
    });

    map.addLayer(cluster);
    clusterGroupRef.current = cluster;
    onVisibleCountChange(visibleClients.length);
  }, [map, clients, onVisibleCountChange]);

  useEffect(() => {
    updateMarkers();

    map.on('moveend', updateMarkers);

    return () => {
      map.off('moveend', updateMarkers);
      if (clusterGroupRef.current) {
        map.removeLayer(clusterGroupRef.current);
      }
    };
  }, [map, updateMarkers]);

  return null;
}

export default function MapView({ clients, onVisibleCountChange }) {
  return (
    <MapContainer
      center={[4.5709, -74.2973]}
      zoom={6}
      style={{ height: '100%', width: '100%' }}
      zoomControl={true}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
      />
      <MarkerLayer
        clients={clients}
        onVisibleCountChange={onVisibleCountChange}
      />
    </MapContainer>
  );
}
