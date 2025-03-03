import L, { LatLng } from 'leaflet'
import icon from 'leaflet/dist/images/marker-icon.png'
import iconShadow from 'leaflet/dist/images/marker-shadow.png'
import 'leaflet/dist/leaflet.css'
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'

L.Marker.prototype.options.icon = L.icon({
  iconUrl: icon as unknown as string,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  shadowUrl: iconShadow as unknown as string,
})

type MapProps = {
  position: LatLng
  height?: number
  className?: string
}

export default function Map({ position, height, className }: MapProps) {
  return (
    <div className={className}>
      <MapContainer
        center={[position.lat, position.lng]}
        zoom={16}
        scrollWheelZoom={false}
        style={{ height }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <Marker position={position}>
          <Popup>Posisi Sekarang</Popup>
        </Marker>
      </MapContainer>
    </div>
  )
}
