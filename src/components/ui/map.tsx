import L, { LatLng } from 'leaflet'
import icon from 'leaflet/dist/images/marker-icon.png'
import iconShadow from 'leaflet/dist/images/marker-shadow.png'
import 'leaflet/dist/leaflet.css'
import { useEffect } from 'react'
import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet'

L.Marker.prototype.options.icon = L.icon({
  iconUrl: typeof icon === 'object' ? icon.src : (icon as unknown as string),
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  shadowUrl:
    typeof iconShadow === 'object'
      ? iconShadow.src
      : (iconShadow as unknown as string),
})

type MapProps = {
  latLong: [number, number]
  height?: number
  className?: string
}

export default function Map({ latLong, height, className }: MapProps) {
  const position = new LatLng(latLong[0], latLong[1])

  return (
    <div className={className}>
      <MapContainer
        center={[latLong[0], latLong[1]]}
        zoom={16}
        scrollWheelZoom={false}
        style={{ height }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <Marker position={position}>
          <Popup>Posisi Sekarang</Popup>
        </Marker>
        <MapReloader />
      </MapContainer>
    </div>
  )
}

function MapReloader() {
  const map = useMap()

  useEffect(() => {
    map.invalidateSize()
  }, [map])

  return null
}
