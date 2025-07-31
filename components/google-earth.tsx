"use client"

import { useEffect, useRef, useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Globe, Eye, RotateCcw, ZoomIn, ZoomOut, Layers, Navigation, Info } from "lucide-react"

interface GoogleEarthComponentProps {
  selectedSpecies?: string
}

interface EarthSighting {
  id: string
  species: string
  location: string
  coordinates: { lat: number; lng: number; altitude: number }
  category: "mammals" | "turtles" | "fish" | "other"
  depth: number
  temperature: number
  status: "validated" | "pending"
  oceanZone: string
  currentSpeed: number
  salinity: number
}

// Dados simulados para visualização 3D com informações oceanográficas
const earthSightings: EarthSighting[] = [
  {
    id: "1",
    species: "Baleia Jubarte",
    location: "Abrolhos, BA",
    coordinates: { lat: -17.9578, lng: -38.6917, altitude: 0 },
    category: "mammals",
    depth: 50,
    temperature: 24.5,
    status: "validated",
    oceanZone: "Plataforma Continental",
    currentSpeed: 2.1,
    salinity: 35.2,
  },
  {
    id: "2",
    species: "Tartaruga Verde",
    location: "Ubatuba, SP",
    coordinates: { lat: -23.4336, lng: -45.0838, altitude: 0 },
    category: "turtles",
    depth: 15,
    temperature: 22.1,
    status: "pending",
    oceanZone: "Zona Costeira",
    currentSpeed: 1.5,
    salinity: 34.8,
  },
  {
    id: "3",
    species: "Golfinho Nariz-de-garrafa",
    location: "Fernando de Noronha, PE",
    coordinates: { lat: -3.8536, lng: -32.4297, altitude: 0 },
    category: "mammals",
    depth: 30,
    temperature: 26.8,
    status: "validated",
    oceanZone: "Águas Oceânicas",
    currentSpeed: 3.2,
    salinity: 36.1,
  },
  {
    id: "4",
    species: "Tubarão Baleia",
    location: "Laje de Santos, SP",
    coordinates: { lat: -24.3167, lng: -46.1833, altitude: 0 },
    category: "fish",
    depth: 5,
    temperature: 21.8,
    status: "validated",
    oceanZone: "Zona Pelágica",
    currentSpeed: 2.8,
    salinity: 35.5,
  },
]

export default function GoogleEarthComponent({ selectedSpecies = "all" }: GoogleEarthComponentProps) {
  const earthRef = useRef<HTMLDivElement>(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [currentView, setCurrentView] = useState("ocean")
  const [selectedSighting, setSelectedSighting] = useState<EarthSighting | null>(null)
  const [showEnvironmentalData, setShowEnvironmentalData] = useState(true)
  const [rotation, setRotation] = useState(0)

  // Filtrar avistamentos baseado na espécie selecionada
  const filteredSightings =
    selectedSpecies === "all"
      ? earthSightings
      : earthSightings.filter((sighting) => sighting.category === selectedSpecies)

  useEffect(() => {
    if (!earthRef.current) return

    const initGoogleEarth = () => {
      // Simular carregamento do Google Earth Engine
      setIsLoaded(true)
    }

    // Simular tempo de carregamento
    const timer = setTimeout(initGoogleEarth, 2000)
    return () => clearTimeout(timer)
  }, [])

  // Animação de rotação automática
  useEffect(() => {
    if (!isLoaded) return

    const interval = setInterval(() => {
      setRotation((prev) => (prev + 0.5) % 360)
    }, 100)

    return () => clearInterval(interval)
  }, [isLoaded])

  const handleViewChange = (view: string) => {
    setCurrentView(view)
  }

  const handleZoomToLocation = (sighting: EarthSighting) => {
    setSelectedSighting(sighting)
  }

  const resetView = () => {
    setSelectedSighting(null)
    setCurrentView("ocean")
  }

  const getMarkerColor = (category: string): string => {
    switch (category) {
      case "mammals":
        return "#60a5fa" // Azul claro
      case "turtles":
        return "#34d399" // Verde claro
      case "fish":
        return "#a78bfa" // Roxo claro
      default:
        return "#fbbf24" // Amarelo
    }
  }

  const getEnvironmentalColor = (temperature: number): string => {
    if (temperature < 20) return "#3b82f6" // Azul - frio
    if (temperature < 25) return "#10b981" // Verde - moderado
    return "#f59e0b" // Laranja - quente
  }

  return (
    <div className="space-y-4">
      {/* Controles 3D */}
      <div className="flex flex-wrap gap-2 items-center justify-between">
        <div className="flex flex-wrap gap-2">
          <Button
            size="sm"
            variant={currentView === "ocean" ? "default" : "outline"}
            onClick={() => handleViewChange("ocean")}
          >
            <Globe className="w-4 h-4 mr-2" />
            Vista Oceânica
          </Button>
          <Button
            size="sm"
            variant={currentView === "satellite" ? "default" : "outline"}
            onClick={() => handleViewChange("satellite")}
          >
            <Eye className="w-4 h-4 mr-2" />
            Satélite 3D
          </Button>
          <Button
            size="sm"
            variant={currentView === "terrain" ? "default" : "outline"}
            onClick={() => handleViewChange("terrain")}
          >
            <Layers className="w-4 h-4 mr-2" />
            Relevo Submarino
          </Button>
        </div>

        <div className="flex gap-2">
          <Button size="sm" variant="outline" onClick={() => setShowEnvironmentalData(!showEnvironmentalData)}>
            <Info className="w-4 h-4 mr-1" />
            Dados Ambientais
          </Button>
          <Button size="sm" variant="outline" onClick={resetView}>
            <RotateCcw className="w-4 h-4 mr-1" />
            Reset
          </Button>
        </div>
      </div>

      {/* Container 3D Earth */}
      <div className="relative h-96 rounded-lg overflow-hidden border border-blue-200 bg-gradient-to-b from-blue-400 via-blue-500 to-blue-900">
        <div ref={earthRef} className="w-full h-full relative">
          {!isLoaded ? (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center text-white">
                <Globe className="w-16 h-16 mx-auto mb-4 animate-spin" />
                <p className="font-medium">Carregando Google Earth 3D...</p>
                <p className="text-sm opacity-80">Preparando visualização tridimensional dos oceanos</p>
              </div>
            </div>
          ) : (
            <>
              {/* Visualização 3D Simulada */}
              <div className="absolute inset-0 bg-gradient-to-b from-blue-400 via-blue-500 to-blue-900 overflow-hidden">
                {/* Terra simulada com rotação */}
                <div
                  className="absolute inset-0 opacity-30"
                  style={{
                    background: `radial-gradient(circle at 50% 50%, 
                      rgba(34, 197, 94, 0.3) 0%, 
                      rgba(34, 197, 94, 0.2) 30%, 
                      rgba(59, 130, 246, 0.1) 70%, 
                      transparent 100%)`,
                    transform: `rotate(${rotation}deg)`,
                  }}
                >
                  {/* Continentes simulados */}
                  <div className="absolute top-1/3 left-1/4 w-32 h-16 bg-green-600 opacity-40 rounded-full transform rotate-12"></div>
                  <div className="absolute bottom-1/3 right-1/4 w-24 h-20 bg-green-600 opacity-40 rounded-full transform -rotate-12"></div>
                </div>

                {/* Correntes oceânicas animadas */}
                <div className="absolute inset-0">
                  {[...Array(5)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute bg-cyan-300 opacity-30 animate-pulse"
                      style={{
                        width: `${20 + i * 8}px`,
                        height: "2px",
                        top: `${20 + i * 15}%`,
                        left: `${10 + i * 20}%`,
                        transform: `rotate(${15 + i * 30}deg)`,
                        animationDelay: `${i * 0.5}s`,
                      }}
                    ></div>
                  ))}
                </div>

                {/* Marcadores 3D para avistamentos */}
                {filteredSightings.map((sighting, index) => {
                  const markerColor = getMarkerColor(sighting.category)
                  const envColor = getEnvironmentalColor(sighting.temperature)

                  return (
                    <div key={sighting.id} className="absolute">
                      {/* Marcador principal */}
                      <div
                        className="relative cursor-pointer transform transition-all duration-300 hover:scale-150"
                        style={{
                          top: `${25 + index * 12}%`,
                          left: `${20 + index * 15}%`,
                        }}
                        onClick={() => handleZoomToLocation(sighting)}
                      >
                        {/* Pulso de fundo */}
                        <div
                          className="absolute w-8 h-8 rounded-full animate-ping opacity-30"
                          style={{ backgroundColor: markerColor }}
                        ></div>

                        {/* Marcador principal */}
                        <div
                          className="relative w-4 h-4 rounded-full shadow-lg animate-pulse"
                          style={{
                            backgroundColor: markerColor,
                            boxShadow: `0 0 20px ${markerColor}`,
                          }}
                        >
                          {/* Indicador de profundidade */}
                          <div
                            className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-1 bg-white opacity-70"
                            style={{ height: `${Math.min(sighting.depth / 5, 20)}px` }}
                          ></div>
                        </div>

                        {/* Tooltip */}
                        <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-black/90 text-white text-xs px-3 py-2 rounded opacity-0 hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                          <div className="font-semibold">{sighting.species}</div>
                          <div>{sighting.location}</div>
                          <div>
                            {sighting.depth}m • {sighting.temperature}°C
                          </div>
                        </div>
                      </div>

                      {/* Dados ambientais flutuantes */}
                      {showEnvironmentalData && (
                        <div
                          className="absolute text-xs text-white bg-black/60 px-2 py-1 rounded opacity-80"
                          style={{
                            top: `${30 + index * 12}%`,
                            left: `${35 + index * 15}%`,
                          }}
                        >
                          <div>{sighting.temperature}°C</div>
                          <div>{sighting.currentSpeed} nós</div>
                        </div>
                      )}
                    </div>
                  )
                })}

                {/* Zona de seleção */}
                {selectedSighting && (
                  <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                    <div className="bg-white/95 rounded-lg p-4 max-w-sm mx-4">
                      <h3 className="font-bold text-lg mb-2">{selectedSighting.species}</h3>
                      <p className="text-sm text-gray-600 mb-3">{selectedSighting.location}</p>
                      <div className="grid grid-cols-2 gap-3 text-sm">
                        <div>
                          <span className="font-medium">Profundidade:</span>
                          <br />
                          {selectedSighting.depth}m
                        </div>
                        <div>
                          <span className="font-medium">Temperatura:</span>
                          <br />
                          {selectedSighting.temperature}°C
                        </div>
                        <div>
                          <span className="font-medium">Corrente:</span>
                          <br />
                          {selectedSighting.currentSpeed} nós
                        </div>
                        <div>
                          <span className="font-medium">Salinidade:</span>
                          <br />
                          {selectedSighting.salinity} PSU
                        </div>
                      </div>
                      <div className="mt-3 pt-3 border-t">
                        <span className="font-medium">Zona Oceânica:</span>
                        <br />
                        {selectedSighting.oceanZone}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Controles 3D */}
              <div className="absolute top-4 right-4 flex flex-col gap-2">
                <Button size="sm" variant="secondary" className="bg-white/90 hover:bg-white">
                  <ZoomIn className="w-4 h-4" />
                </Button>
                <Button size="sm" variant="secondary" className="bg-white/90 hover:bg-white">
                  <ZoomOut className="w-4 h-4" />
                </Button>
                <Button size="sm" variant="secondary" className="bg-white/90 hover:bg-white">
                  <Navigation className="w-4 h-4" />
                </Button>
              </div>

              {/* Dados Ambientais Globais */}
              {showEnvironmentalData && (
                <div className="absolute bottom-4 left-4 bg-black/80 text-white rounded-lg p-3 text-sm">
                  <h4 className="font-semibold mb-2 flex items-center">
                    <Globe className="w-4 h-4 mr-2" />
                    Dados Oceânicos 3D
                  </h4>
                  <div className="space-y-1">
                    <div>🌡️ Temp. Média: 24.1°C</div>
                    <div>🌊 Prof. Média: 32m</div>
                    <div>💨 Corrente: 2.4 nós NE</div>
                    <div>🧂 Salinidade: 35.4 PSU</div>
                    <div>📊 pH: 8.1</div>
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {/* Legenda 3D */}
        <div className="absolute bottom-4 right-4 bg-white/95 backdrop-blur-sm rounded-lg p-3 shadow-lg">
          <h4 className="font-semibold mb-2 text-sm text-gray-800">Legenda 3D</h4>
          <div className="space-y-1 text-xs">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-blue-400 rounded-full shadow-sm"></div>
              <span>Mamíferos</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-400 rounded-full shadow-sm"></div>
              <span>Tartarugas</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-purple-400 rounded-full shadow-sm"></div>
              <span>Peixes</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-1 h-3 bg-cyan-300 opacity-70"></div>
              <span>Correntes</span>
            </div>
          </div>
        </div>
      </div>

      {/* Cards de Avistamentos 3D */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {filteredSightings.map((sighting) => (
          <Card
            key={sighting.id}
            className="cursor-pointer hover:shadow-lg transition-all duration-300 border-gray-200 hover:border-blue-300"
            onClick={() => handleZoomToLocation(sighting)}
          >
            <CardContent className="p-4">
              <div className="flex items-start justify-between mb-2">
                <h4 className="font-semibold text-sm text-gray-800">{sighting.species}</h4>
                <Badge variant={sighting.status === "validated" ? "default" : "secondary"} className="text-xs">
                  {sighting.status === "validated" ? "✓" : "⏳"}
                </Badge>
              </div>
              <p className="text-xs text-gray-600 mb-3">{sighting.location}</p>
              <div className="space-y-1 text-xs text-gray-500">
                <div className="flex justify-between">
                  <span>Profundidade:</span>
                  <span>{sighting.depth}m</span>
                </div>
                <div className="flex justify-between">
                  <span>Temperatura:</span>
                  <span>{sighting.temperature}°C</span>
                </div>
                <div className="flex justify-between">
                  <span>Corrente:</span>
                  <span>{sighting.currentSpeed} nós</span>
                </div>
              </div>
              <div className="mt-2 pt-2 border-t border-gray-100">
                <span className="text-xs text-gray-500">{sighting.oceanZone}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Instruções 3D */}
      <Card className="border-blue-100 bg-blue-50">
        <CardContent className="p-4">
          <div className="flex items-start space-x-3">
            <Globe className="w-5 h-5 text-blue-500 mt-0.5" />
            <div>
              <h4 className="font-semibold text-blue-800 mb-1">Navegação 3D</h4>
              <p className="text-sm text-blue-700">
                Clique nos marcadores pulsantes para visualizar detalhes dos avistamentos em 3D. Use os controles para
                alternar entre diferentes visualizações oceânicas. Os dados ambientais são exibidos em tempo real.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
