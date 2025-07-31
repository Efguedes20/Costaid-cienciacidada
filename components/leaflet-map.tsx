"use client"

import { useEffect, useRef, useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MapPin, Eye, Navigation, Layers, Info, Waves } from "lucide-react"

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

interface LeafletMapProps {
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
    image: "/placeholder.svg?height=100&width=100&text=🐋",
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
    image: "/placeholder.svg?height=100&width=100&text=🐢",
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
    image: "/placeholder.svg?height=100&width=100&text=🐬",
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
    image: "/placeholder.svg?height=100&width=100&text=🦭",
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
    image: "/placeholder.svg?height=100&width=100&text=🦈",
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
    image: "/placeholder.svg?height=100&width=100&text=🐢",
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
    image: "/placeholder.svg?height=100&width=100&text=🐬",
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
    image: "/placeholder.svg?height=100&width=100&text=🐟",
    observer: "Dra. Fernanda Lopes - UFPE",
    description: "Indivíduo adulto com envergadura de aproximadamente 4 metros. Estação de limpeza ativa.",
    depth: 15,
    temperature: 27.2,
  },
]

export default function LeafletMap({ selectedSpecies = "all" }: LeafletMapProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const [map, setMap] = useState<any | null>(null)
  const [markers, setMarkers] = useState<any[]>([])
  const [selectedSighting, setSelectedSighting] = useState<Sighting | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [mapLayer, setMapLayer] = useState<"street" | "satellite" | "ocean">("ocean")

  // Filtrar avistamentos baseado na espécie selecionada
  const filteredSightings =
    selectedSpecies === "all"
      ? realSightings
      : realSightings.filter((sighting) => sighting.category === selectedSpecies)

  // Carregar Leaflet dinamicamente
  useEffect(() => {
    const loadLeaflet = async () => {
      if (typeof window === "undefined") return

      try {
        // Carregar CSS do Leaflet
        if (!document.querySelector('link[href*="leaflet"]')) {
          const link = document.createElement("link")
          link.rel = "stylesheet"
          link.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
          document.head.appendChild(link)
        }

        // Carregar JavaScript do Leaflet
        const L = await import("leaflet")

        // Fix para ícones padrão do Leaflet
        delete (L.Icon.Default.prototype as any)._getIconUrl
        L.Icon.Default.mergeOptions({
          iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
          iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
          shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
        })

        if (mapRef.current && !map) {
          // Inicializar mapa
          const mapInstance = L.map(mapRef.current, {
            center: [-14.235, -51.9253], // Centro do Brasil
            zoom: 5,
            zoomControl: true,
            scrollWheelZoom: true,
            doubleClickZoom: true,
            dragging: true,
          })

          // Adicionar camada base
          const getMapLayer = () => {
            switch (mapLayer) {
              case "satellite":
                return L.tileLayer(
                  "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
                  {
                    attribution: "© Esri",
                    maxZoom: 18,
                  },
                )
              case "street":
                return L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
                  attribution: "© OpenStreetMap contributors",
                  maxZoom: 19,
                })
              default: // ocean
                return L.tileLayer(
                  "https://server.arcgisonline.com/ArcGIS/rest/services/Ocean/World_Ocean_Base/MapServer/tile/{z}/{y}/{x}",
                  {
                    attribution: "© Esri",
                    maxZoom: 16,
                  },
                )
            }
          }

          const tileLayer = getMapLayer()
          tileLayer.addTo(mapInstance)

          setMap(mapInstance)
          setIsLoading(false)
        }
      } catch (error) {
        console.error("Erro ao carregar Leaflet:", error)
        setIsLoading(false)
      }
    }

    loadLeaflet()
  }, [map, mapLayer])

  // Atualizar marcadores quando os avistamentos filtrados mudarem
  useEffect(() => {
    if (!map || typeof window === "undefined") return

    const updateMarkers = async () => {
      const L = await import("leaflet")

      // Limpar marcadores existentes
      markers.forEach((marker) => map.removeLayer(marker))
      setMarkers([])

      const newMarkers: any[] = []

      filteredSightings.forEach((sighting) => {
        const markerColor = getMarkerColor(sighting.category)
        const markerIcon = createCustomIcon(L, sighting.category, markerColor)

        const marker = L.marker([sighting.coordinates.lat, sighting.coordinates.lng], {
          icon: markerIcon,
        }).addTo(map)

        // Criar popup personalizado
        const popupContent = createPopupContent(sighting)
        marker.bindPopup(popupContent, {
          maxWidth: 350,
          className: "custom-popup",
        })

        marker.on("click", () => {
          setSelectedSighting(sighting)
          map.setView([sighting.coordinates.lat, sighting.coordinates.lng], 10)
        })

        newMarkers.push(marker)
      })

      setMarkers(newMarkers)
    }

    updateMarkers()
  }, [map, filteredSightings])

  // Atualizar camada do mapa
  useEffect(() => {
    if (!map) return

    const updateMapLayer = async () => {
      const L = await import("leaflet")

      // Remover camadas existentes
      map.eachLayer((layer: any) => {
        if (layer instanceof L.TileLayer) {
          map.removeLayer(layer)
        }
      })

      // Adicionar nova camada
      const getMapLayer = () => {
        switch (mapLayer) {
          case "satellite":
            return L.tileLayer(
              "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
              {
                attribution: "© Esri",
                maxZoom: 18,
              },
            )
          case "street":
            return L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
              attribution: "© OpenStreetMap contributors",
              maxZoom: 19,
            })
          default: // ocean
            return L.tileLayer(
              "https://server.arcgisonline.com/ArcGIS/rest/services/Ocean/World_Ocean_Base/MapServer/tile/{z}/{y}/{x}",
              {
                attribution: "© Esri",
                maxZoom: 16,
              },
            )
        }
      }

      const tileLayer = getMapLayer()
      tileLayer.addTo(map)

      // Re-adicionar marcadores
      markers.forEach((marker) => marker.addTo(map))
    }

    updateMapLayer()
  }, [mapLayer, map, markers])

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

  const createCustomIcon = (L: any, category: string, color: string) => {
    const getEmoji = (category: string): string => {
      switch (category) {
        case "mammals":
          return "🐋"
        case "turtles":
          return "🐢"
        case "fish":
          return "🐟"
        default:
          return "📍"
      }
    }

    return L.divIcon({
      html: `
        <div style="
          background-color: ${color};
          width: 30px;
          height: 30px;
          border-radius: 50%;
          border: 3px solid white;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 16px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.3);
          cursor: pointer;
          transition: transform 0.2s;
        " onmouseover="this.style.transform='scale(1.2)'" onmouseout="this.style.transform='scale(1)'">
          ${getEmoji(category)}
        </div>
      `,
      className: "custom-marker",
      iconSize: [30, 30],
      iconAnchor: [15, 15],
      popupAnchor: [0, -15],
    })
  }

  const createPopupContent = (sighting: Sighting): string => {
    return `
      <div style="font-family: system-ui, -apple-system, sans-serif; max-width: 320px;">
        <div style="display: flex; gap: 12px; margin-bottom: 12px;">
          <div style="width: 60px; height: 60px; background: linear-gradient(135deg, #3b82f6, #06b6d4); border-radius: 8px; display: flex; align-items: center; justify-content: center; font-size: 24px; flex-shrink: 0;">
            ${sighting.category === "mammals" ? "🐋" : sighting.category === "turtles" ? "🐢" : "🐟"}
          </div>
          <div style="flex: 1; min-width: 0;">
            <h3 style="margin: 0 0 4px 0; font-size: 16px; font-weight: 600; color: #1f2937; line-height: 1.2;">
              ${sighting.species}
            </h3>
            <p style="margin: 0 0 6px 0; font-size: 12px; color: #6b7280; font-style: italic;">
              ${sighting.scientificName}
            </p>
            <span style="display: inline-block; padding: 2px 6px; font-size: 10px; border-radius: 8px; 
                         background-color: ${sighting.status === "validated" ? "#10b981" : "#f59e0b"}; 
                         color: white; font-weight: 500;">
              ${sighting.status === "validated" ? "✓ Validado" : "⏳ Pendente"}
            </span>
          </div>
        </div>
        
        <div style="margin-bottom: 12px;">
          <p style="margin: 0 0 8px 0; font-size: 13px; color: #4b5563; line-height: 1.4;">
            📍 ${sighting.location}
          </p>
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
            <div style="font-size: 11px; color: #6b7280; margin-bottom: 2px;">🌊 Profundidade</div>
            <div style="font-size: 14px; font-weight: 600; color: #1f2937;">${sighting.depth}m</div>
          </div>
          <div style="text-align: center;">
            <div style="font-size: 11px; color: #6b7280; margin-bottom: 2px;">🌡️ Temperatura</div>
            <div style="font-size: 14px; font-weight: 600; color: #1f2937;">${sighting.temperature}°C</div>
          </div>
        </div>
        `
            : ""
        }

        <div style="padding-top: 8px; border-top: 1px solid #e5e7eb; font-size: 11px; color: #6b7280;">
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <span><strong>👤 ${sighting.observer}</strong></span>
            <span>🕒 ${sighting.time}</span>
          </div>
        </div>
      </div>
    `
  }

  const handleMarkerClick = (sighting: Sighting) => {
    if (map) {
      map.setView([sighting.coordinates.lat, sighting.coordinates.lng], 12)
      setSelectedSighting(sighting)
    }
  }

  const centerOnBrazil = () => {
    if (map) {
      map.setView([-14.235, -51.9253], 5)
    }
  }

  const fitAllMarkers = () => {
    if (map && markers.length > 0) {
      const group = new (window as any).L.featureGroup(markers)
      map.fitBounds(group.getBounds().pad(0.1))
    }
  }

  return (
    <div className="space-y-4">
      {/* Controles do Mapa */}
      <div className="flex flex-wrap gap-2 items-center justify-between">
        <div className="flex flex-wrap gap-2">
          <Button size="sm" variant={mapLayer === "ocean" ? "default" : "outline"} onClick={() => setMapLayer("ocean")}>
            <Waves className="w-4 h-4 mr-1" />
            Oceânico
          </Button>
          <Button
            size="sm"
            variant={mapLayer === "satellite" ? "default" : "outline"}
            onClick={() => setMapLayer("satellite")}
          >
            <Layers className="w-4 h-4 mr-1" />
            Satélite
          </Button>
          <Button
            size="sm"
            variant={mapLayer === "street" ? "default" : "outline"}
            onClick={() => setMapLayer("street")}
          >
            <MapPin className="w-4 h-4 mr-1" />
            Ruas
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
              <p className="text-blue-700 font-medium">Carregando Mapa Leaflet...</p>
              <p className="text-blue-600 text-sm">Preparando visualização interativa</p>
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

        {/* Powered by Leaflet */}
        <div className="absolute bottom-4 right-4 bg-white/95 backdrop-blur-sm rounded-lg px-2 py-1 shadow-lg">
          <span className="text-xs text-gray-600">Powered by Leaflet.js</span>
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
                Mapa powered by Leaflet.js e OpenStreetMap.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
