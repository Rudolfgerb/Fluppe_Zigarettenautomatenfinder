import L from 'leaflet';

// Fix for default marker icons in Leaflet with Webpack/Vite
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerIconRetina from 'leaflet/dist/images/marker-icon-2x.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: markerIcon,
    iconRetinaUrl: markerIconRetina,
    shadowUrl: markerShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

// Custom Cigarette Box Icon
export const CigaretteIcon = L.divIcon({
  className: 'custom-div-icon',
  html: `<div style="background-color: #C62828; width: 24px; height: 32px; border-radius: 2px; border: 2px solid white; box-shadow: 0 2px 4px rgba(0,0,0,0.3); display: flex; flex-direction: column; overflow: hidden;">
          <div style="background: white; height: 8px; width: 100%;"></div>
          <div style="flex: 1; display: flex; align-items: center; justify-content: center;">
            <div style="width: 12px; height: 2px; background: white; border-radius: 1px;"></div>
          </div>
         </div>`,
  iconSize: [24, 32],
  iconAnchor: [12, 32]
});
