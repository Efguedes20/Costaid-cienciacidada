"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Bell, X, MapPin, Fish, Clock, Eye } from "lucide-react"

interface Notification {
  id: string
  type: "new_sighting" | "validation" | "alert" | "system"
  title: string
  message: string
  timestamp: Date
  location?: string
  species?: string
  priority: "low" | "medium" | "high"
  read: boolean
}

interface NotificationSystemProps {
  userLocation?: { lat: number; lng: number }
  radius?: number // km
}

export default function NotificationSystem({ userLocation, radius = 50 }: NotificationSystemProps) {
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [isEnabled, setIsEnabled] = useState(false)
  const [permission, setPermission] = useState<NotificationPermission>("default")

  // Verificar permissão de notificações
  useEffect(() => {
    if ("Notification" in window) {
      setPermission(Notification.permission)
    }
  }, [])

  // Simular notificações em tempo real
  useEffect(() => {
    if (!isEnabled) return

    const interval = setInterval(() => {
      // Simular nova notificação aleatória
      if (Math.random() > 0.7) {
        addNotification(generateRandomNotification())
      }
    }, 30000) // A cada 30 segundos

    return () => clearInterval(interval)
  }, [isEnabled])

  const requestPermission = async () => {
    if ("Notification" in window) {
      const permission = await Notification.requestPermission()
      setPermission(permission)
      if (permission === "granted") {
        setIsEnabled(true)
      }
    }
  }

  const addNotification = (notification: Notification) => {
    setNotifications((prev) => [notification, ...prev.slice(0, 9)]) // Manter apenas 10 notificações

    // Mostrar notificação do navegador se permitido
    if (permission === "granted" && notification.priority === "high") {
      new Notification(notification.title, {
        body: notification.message,
        icon: "/placeholder.svg?height=64&width=64&text=🐋",
        tag: notification.id,
      })
    }
  }

  const generateRandomNotification = (): Notification => {
    const types = ["new_sighting", "validation", "alert"]
    const species = ["Baleia Jubarte", "Tartaruga Verde", "Golfinho", "Tubarão Baleia"]
    const locations = ["Abrolhos, BA", "Fernando de Noronha, PE", "Ubatuba, SP", "Maragogi, AL"]

    const type = types[Math.floor(Math.random() * types.length)] as Notification["type"]
    const selectedSpecies = species[Math.floor(Math.random() * species.length)]
    const selectedLocation = locations[Math.floor(Math.random() * locations.length)]

    const notifications = {
      new_sighting: {
        title: "Novo Avistamento Próximo",
        message: `${selectedSpecies} avistado em ${selectedLocation}`,
        priority: "high" as const,
      },
      validation: {
        title: "Avistamento Validado",
        message: `Seu registro de ${selectedSpecies} foi validado por especialistas`,
        priority: "medium" as const,
      },
      alert: {
        title: "Alerta Ambiental",
        message: `Mudança nas condições oceânicas detectada em ${selectedLocation}`,
        priority: "high" as const,
      },
    }

    const notificationData = notifications[type]

    return {
      id: `notif_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      type,
      title: notificationData.title,
      message: notificationData.message,
      timestamp: new Date(),
      location: selectedLocation,
      species: selectedSpecies,
      priority: notificationData.priority,
      read: false,
    }
  }

  const markAsRead = (id: string) => {
    setNotifications((prev) => prev.map((notif) => (notif.id === id ? { ...notif, read: true } : notif)))
  }

  const removeNotification = (id: string) => {
    setNotifications((prev) => prev.filter((notif) => notif.id !== id))
  }

  const clearAll = () => {
    setNotifications([])
  }

  const unreadCount = notifications.filter((n) => !n.read).length

  const getNotificationIcon = (type: Notification["type"]) => {
    switch (type) {
      case "new_sighting":
        return <Eye className="w-4 h-4" />
      case "validation":
        return <Fish className="w-4 h-4" />
      case "alert":
        return <MapPin className="w-4 h-4" />
      default:
        return <Bell className="w-4 h-4" />
    }
  }

  const getPriorityColor = (priority: Notification["priority"]) => {
    switch (priority) {
      case "high":
        return "bg-red-100 border-red-200 text-red-800"
      case "medium":
        return "bg-yellow-100 border-yellow-200 text-yellow-800"
      default:
        return "bg-blue-100 border-blue-200 text-blue-800"
    }
  }

  return (
    <Card className="border-blue-100">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center">
            <Bell className="w-5 h-5 mr-2" />
            Notificações
            {unreadCount > 0 && (
              <Badge variant="destructive" className="ml-2">
                {unreadCount}
              </Badge>
            )}
          </div>
          <div className="flex gap-2">
            {!isEnabled && permission !== "granted" && (
              <Button size="sm" onClick={requestPermission} variant="outline">
                Ativar
              </Button>
            )}
            {notifications.length > 0 && (
              <Button size="sm" onClick={clearAll} variant="ghost">
                Limpar
              </Button>
            )}
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {permission === "denied" && (
          <div className="bg-yellow-50 p-3 rounded-lg mb-4">
            <p className="text-yellow-800 text-sm">
              Notificações bloqueadas. Permita notificações nas configurações do navegador para receber alertas em tempo
              real.
            </p>
          </div>
        )}

        {isEnabled && notifications.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <Bell className="w-12 h-12 mx-auto mb-3 opacity-50" />
            <p>Nenhuma notificação no momento</p>
            <p className="text-sm">Você será notificado sobre novos avistamentos próximos</p>
          </div>
        )}

        <div className="space-y-3">
          {notifications.map((notification) => (
            <div
              key={notification.id}
              className={`p-3 rounded-lg border transition-all duration-200 ${
                notification.read ? "bg-gray-50 border-gray-200" : getPriorityColor(notification.priority)
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3 flex-1">
                  <div className="mt-0.5">{getNotificationIcon(notification.type)}</div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-sm">{notification.title}</h4>
                    <p className="text-sm opacity-90 mt-1">{notification.message}</p>
                    <div className="flex items-center space-x-4 mt-2 text-xs opacity-75">
                      <div className="flex items-center">
                        <Clock className="w-3 h-3 mr-1" />
                        {notification.timestamp.toLocaleTimeString()}
                      </div>
                      {notification.location && (
                        <div className="flex items-center">
                          <MapPin className="w-3 h-3 mr-1" />
                          {notification.location}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-1 ml-2">
                  {!notification.read && (
                    <Button size="sm" variant="ghost" onClick={() => markAsRead(notification.id)}>
                      Marcar como lida
                    </Button>
                  )}
                  <Button size="sm" variant="ghost" onClick={() => removeNotification(notification.id)}>
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {isEnabled && (
          <div className="mt-4 pt-4 border-t border-gray-200">
            <div className="flex items-center justify-between text-sm text-gray-600">
              <span>Notificações ativas para raio de {radius}km</span>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => setIsEnabled(!isEnabled)}
                className="text-blue-600 hover:text-blue-700"
              >
                {isEnabled ? "Desativar" : "Ativar"}
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
