import L, { LatLng } from 'leaflet'
import iconRetina from 'leaflet/dist/images/marker-icon-2x.png'
import icon from 'leaflet/dist/images/marker-icon.png'
import shadow from 'leaflet/dist/images/marker-shadow.png'
import 'leaflet/dist/leaflet.css'
import { useEffect, useState } from 'react'
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMapEvents,
} from 'react-leaflet'

L.Marker.prototype.options.icon = L.icon({
  iconRetinaUrl: iconRetina.src ?? (iconRetina as unknown as string),
  iconUrl: icon.src ?? (icon as unknown as string),
  shadowUrl: shadow.src ?? (shadow as unknown as string),
  iconSize: [25, 41],
  iconAnchor: [12, 41],
})

type MapSectionProps = {
  height?: number
  className?: string
  onChange?: (position: LatLng) => void
}

export default function MapSection({
  height,
  onChange,
  className,
}: MapSectionProps) {
  return (
    <div className={className}>
      <MapContainer
        center={[0.7893, 113.9213]}
        zoom={4}
        scrollWheelZoom={false}
        style={{ height }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <LocationMarker onChange={onChange} />
      </MapContainer>
    </div>
  )
}

function LocationMarker({
  onChange,
}: {
  onChange?: (position: LatLng) => void
}) {
  const [position, setPosition] = useState<LatLng>()

  const map = useMapEvents({
    click: () => {
      map.locate()
    },
    locationfound: (e) => {
      onChange && onChange(e.latlng)
      setPosition(e.latlng)
      map.flyTo(e.latlng, 16)
    },
  })

  useEffect(() => {
    map.locate()
  }, [])

  if (!position) return null

  return (
    <Marker position={position}>
      <Popup>Posisi Sekarang</Popup>
    </Marker>
  )
}
