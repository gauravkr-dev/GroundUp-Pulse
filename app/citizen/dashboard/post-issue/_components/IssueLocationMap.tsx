"use client"

import { useEffect, useRef, useState } from "react"
import maplibregl from "maplibre-gl"
import { MapPin } from "@/components/animate-ui/icons/map-pin"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
// @import "maplibre-gl/dist/maplibre-gl.css"

interface Props {
    onLocationSelect: (lat: number, lng: number) => void
}

export default function IssueLocationMap({ onLocationSelect }: Props) {

    const mapContainer = useRef<HTMLDivElement | null>(null)
    const mapRef = useRef<maplibregl.Map | null>(null)
    const markerRef = useRef<maplibregl.Marker | null>(null)

    const [search, setSearch] = useState("")

    const API_KEY = process.env.NEXT_PUBLIC_MAPTILER_API_KEY

    useEffect(() => {

        if (mapRef.current) return

        if (!API_KEY) {
            console.error('Missing MapTiler API key. Set NEXT_PUBLIC_MAPTILER_API_KEY in your env.')
            return
        }

        const map = new maplibregl.Map({
            container: mapContainer.current!,
            style: `https://api.maptiler.com/maps/hybrid-v4/style.json?key=${API_KEY}`,
            center: [78.9629, 22.5937],
            zoom: 4
        })

        map.addControl(new maplibregl.NavigationControl(), "bottom-right")

        map.on("click", (e) => {

            const { lng, lat } = e.lngLat

            if (markerRef.current) {
                markerRef.current.remove()
            }

            const marker = new maplibregl.Marker({ draggable: true })
                .setLngLat([lng, lat])
                .addTo(map)

            marker.on("dragend", () => {
                const pos = marker.getLngLat()
                onLocationSelect(pos.lat, pos.lng)
            })

            markerRef.current = marker

            onLocationSelect(lat, lng)
        })

        mapRef.current = map

    }, [])

    // Current location
    const handleCurrentLocation = () => {

        if (!navigator.geolocation) return

        navigator.geolocation.getCurrentPosition((pos) => {

            const lat = pos.coords.latitude
            const lng = pos.coords.longitude

            mapRef.current?.flyTo({
                center: [lng, lat],
                zoom: 16
            })

            if (markerRef.current) {
                markerRef.current.remove()
            }

            const marker = new maplibregl.Marker({ draggable: true })
                .setLngLat([lng, lat])
                .addTo(mapRef.current!)

            markerRef.current = marker

            onLocationSelect(lat, lng)

        })
    }

    // Search location
    const handleSearch = async () => {

        if (!search) return

        const res = await fetch(
            `https://api.maptiler.com/geocoding/${search}.json?key=${API_KEY}`
        )

        const data = await res.json()

        if (!data.features?.length) return

        const [lng, lat] = data.features[0].center

        mapRef.current?.flyTo({
            center: [lng, lat],
            zoom: 16
        })
    }

    return (
        <div className="relative w-full h-[360px] rounded-xl border overflow-hidden">

            {/* Search box */}
            <div className="absolute top-3 right-3 z-10">
                <Input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            e.preventDefault()
                            handleSearch()
                        }
                    }}
                    placeholder="Search location..."
                    className="px-3 py-2 rounded-md shadow w-[240px] text-sm bg-white/90 dark:bg-[#121212]/90"
                />
            </div>

            {/* Current location */}
            <Button
                type="button"
                onClick={handleCurrentLocation}
                className="absolute top-3 left-3 z-10  px-3 py-1 rounded-md shadow text-sm cursor-pointer"
            >
                <MapPin animateOnHover />
            </Button>

            {/* Map */}
            <div ref={mapContainer} className="w-full h-full" />

        </div>
    )
}