'use client';

import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Outbreak } from '@/lib/types';

interface OutbreakMapProps {
  outbreaks: Outbreak[];
}

export default function OutbreakMap({ outbreaks }: OutbreakMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;

    // Initialize map
    mapInstanceRef.current = L.map(mapRef.current).setView([20, 0], 2);

    // Add OpenStreetMap tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
      maxZoom: 19,
    }).addTo(mapInstanceRef.current);

    return () => {
      // Don't remove the map on unmount to prevent re-initialization
    };
  }, []);

  // Update markers when outbreaks change
  useEffect(() => {
    if (!mapInstanceRef.current || !outbreaks.length) return;

    // Clear existing markers
    mapInstanceRef.current.eachLayer((layer) => {
      if (layer instanceof L.CircleMarker || layer instanceof L.Popup) {
        mapInstanceRef.current?.removeLayer(layer);
      }
    });

    // Add outbreak markers
    outbreaks.forEach((outbreak) => {
      if (!mapInstanceRef.current) return;

      const markerSize = Math.max(10, Math.min(30, Math.sqrt(outbreak.cases) * 3));

      const marker = L.circleMarker([outbreak.lat, outbreak.lng], {
        radius: markerSize,
        fillColor: '#dc2626',
        color: '#991b1b',
        weight: 2,
        opacity: 0.9,
        fillOpacity: 0.7,
      });

      const popupContent = `
        <div class="p-3 min-w-max">
          <h3 class="font-bold text-lg text-gray-900">${outbreak.location}</h3>
          <p class="text-sm text-gray-600">${outbreak.country}</p>
          <div class="mt-2 space-y-1">
            <p class="text-sm"><span class="font-semibold">Cases:</span> ${outbreak.cases}</p>
            <p class="text-sm"><span class="font-semibold">Deaths:</span> ${outbreak.deaths}</p>
            <p class="text-sm"><span class="font-semibold">Source:</span> ${outbreak.source}</p>
            <p class="text-xs text-gray-500 mt-2">${new Date(outbreak.date).toLocaleDateString()}</p>
          </div>
        </div>
      `;

      marker.bindPopup(popupContent);
      marker.addTo(mapInstanceRef.current);
    });
  }, [outbreaks]);

  return (
    <div ref={mapRef} className="w-full h-full rounded-lg overflow-hidden" />
  );
}
