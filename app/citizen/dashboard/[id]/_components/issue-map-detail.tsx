/* eslint-disable react-hooks/exhaustive-deps */
"use client"

import maplibregl from "maplibre-gl"
import { useEffect, useRef } from "react"

interface IssueMapProps {
    lat: number;
    lng: number;
}

export default function IssueMap({ lat, lng }: IssueMapProps) {
    const mapContainer = useRef<HTMLDivElement>(null)
    const API_KEY = process.env.NEXT_PUBLIC_MAPTILER_API_KEY
    useEffect(() => {
        if (!mapContainer.current) return;
        const map = new maplibregl.Map({
            container: mapContainer.current,
            style: `https://api.maptiler.com/maps/hybrid-v4/style.json?key=${API_KEY}`,
            center: [lng, lat],
            zoom: 10
        })

        new maplibregl.Marker({ color: "#ef4444" })
            .setLngLat([lng, lat])
            .addTo(map)

        map.addControl(new maplibregl.NavigationControl(), "top-right")

    }, [lat, lng])

    return (
        <div
            ref={mapContainer}
            className="w-full h-full"
        />
    )
}