import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Typography, Box } from '@mui/material';
import L from 'leaflet';

// Fix for default marker icon
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

L.Marker.prototype.options.icon = DefaultIcon;

const BanksMap: React.FC = () => {
  // Sample data for Commerzbank locations (replace with actual data)
  const bankLocations = [
    { name: 'Commerzbank Frankfurt', position: [50.1109, 8.6821] },
    { name: 'Commerzbank Berlin', position: [52.5200, 13.4050] },
    { name: 'Commerzbank Munich', position: [48.1351, 11.5820] },
  ];

  return (
      <Box p={2}>
        <Typography variant="h6" gutterBottom>Commerzbank Locations</Typography>
        <div style={{ height: '200px', width: '100%' }}>
          <MapContainer 
            center={[51.1657, 10.4515]} 
            zoom={5} 
            style={{ height: '100%', width: '100%' }}
            zoomControl={false}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            {bankLocations.map((bank, index) => (
              <Marker key={index} position={bank.position as [number, number]}>
                <Popup>{bank.name}</Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
      </Box>
  );
};

export default BanksMap;
