"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { MapPin, Navigation, AlertCircle, CheckCircle } from "lucide-react"

interface GeolocationData {
  latitude: number
  longitude: number
  accuracy: number
  timestamp: number
}

interface GeolocationHandlerProps {
  onLocationUpdate: (location: GeolocationData) => void
  autoUpdate?: boolean
}

export default function GeolocationHandler({ onLocationUpdate, autoUpdate = false }: GeolocationHandlerProps) {
  const [location, setLocation] = useState<GeolocationData | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [permission, setPermission] = useState<"granted" | "denied" | "prompt" | "unknown">("unknown")

  // Verificar permissão de geolocalização
  useEffect(() => {
    if ("permissions" in navigator) {
      navigator.permissions.query({ name: "geolocation" }).then((result) => {
        setPermission(result.state)
      })
    }
  }, [])

  // Auto-update da localização
  useEffect(() => {
    if (autoUpdate && permission === "granted") {
      getCurrentLocation()
    }
  }, [autoUpdate, permission])

  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      setError("Geolocalização não é suportada neste navegador")
      return
    }

    setIsLoading(true)
    setError(null)

    const options: PositionOptions = {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 60000, // Cache por 1 minuto
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const locationData: GeolocationData = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          accuracy: position.coords.accuracy,
          timestamp: position.timestamp,
        }

        setLocation(locationData)
        setIsLoading(false)
        onLocationUpdate(locationData)
      },
      (error) => {
        setIsLoading(false)
        switch (error.code) {
          case error.PERMISSION_DENIED:
            setError("Permissão de localização negada")
            setPermission("denied")
            break
          case error.POSITION_UNAVAILABLE:
            setError("Localização indisponível")
            break
          case error.TIMEOUT:
            setError("Tempo limite excedido")
            break
          default:
            setError("Erro desconhecido ao obter localização")
            break
        }
      },
      options,
    )
  }

  const formatAccuracy = (accuracy: number): string => {
    if (accuracy < 10) return "Muito precisa"
    if (accuracy < 50) return "Precisa"
    if (accuracy < 100) return "Moderada"
    return "Baixa precisão"
  }

  const formatCoordinates = (lat: number, lng: number): string => {
    return `${lat.toFixed(6)}, ${lng.toFixed(6)}`
  }

  return (
    <Card className="border-blue-100">
      <CardContent className="p-4">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="font-semibold text-gray-800 flex items-center">
              <Navigation className="w-4 h-4 mr-2" />
              Localização GPS
            </h4>
            <Button
              size="sm"
              onClick={getCurrentLocation}
              disabled={isLoading}
              className="bg-blue-500 hover:bg-blue-600"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 mr-2 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                  Obtendo...
                </>
              ) : (
                <>
                  <MapPin className="w-4 h-4 mr-2" />
                  Obter Localização
                </>
              )}
            </Button>
          </div>

          {error && (
            <div className="flex items-center space-x-2 text-red-600 bg-red-50 p-3 rounded-lg">
              <AlertCircle className="w-4 h-4" />
              <span className="text-sm">{error}</span>
            </div>
          )}

          {location && (
            <div className="bg-green-50 p-3 rounded-lg">
              <div className="flex items-center space-x-2 text-green-700 mb-2">
                <CheckCircle className="w-4 h-4" />
                <span className="text-sm font-medium">Localização obtida com sucesso</span>
              </div>
              <div className="space-y-1 text-sm text-gray-600">
                <div>
                  <strong>Coordenadas:</strong> {formatCoordinates(location.latitude, location.longitude)}
                </div>
                <div>
                  <strong>Precisão:</strong> {formatAccuracy(location.accuracy)} ({location.accuracy.toFixed(0)}m)
                </div>
                <div>
                  <strong>Obtido em:</strong> {new Date(location.timestamp).toLocaleTimeString()}
                </div>
              </div>
            </div>
          )}

          {permission === "denied" && (
            <div className="bg-yellow-50 p-3 rounded-lg">
              <div className="text-yellow-800 text-sm">
                <strong>Permissão negada:</strong> Para usar a localização automática, permita o acesso à localização
                nas configurações do navegador.
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
