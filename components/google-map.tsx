"use client"

import { useEffect, useRef, useState, useCallback } from "react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MapPin, Eye, Navigation, Layers, Info } from "lucide-react"
import { google } from "google-maps"

// Adicionar após as importações
const GOOGLE_MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY

if (!GOOGLE_MAPS_API_KEY) {
  console.warn("Google Maps API key não encontrada. Usando modo de demonstração.")
}

interface Sighting {
  id: string
  species: string
  scientificName: string
  location: string
  coordinates: { lat: number; lng: number }
  time: string
  status: "validated" | "pending"
  category: "mammals" | "turtles" | "fish" | "other"
  image: string
  observer: string
  description: string
  depth?: number
  temperature?: number
}

interface GoogleMapComponentProps {
  selectedSpecies?: string
}

// Dados reais de avistamentos da fauna marinha brasileira
const realSightings: Sighting[] = [
  {
    id: "1",
    species: "Baleia Jubarte",
    scientificName: "Megaptera novaeangliae",
    location: "Parque Nacional Marinho de Abrolhos, BA",
    coordinates: { lat: -17.9578, lng: -38.6917 },
    time: "2h atrás",
    status: "validated",
    category: "mammals",
    image: "/placeholder.svg?height=100&width=100&text=Baleia+Jubarte",
    observer: "João Silva - Biólogo Marinho",
    description:
      "Grupo de 3 indivíduos adultos avistados durante migração reprodutiva. Comportamento de salto observado.",
    depth: 50,
    temperature: 24.5,
  },
  {
    id: "2",
    species: "Tartaruga Verde",
    scientificName: "Chelonia mydas",
    location: "Ubatuba, SP",
    coordinates: { lat: -23.4336, lng: -45.0838 },
    time: "4h atrás",
    status: "pending",
    category: "turtles",
    image: "/placeholder.svg?height=100&width=100&text=Tartaruga+Verde",
    observer: "Maria Santos - Mergulhadora",
    description: "Tartaruga juvenil se alimentando em área de algas marinhas. Aproximadamente 40cm de carapaça.",
    depth: 15,
    temperature: 22.1,
  },
  {
    id: "3",
    species: "Golfinho Nariz-de-garrafa",
    scientificName: "Tursiops truncatus",
    location: "Fernando de Noronha, PE",
    coordinates: { lat: -3.8536, lng: -32.4297 },
    time: "6h atrás",
    status: "validated",
    category: "mammals",
    image: "/placeholder.svg?height=100&width=100&text=Golfinho",
    observer: "Carlos Lima - Guia de Mergulho",
    description: "Pod de 8 golfinhos interagindo com mergulhadores. Comportamento curioso e brincalhão.",
    depth: 30,
    temperature: 26.8,
  },
  {
    id: "4",
    species: "Peixe-boi Marinho",
    scientificName: "Trichechus manatus",
    location: "Maragogi, AL",
    coordinates: { lat: -9.0122, lng: -35.2225 },
    time: "8h atrás",
    status: "validated",
    category: "mammals",
    image: "/placeholder.svg?height=100&width=100&text=Peixe-boi",
    observer: "Ana Costa - Pesquisadora ICMBio",
    description: "Fêmea adulta com filhote em área de proteção. Comportamento de amamentação observado.",
    depth: 8,
    temperature: 25.2,
  },
  {
    id: "5",
    species: "Tubarão Baleia",
    scientificName: "Rhincodon typus",
    location: "Laje de Santos, SP",
    coordinates: { lat: -24.3167, lng: -46.1833 },
    time: "12h atrás",
    status: "validated",
    category: "fish",
    image: "/placeholder.svg?height=100&width=100&text=Tubarão+Baleia",
    observer: "Pedro Oliveira - Mergulhador Técnico",
    description: "Indivíduo juvenil de aproximadamente 8 metros se alimentando de plâncton na superfície.",
    depth: 5,
    temperature: 21.8,
  },
  {
    id: "6",
    species: "Tartaruga Cabeçuda",
    scientificName: "Caretta caretta",
    location: "Praia do Forte, BA",
    coordinates: { lat: -12.5833, lng: -38.0 },
    time: "1 dia atrás",
    status: "validated",
    category: "turtles",
    image: "/placeholder.svg?height=100&width=100&text=Tartaruga+Cabeçuda",
    observer: "Lucia Ferreira - Projeto TAMAR",
    description: "Fêmea adulta retornando ao mar após processo de desova. Monitoramento via satélite ativo.",
    depth: 2,
    temperature: 24.0,
  },
  {
    id: "7",
    species: "Boto Cinza",
    scientificName: "Sotalia guianensis",
    location: "Baía de Guanabara, RJ",
    coordinates: { lat: -22.8305, lng: -43.2192 },
    time: "18h atrás",
    status: "validated",
    category: "mammals",
    image: "/placeholder.svg?height=100&width=100&text=Boto+Cinza",
    observer: "Roberto Mendes - Pescador Local",
    description: "Grupo de 12 botos se alimentando próximo à entrada da baía. Comportamento cooperativo.",
    depth: 25,
    temperature: 23.5,
  },
  {
    id: "8",
    species: "Raia Manta",
    scientificName: "Mobula birostris",
    location: "Arquipélago de São Pedro e São Paulo",
    coordinates: { lat: 0.9167, lng: -29.35 },
    time: "2 dias atrás",
    status: "validated",
    category: "fish",
    image: "/placeholder.svg?height=100&width=100&text=Raia+Manta",
    observer: "Dra. Fernanda Lopes - UFPE",
    description: "Indivíduo adulto com envergadura de aproximadamente 4 metros. Estação de limpeza ativa.",
    depth: 15,
    temperature: 27.2,
  },
]

export default function GoogleMapComponent({ selectedSpecies = "all" }: GoogleMapComponentProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const [map, setMap] = useState<any | null>(null)
  const [markers, setMarkers] = useState<any[]>([])
  const [selectedSighting, setSelectedSighting] = useState<Sighting | null>(null)
  const [infoWindow, setInfoWindow] = useState<any | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [mapType, setMapType] = useState<"roadmap" | "satellite" | "hybrid" | "terrain">("satellite")

  // Filtrar avistamentos baseado na espécie selecionada
  const filteredSightings =
    selectedSpecies === "all"
      ? realSightings
      : realSightings.filter((sighting) => sighting.category === selectedSpecies)

  // Inicializar Google Maps
  const initializeMap = useCallback(() => {
    if (!mapRef.current) return

    const mapInstance = new google.maps.Map(mapRef.current, {
      center: { lat: -14.235, lng: -51.9253 }, // Centro do Brasil
      zoom: 5,
      mapTypeId: mapType,
      styles: [
        {
          featureType: "water",
          elementType: "geometry",
          stylers: [{ color: "#006994" }],
        },
        {
          featureType: "landscape",
          elementType: "geometry",
          stylers: [{ color: "#f5f5f2" }],
        },
        {
          featureType: "poi.park",
          elementType: "geometry",
          stylers: [{ color: "#c5dac6" }],
        },
      ],
      mapTypeControl: true,
      mapTypeControlOptions: {
        style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
        position: google.maps.ControlPosition.TOP_CENTER,
      },
      zoomControl: true,
      zoomControlOptions: {
        position: google.maps.ControlPosition.RIGHT_CENTER,
      },
      scaleControl: true,
      streetViewControl: true,
      fullscreenControl: true,
      gestureHandling: "cooperative",
    })

    setMap(mapInstance)

    const infoWindowInstance = new google.maps.InfoWindow({
      maxWidth: 350,
    })
    setInfoWindow(infoWindowInstance)

    setIsLoading(false)
  }, [mapType])

  // Carregar Google Maps API
  const loadGoogleMaps = () => {
    if (typeof window.google !== "undefined") {
      initializeMap()
      return
    }

    if (!GOOGLE_MAPS_API_KEY) {
      // Modo demonstração sem API key
      setIsLoading(false)
      return
    }

    const script = document.createElement("script")
    script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&libraries=places,geometry`
    script.async = true
    script.defer = true
    script.onload = initializeMap
    script.onerror = () => {
      console.error("Erro ao carregar Google Maps API")
      setIsLoading(false)
    }
    document.head.appendChild(script)
  }

  useEffect(() => {
    loadGoogleMaps()
  }, [initializeMap])

  // Atualizar marcadores quando os avistamentos filtrados mudarem
  useEffect(() => {
    if (!map || !infoWindow) return

    // Limpar marcadores existentes
    markers.forEach((marker) => marker.setMap(null))
    setMarkers([])

    const newMarkers: any[] = []

    filteredSightings.forEach((sighting) => {
      const markerColor = getMarkerColor(sighting.category)
      const markerIcon = getMarkerIcon(sighting.category, markerColor)

      const marker = new google.maps.Marker({
        position: sighting.coordinates,
        map: map,
        title: sighting.species,
        icon: markerIcon,
        animation: google.maps.Animation.DROP,
      })

      marker.addListener("click", () => {
        setSelectedSighting(sighting)

        const content = createInfoWindowContent(sighting)
        infoWindow.setContent(content)
        infoWindow.open(map, marker)

        // Centralizar no marcador
        map.panTo(sighting.coordinates)
        if (map.getZoom()! < 10) {
          map.setZoom(10)
        }
      })

      newMarkers.push(marker)
    })

    setMarkers(newMarkers)
  }, [map, filteredSightings, infoWindow])

  // Atualizar tipo de mapa
  useEffect(() => {
    if (map) {
      map.setMapTypeId(mapType)
    }
  }, [map, mapType])

  const getMarkerColor = (category: string): string => {
    switch (category) {
      case "mammals":
        return "#3b82f6" // Azul
      case "turtles":
        return "#10b981" // Verde
      case "fish":
        return "#8b5cf6" // Roxo
      default:
        return "#f59e0b" // Laranja
    }
  }

  const getMarkerIcon = (category: string, color: string) => {
    return {
      path: google.maps.SymbolPath.CIRCLE,
      scale: 10,
      fillColor: color,
      fillOpacity: 0.9,
      strokeColor: "#ffffff",
      strokeWeight: 3,
      strokeOpacity: 1,
    }
  }

  const createInfoWindowContent = (sighting: Sighting): string => {
    return `
      <div style="max-width: 320px; padding: 12px; font-family: system-ui, -apple-system, sans-serif;">
        <div style="display: flex; gap: 12px; margin-bottom: 12px;">
          <img src="${sighting.image}" alt="${sighting.species}" 
               style="width: 80px; height: 80px; border-radius: 8px; object-fit: cover; flex-shrink: 0;" />
          <div style="flex: 1; min-width: 0;">
            <h3 style="margin: 0 0 4px 0; font-size: 16px; font-weight: 600; color: #1f2937; line-height: 1.2;">
              ${sighting.species}
            </h3>
            <p style="margin: 0 0 6px 0; font-size: 12px; color: #6b7280; font-style: italic;">
              ${sighting.scientificName}
            </p>
            <p style="margin: 0 0 6px 0; font-size: 13px; color: #4b5563; display: flex; align-items: center;">
              <span style="margin-right: 4px;">📍</span> ${sighting.location}
            </p>
            <span style="display: inline-block; padding: 3px 8px; font-size: 10px; border-radius: 12px; 
                         background-color: ${sighting.status === "validated" ? "#10b981" : "#f59e0b"}; 
                         color: white; font-weight: 500;">
              ${sighting.status === "validated" ? "✓ Validado" : "⏳ Pendente"}
            </span>
          </div>
        </div>
        
        <div style="margin-bottom: 12px;">
          <p style="margin: 0 0 8px 0; font-size: 13px; color: #4b5563; line-height: 1.4;">
            ${sighting.description}
          </p>
        </div>

        ${
          sighting.depth && sighting.temperature
            ? `
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px; margin-bottom: 12px; 
                    padding: 8px; background-color: #f8fafc; border-radius: 6px;">
          <div style="text-align: center;">
            <div style="font-size: 11px; color: #6b7280; margin-bottom: 2px;">Profundidade</div>
            <div style="font-size: 14px; font-weight: 600; color: #1f2937;">${sighting.depth}m</div>
          </div>
          <div style="text-align: center;">
            <div style="font-size: 11px; color: #6b7280; margin-bottom: 2px;">Temperatura</div>
            <div style="font-size: 14px; font-weight: 600; color: #1f2937;">${sighting.temperature}°C</div>
          </div>
        </div>
        `
            : ""
        }

        <div style="padding-top: 8px; border-top: 1px solid #e5e7eb; font-size: 11px; color: #6b7280;">
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <span><strong>Observador:</strong> ${sighting.observer}</span>
            <span>${sighting.time}</span>
          </div>
        </div>
      </div>
    `
  }

  const handleMarkerClick = (sighting: Sighting) => {
    if (map) {
      map.panTo(sighting.coordinates)
      map.setZoom(12)
      setSelectedSighting(sighting)
    }
  }

  const centerOnBrazil = () => {
    if (map) {
      map.panTo({ lat: -14.235, lng: -51.9253 })
      map.setZoom(5)
    }
  }

  const fitAllMarkers = () => {
    if (map && markers.length > 0) {
      const bounds = new google.maps.LatLngBounds()
      markers.forEach((marker) => {
        bounds.extend(marker.getPosition()!)
      })
      map.fitBounds(bounds)
    }
  }

  return (
    <div className="space-y-4">
      {/* Controles do Mapa */}
      <div className="flex flex-wrap gap-2 items-center justify-between">
        <div className="flex flex-wrap gap-2">
          <Button
            size="sm"
            variant={mapType === "satellite" ? "default" : "outline"}
            onClick={() => setMapType("satellite")}
          >
            <Layers className="w-4 h-4 mr-1" />
            Satélite
          </Button>
          <Button
            size="sm"
            variant={mapType === "roadmap" ? "default" : "outline"}
            onClick={() => setMapType("roadmap")}
          >
            <MapPin className="w-4 h-4 mr-1" />
            Mapa
          </Button>
          <Button size="sm" variant={mapType === "hybrid" ? "default" : "outline"} onClick={() => setMapType("hybrid")}>
            <Eye className="w-4 h-4 mr-1" />
            Híbrido
          </Button>
        </div>

        <div className="flex gap-2">
          <Button size="sm" variant="outline" onClick={centerOnBrazil}>
            <Navigation className="w-4 h-4 mr-1" />
            Brasil
          </Button>
          <Button size="sm" variant="outline" onClick={fitAllMarkers}>
            <Eye className="w-4 h-4 mr-1" />
            Ver Todos
          </Button>
        </div>
      </div>

      {/* Container do Mapa */}
      <div className="relative h-96 rounded-lg overflow-hidden border border-blue-200 bg-blue-50">
        <div ref={mapRef} className="w-full h-full" />

        {/* Overlay de carregamento */}
        {isLoading && (
          <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-cyan-100 flex items-center justify-center">
            <div className="text-center">
              <MapPin className="w-16 h-16 mx-auto mb-4 text-blue-500 animate-pulse" />
              <p className="text-blue-700 font-medium">
                {GOOGLE_MAPS_API_KEY ? "Carregando Google Maps..." : "Modo Demonstração"}
              </p>
              <p className="text-blue-600 text-sm">
                {GOOGLE_MAPS_API_KEY ? "Preparando visualização interativa" : "Configure a API key para mapas reais"}
              </p>
            </div>
          </div>
        )}

        {/* Legenda */}
        <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-sm rounded-lg p-3 shadow-lg">
          <h4 className="font-semibold mb-2 text-sm text-gray-800">Legenda</h4>
          <div className="space-y-1 text-xs">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <span>Mamíferos ({realSightings.filter((s) => s.category === "mammals").length})</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span>Tartarugas ({realSightings.filter((s) => s.category === "turtles").length})</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
              <span>Peixes ({realSightings.filter((s) => s.category === "fish").length})</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
              <span>Outros ({realSightings.filter((s) => s.category === "other").length})</span>
            </div>
          </div>
        </div>

        {/* Estatísticas */}
        <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm rounded-lg p-3 shadow-lg">
          <div className="flex items-center space-x-2">
            <Eye className="w-4 h-4 text-blue-500" />
            <span className="text-sm font-medium">{filteredSightings.length} avistamentos</span>
          </div>
        </div>
      </div>

      {/* Lista de Avistamentos Recentes */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {filteredSightings.slice(0, 6).map((sighting) => (
          <Card
            key={sighting.id}
            className="cursor-pointer hover:shadow-md transition-all duration-300 border-gray-200 hover:border-blue-300"
            onClick={() => handleMarkerClick(sighting)}
          >
            <CardContent className="p-4">
              <div className="flex items-start justify-between mb-2">
                <h4 className="font-semibold text-sm text-gray-800 line-clamp-1">{sighting.species}</h4>
                <Badge variant={sighting.status === "validated" ? "default" : "secondary"} className="text-xs">
                  {sighting.status === "validated" ? "✓" : "⏳"}
                </Badge>
              </div>
              <p className="text-xs text-gray-600 mb-2 line-clamp-1">{sighting.location}</p>
              <p className="text-xs text-gray-500 mb-3 line-clamp-2">{sighting.description}</p>
              <div className="flex items-center justify-between text-xs text-gray-500">
                <span>{sighting.observer.split(" - ")[0]}</span>
                <span>{sighting.time}</span>
              </div>
              {sighting.depth && sighting.temperature && (
                <div className="flex justify-between mt-2 pt-2 border-t border-gray-100 text-xs">
                  <span>🌊 {sighting.depth}m</span>
                  <span>🌡️ {sighting.temperature}°C</span>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Instruções */}
      <Card className="border-blue-100 bg-blue-50">
        <CardContent className="p-4">
          <div className="flex items-start space-x-3">
            <Info className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="font-semibold text-blue-800 mb-1">Como usar o mapa</h4>
              <p className="text-sm text-blue-700">
                Clique nos marcadores para ver detalhes dos avistamentos. Use os controles para alternar entre
                diferentes visualizações do mapa. Clique nos cards abaixo para navegar diretamente para um avistamento.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
