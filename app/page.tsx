"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  MapPin,
  Camera,
  Users,
  BarChart3,
  Fish,
  Waves,
  Globe,
  BookOpen,
  Award,
  TrendingUp,
  Shield,
  Smartphone,
  Brain,
  Download,
  Mail,
  Phone,
  MapIcon,
  Eye,
  Star,
  ChevronRight,
  Menu,
  X,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import LeafletMap from "@/components/leaflet-map"

export default function CostaIDWebsite() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [selectedSpecies, setSelectedSpecies] = useState("all")

  const stats = [
    { label: "Avistamentos Registrados", value: "12,847", icon: Eye },
    { label: "Espécies Identificadas", value: "342", icon: Fish },
    { label: "Cientistas Cidadãos", value: "8,921", icon: Users },
    { label: "Áreas Monitoradas", value: "156", icon: MapPin },
  ]

  const recentSightings = [
    { species: "Baleia Jubarte", location: "Abrolhos, BA", time: "2h atrás", status: "validated" },
    { species: "Tartaruga Verde", location: "Ubatuba, SP", time: "4h atrás", status: "pending" },
    {
      species: "Golfinho Nariz-de-garrafa",
      location: "Fernando de Noronha, PE",
      time: "6h atrás",
      status: "validated",
    },
    { species: "Peixe-boi Marinho", location: "Maragogi, AL", time: "8h atrás", status: "validated" },
  ]

  const partners = [
    "Universidade de São Paulo (USP)",
    "Universidade Federal de São Paulo (UNIFESP)",
    "Universidade Estadual Paulista (UNESP)",
    "Sistema de Informação sobre a Biodiversidade Brasileira (SIBBR)",
    "Global Biodiversity Information Facility (GBIF)",
    "Instituto Chico Mendes (ICMBio)",
  ]

  const teamMembers = [
    {
      name: "Guilherme Mateus",
      role: "Idealizador e Coordenador Científico",
      bio: "Biólogo marinho especializado em conservação",
    },
    { name: "Édrei Felipe", role: "Desenvolvedor Full-Stack", bio: "Especialista em tecnologias web e IA" },
    { name: "Dr. Marina Santos", role: "Orientadora Científica", bio: "Professora de Oceanografia - USP" },
    { name: "Prof. Carlos Lima", role: "Consultor em IA", bio: "Especialista em Machine Learning - UNIFESP" },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-cyan-50">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-blue-100 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center">
                <Waves className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                  CostaID
                </h1>
                <p className="text-xs text-gray-600">Ciência Cidadã Marinha</p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <Link href="#inicio" className="text-gray-700 hover:text-blue-600 transition-colors">
                Início
              </Link>
              <Link href="#sobre" className="text-gray-700 hover:text-blue-600 transition-colors">
                Sobre
              </Link>
              <Link href="#como-funciona" className="text-gray-700 hover:text-blue-600 transition-colors">
                Como Funciona
              </Link>
              <Link href="#contribua" className="text-gray-700 hover:text-blue-600 transition-colors">
                Contribua
              </Link>
              <Link href="#mapa" className="text-gray-700 hover:text-blue-600 transition-colors">
                Mapa
              </Link>
              <Link href="#blog" className="text-gray-700 hover:text-blue-600 transition-colors">
                Blog
              </Link>
              <Link href="#equipe" className="text-gray-700 hover:text-blue-600 transition-colors">
                Equipe
              </Link>
              <Button className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600">
                <Camera className="w-4 h-4 mr-2" />
                Registrar Avistamento
              </Button>
            </nav>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </Button>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <nav className="md:hidden mt-4 pb-4 border-t border-blue-100 pt-4">
              <div className="flex flex-col space-y-3">
                <Link href="#inicio" className="text-gray-700 hover:text-blue-600 transition-colors">
                  Início
                </Link>
                <Link href="#sobre" className="text-gray-700 hover:text-blue-600 transition-colors">
                  Sobre
                </Link>
                <Link href="#como-funciona" className="text-gray-700 hover:text-blue-600 transition-colors">
                  Como Funciona
                </Link>
                <Link href="#contribua" className="text-gray-700 hover:text-blue-600 transition-colors">
                  Contribua
                </Link>
                <Link href="#mapa" className="text-gray-700 hover:text-blue-600 transition-colors">
                  Mapa
                </Link>
                <Link href="#blog" className="text-gray-700 hover:text-blue-600 transition-colors">
                  Blog
                </Link>
                <Link href="#equipe" className="text-gray-700 hover:text-blue-600 transition-colors">
                  Equipe
                </Link>
                <Button className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 w-full">
                  <Camera className="w-4 h-4 mr-2" />
                  Registrar Avistamento
                </Button>
              </div>
            </nav>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section id="inicio" className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 to-cyan-600/10"></div>
        <div className="container mx-auto px-4 relative">
          <div className="text-center max-w-4xl mx-auto mb-16">
            <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
              Tecnologia, Ciência Cidadã e Conservação Marinha em Conexão
            </h2>
            <p className="text-xl text-gray-700 mb-8 leading-relaxed">
              Conectamos cidadãos e cientistas em uma rede colaborativa para fortalecer a conservação marinha e o
              monitoramento climático através de registros de fauna marinha em tempo real.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-lg px-8 py-3"
              >
                <Camera className="w-5 h-5 mr-2" />
                Registrar Avistamento
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-blue-300 text-blue-600 hover:bg-blue-50 text-lg px-8 py-3 bg-transparent"
              >
                <MapIcon className="w-5 h-5 mr-2" />
                Explorar Mapa
              </Button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
            {stats.map((stat, index) => (
              <Card
                key={index}
                className="text-center border-blue-100 bg-white/80 backdrop-blur-sm hover:shadow-lg transition-all duration-300"
              >
                <CardContent className="pt-6">
                  <stat.icon className="w-8 h-8 mx-auto mb-3 text-blue-500" />
                  <div className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Interactive Map Preview */}
          <Card className="border-blue-100 bg-white/90 backdrop-blur-sm shadow-xl">
            <CardHeader>
              <CardTitle className="flex items-center text-blue-800">
                <MapIcon className="w-6 h-6 mr-2" />
                Mapa Interativo de Avistamentos
              </CardTitle>
              <CardDescription>Visualize os registros mais recentes da fauna marinha brasileira</CardDescription>
            </CardHeader>
            <CardContent>
              <LeafletMap selectedSpecies="all" />

              {/* Recent Sightings */}
              <div className="mt-6">
                <h4 className="font-semibold text-gray-800 mb-4">Avistamentos Recentes</h4>
                <div className="space-y-3">
                  {recentSightings.map((sighting, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <Fish className="w-5 h-5 text-blue-500" />
                        <div>
                          <p className="font-medium text-gray-800">{sighting.species}</p>
                          <p className="text-sm text-gray-600">{sighting.location}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-600">{sighting.time}</p>
                        <Badge variant={sighting.status === "validated" ? "default" : "secondary"} className="text-xs">
                          {sighting.status === "validated" ? "Validado" : "Pendente"}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* About Section */}
      <section id="sobre" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-4xl font-bold mb-6 text-gray-800">Sobre o Projeto CostaID</h2>
            <p className="text-xl text-gray-600 leading-relaxed">
              Uma plataforma inovadora que democratiza o monitoramento da biodiversidade marinha brasileira, conectando
              tecnologia de ponta com o poder da participação cidadã.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <h3 className="text-2xl font-bold mb-6 text-gray-800">Nossa Missão</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Desenvolver uma rede colaborativa que permita o registro, análise e compartilhamento de avistamentos de
                espécies marinhas em tempo real, fortalecendo a conservação marinha e o monitoramento climático através
                da ciência cidadã.
              </p>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <Shield className="w-6 h-6 text-blue-500 mt-1" />
                  <div>
                    <h4 className="font-semibold text-gray-800">Conservação Baseada em Dados</h4>
                    <p className="text-gray-600 text-sm">Decisões informadas para proteção da fauna marinha</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Users className="w-6 h-6 text-blue-500 mt-1" />
                  <div>
                    <h4 className="font-semibold text-gray-800">Engajamento Comunitário</h4>
                    <p className="text-gray-600 text-sm">Conectando cidadãos, pesquisadores e instituições</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Brain className="w-6 h-6 text-blue-500 mt-1" />
                  <div>
                    <h4 className="font-semibold text-gray-800">Tecnologia Inteligente</h4>
                    <p className="text-gray-600 text-sm">IA para identificação automática de espécies</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square bg-gradient-to-br from-blue-100 to-cyan-100 rounded-2xl overflow-hidden">
                <Image
                  src="/placeholder.svg?height=400&width=400"
                  alt="Conservação Marinha"
                  width={400}
                  height={400}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          {/* Problem Statement */}
          <Card className="border-orange-200 bg-orange-50 mb-16">
            <CardHeader>
              <CardTitle className="text-orange-800 flex items-center">
                <TrendingUp className="w-6 h-6 mr-2" />O Problema Ambiental
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-orange-700 leading-relaxed">
                Os oceanos brasileiros enfrentam desafios sem precedentes: mudanças climáticas, poluição, sobrepesca e
                perda de habitat. O monitoramento tradicional da biodiversidade marinha é limitado por recursos escassos
                e cobertura geográfica restrita. A ciência cidadã emerge como uma solução escalável para ampliar nossa
                capacidade de observação e resposta a essas ameaças ambientais.
              </p>
            </CardContent>
          </Card>

          {/* Partners */}
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-8 text-gray-800">Parceiros Institucionais</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {partners.map((partner, index) => (
                <Card key={index} className="border-blue-100 hover:shadow-md transition-shadow">
                  <CardContent className="pt-6 text-center">
                    <Globe className="w-8 h-8 mx-auto mb-3 text-blue-500" />
                    <p className="font-medium text-gray-800">{partner}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="como-funciona" className="py-20 bg-gradient-to-br from-blue-50 to-cyan-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-4xl font-bold mb-6 text-gray-800">Como Funciona</h2>
            <p className="text-xl text-gray-600">
              Um processo simples e tecnologicamente avançado para transformar suas observações em dados científicos
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8 mb-16">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Camera className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold mb-2 text-gray-800">1. Capture</h3>
              <p className="text-gray-600 text-sm">
                Fotografe ou filme a espécie marinha com localização GPS automática
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Brain className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold mb-2 text-gray-800">2. Análise IA</h3>
              <p className="text-gray-600 text-sm">
                Nossa IA identifica automaticamente a espécie usando modelos treinados
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-violet-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold mb-2 text-gray-800">3. Validação</h3>
              <p className="text-gray-600 text-sm">Especialistas verificam e validam a identificação da espécie</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <BarChart3 className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold mb-2 text-gray-800">4. Dados</h3>
              <p className="text-gray-600 text-sm">Informações são integradas ao banco de dados científico global</p>
            </div>
          </div>

          {/* Technologies */}
          <Card className="border-blue-100 bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-center text-blue-800">Tecnologias Utilizadas</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="text-center">
                  <Brain className="w-12 h-12 mx-auto mb-3 text-blue-500" />
                  <h4 className="font-semibold mb-2">Inteligência Artificial</h4>
                  <p className="text-sm text-gray-600">TensorFlow.js, FastAPI para classificação de imagens</p>
                </div>
                <div className="text-center">
                  <MapIcon className="w-12 h-12 mx-auto mb-3 text-green-500" />
                  <h4 className="font-semibold mb-2">Mapas Interativos</h4>
                  <p className="text-sm text-gray-600">Leaflet.js com geolocalização em tempo real</p>
                </div>
                <div className="text-center">
                  <BarChart3 className="w-12 h-12 mx-auto mb-3 text-purple-500" />
                  <h4 className="font-semibold mb-2">Banco de Dados</h4>
                  <p className="text-sm text-gray-600">Firebase/SQLite com integração SIBBR/GBIF</p>
                </div>
                <div className="text-center">
                  <Waves className="w-12 h-12 mx-auto mb-3 text-cyan-500" />
                  <h4 className="font-semibold mb-2">API Oceânica</h4>
                  <p className="text-sm text-gray-600">Dados climáticos e ambientais em tempo real</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Contribute Section */}
      <section id="contribua" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-4xl font-bold mb-6 text-gray-800">Contribua com a Ciência</h2>
            <p className="text-xl text-gray-600">
              Faça parte da maior rede de monitoramento colaborativo da fauna marinha brasileira
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Login/Registration */}
            <Card className="border-blue-100">
              <CardHeader>
                <CardTitle className="flex items-center text-blue-800">
                  <Users className="w-6 h-6 mr-2" />
                  Área do Contribuidor
                </CardTitle>
                <CardDescription>Faça login ou registre-se para começar a contribuir</CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="login" className="w-full">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="login">Login</TabsTrigger>
                    <TabsTrigger value="register">Registrar</TabsTrigger>
                  </TabsList>
                  <TabsContent value="login" className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Email</label>
                      <Input type="email" placeholder="seu@email.com" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Senha</label>
                      <Input type="password" placeholder="••••••••" />
                    </div>
                    <Button className="w-full bg-gradient-to-r from-blue-500 to-cyan-500">Entrar</Button>
                  </TabsContent>
                  <TabsContent value="register" className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Nome Completo</label>
                      <Input placeholder="Seu nome" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Email</label>
                      <Input type="email" placeholder="seu@email.com" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Tipo de Usuário</label>
                      <select className="w-full p-2 border border-gray-300 rounded-md">
                        <option>Público Geral</option>
                        <option>Pesquisador</option>
                        <option>Instituição</option>
                      </select>
                    </div>
                    <Button className="w-full bg-gradient-to-r from-green-500 to-emerald-500">Criar Conta</Button>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>

            {/* Sighting Form */}
            <Card className="border-green-100">
              <CardHeader>
                <CardTitle className="flex items-center text-green-800">
                  <Camera className="w-6 h-6 mr-2" />
                  Registrar Avistamento
                </CardTitle>
                <CardDescription>Compartilhe sua observação da fauna marinha</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Foto/Vídeo da Espécie</label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                    <Camera className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                    <p className="text-gray-600">Clique para adicionar foto ou vídeo</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Localização</label>
                    <Button variant="outline" className="w-full justify-start bg-transparent">
                      <MapPin className="w-4 h-4 mr-2" />
                      Usar GPS Atual
                    </Button>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Data/Hora</label>
                    <Input type="datetime-local" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Observações</label>
                  <Textarea placeholder="Descreva o comportamento, quantidade de indivíduos, condições ambientais..." />
                </div>
                <Button className="w-full bg-gradient-to-r from-green-500 to-emerald-500">
                  <Camera className="w-4 h-4 mr-2" />
                  Enviar Avistamento
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* User Dashboard Preview */}
          <Card className="mt-12 border-purple-100">
            <CardHeader>
              <CardTitle className="flex items-center text-purple-800">
                <Award className="w-6 h-6 mr-2" />
                Dashboard do Contribuidor
              </CardTitle>
              <CardDescription>Acompanhe suas contribuições e conquistas</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <Eye className="w-8 h-8 mx-auto mb-2 text-blue-500" />
                  <div className="text-2xl font-bold text-blue-600">23</div>
                  <div className="text-sm text-gray-600">Avistamentos Registrados</div>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <Star className="w-8 h-8 mx-auto mb-2 text-green-500" />
                  <div className="text-2xl font-bold text-green-600">18</div>
                  <div className="text-sm text-gray-600">Contribuições Validadas</div>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <Award className="w-8 h-8 mx-auto mb-2 text-purple-500" />
                  <div className="text-2xl font-bold text-purple-600">5</div>
                  <div className="text-sm text-gray-600">Conquistas Desbloqueadas</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Interactive Map Section */}
      <section id="mapa" className="py-20 bg-gradient-to-br from-blue-50 to-cyan-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-4xl font-bold mb-6 text-gray-800">Mapa Interativo</h2>
            <p className="text-xl text-gray-600">Explore os avistamentos da fauna marinha brasileira em tempo real</p>
          </div>

          <Card className="border-blue-100 bg-white/90 backdrop-blur-sm shadow-xl">
            <CardHeader>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <CardTitle className="flex items-center text-blue-800">
                  <MapIcon className="w-6 h-6 mr-2" />
                  Filtros de Visualização
                </CardTitle>
                <div className="flex flex-wrap gap-2">
                  <Button
                    size="sm"
                    variant={selectedSpecies === "all" ? "default" : "outline"}
                    onClick={() => setSelectedSpecies("all")}
                  >
                    Todas
                  </Button>
                  <Button
                    size="sm"
                    variant={selectedSpecies === "mammals" ? "default" : "outline"}
                    onClick={() => setSelectedSpecies("mammals")}
                  >
                    Mamíferos
                  </Button>
                  <Button
                    size="sm"
                    variant={selectedSpecies === "turtles" ? "default" : "outline"}
                    onClick={() => setSelectedSpecies("turtles")}
                  >
                    Tartarugas
                  </Button>
                  <Button
                    size="sm"
                    variant={selectedSpecies === "fish" ? "default" : "outline"}
                    onClick={() => setSelectedSpecies("fish")}
                  >
                    Peixes
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <LeafletMap selectedSpecies={selectedSpecies} />
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Blog Section */}
      <section id="blog" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-4xl font-bold mb-6 text-gray-800">Blog e Notícias</h2>
            <p className="text-xl text-gray-600">
              Fique por dentro das últimas descobertas e novidades da conservação marinha
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-blue-100 hover:shadow-lg transition-shadow">
              <div className="aspect-video bg-gradient-to-br from-blue-100 to-cyan-100 rounded-t-lg overflow-hidden">
                <Image
                  src="/placeholder.svg?height=200&width=300"
                  alt="Mudanças Climáticas"
                  width={300}
                  height={200}
                  className="w-full h-full object-cover"
                />
              </div>
              <CardHeader>
                <Badge className="w-fit mb-2">Mudanças Climáticas</Badge>
                <CardTitle className="text-lg">Impactos do Aquecimento Global nos Oceanos Brasileiros</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-sm mb-4">
                  Análise dos dados coletados pela plataforma revela mudanças nos padrões migratórios de espécies
                  marinhas ao longo da costa brasileira.
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">15 Jan 2024</span>
                  <Button size="sm" variant="ghost" className="text-blue-600">
                    Ler mais <ChevronRight className="w-4 h-4 ml-1" />
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="border-green-100 hover:shadow-lg transition-shadow">
              <div className="aspect-video bg-gradient-to-br from-green-100 to-emerald-100 rounded-t-lg overflow-hidden">
                <Image
                  src="/placeholder.svg?height=200&width=300"
                  alt="Espécies Invasoras"
                  width={300}
                  height={200}
                  className="w-full h-full object-cover"
                />
              </div>
              <CardHeader>
                <Badge variant="secondary" className="w-fit mb-2">
                  Espécies Invasoras
                </Badge>
                <CardTitle className="text-lg">Alerta: Nova Espécie Invasora Detectada no Litoral Sul</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-sm mb-4">
                  Cidadãos cientistas identificaram a presença de uma espécie exótica que pode ameaçar o ecossistema
                  marinho local.
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">12 Jan 2024</span>
                  <Button size="sm" variant="ghost" className="text-green-600">
                    Ler mais <ChevronRight className="w-4 h-4 ml-1" />
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="border-purple-100 hover:shadow-lg transition-shadow">
              <div className="aspect-video bg-gradient-to-br from-purple-100 to-violet-100 rounded-t-lg overflow-hidden">
                <Image
                  src="/placeholder.svg?height=200&width=300"
                  alt="Tutorial"
                  width={300}
                  height={200}
                  className="w-full h-full object-cover"
                />
              </div>
              <CardHeader>
                <Badge variant="outline" className="w-fit mb-2">
                  Tutorial
                </Badge>
                <CardTitle className="text-lg">Como Fotografar Fauna Marinha para Identificação</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-sm mb-4">
                  Dicas essenciais para capturar imagens de qualidade que facilitem a identificação automática por nossa
                  IA.
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">10 Jan 2024</span>
                  <Button size="sm" variant="ghost" className="text-purple-600">
                    Ler mais <ChevronRight className="w-4 h-4 ml-1" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Educational Content */}
          <Card className="mt-12 border-cyan-100 bg-gradient-to-r from-cyan-50 to-blue-50">
            <CardHeader>
              <CardTitle className="flex items-center text-cyan-800">
                <BookOpen className="w-6 h-6 mr-2" />
                Conteúdo Educativo
              </CardTitle>
              <CardDescription>Recursos para aprender mais sobre conservação marinha</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <BookOpen className="w-8 h-8 text-white" />
                  </div>
                  <h4 className="font-semibold mb-2">Guias de Identificação</h4>
                  <p className="text-sm text-gray-600">Aprenda a identificar espécies marinhas brasileiras</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Smartphone className="w-8 h-8 text-white" />
                  </div>
                  <h4 className="font-semibold mb-2">Tutoriais em Vídeo</h4>
                  <p className="text-sm text-gray-600">Como usar a plataforma e contribuir efetivamente</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-violet-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="w-8 h-8 text-white" />
                  </div>
                  <h4 className="font-semibold mb-2">Oficinas Online</h4>
                  <p className="text-sm text-gray-600">Participe de workshops sobre conservação marinha</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Award className="w-8 h-8 text-white" />
                  </div>
                  <h4 className="font-semibold mb-2">Gamificação</h4>
                  <p className="text-sm text-gray-600">Conquiste badges e suba no ranking de contribuidores</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Team Section */}
      <section id="equipe" className="py-20 bg-gradient-to-br from-blue-50 to-cyan-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-4xl font-bold mb-6 text-gray-800">Nossa Equipe</h2>
            <p className="text-xl text-gray-600">
              Conheça os profissionais dedicados à conservação marinha e inovação tecnológica
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {teamMembers.map((member, index) => (
              <Card
                key={index}
                className="border-blue-100 bg-white/80 backdrop-blur-sm hover:shadow-lg transition-all duration-300"
              >
                <CardContent className="pt-6 text-center">
                  <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="font-bold text-gray-800 mb-1">{member.name}</h3>
                  <p className="text-sm text-blue-600 font-medium mb-3">{member.role}</p>
                  <p className="text-xs text-gray-600">{member.bio}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Credits */}
          <Card className="border-blue-100 bg-white/90 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-center text-blue-800">Créditos e Apoio</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-gray-600 mb-6">
                Este projeto é resultado da colaboração entre pesquisadores, desenvolvedores e instituições
                comprometidas com a conservação marinha brasileira.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Badge variant="outline" className="text-blue-600 border-blue-300">
                  Guilherme Mateus - Idealizador
                </Badge>
                <Badge variant="outline" className="text-green-600 border-green-300">
                  Édrei Felipe - Desenvolvedor
                </Badge>
                <Badge variant="outline" className="text-purple-600 border-purple-300">
                  Orientadores Científicos
                </Badge>
                <Badge variant="outline" className="text-orange-600 border-orange-300">
                  Apoiadores Institucionais
                </Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contato" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-4xl font-bold mb-6 text-gray-800">Contato e Proposta Acadêmica</h2>
            <p className="text-xl text-gray-600">
              Entre em contato conosco ou acesse nossa proposta acadêmica completa
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <Card className="border-blue-100">
              <CardHeader>
                <CardTitle className="flex items-center text-blue-800">
                  <Mail className="w-6 h-6 mr-2" />
                  Formulário Institucional
                </CardTitle>
                <CardDescription>Para parcerias, colaborações ou dúvidas técnicas</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Nome</label>
                    <Input placeholder="Seu nome" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Instituição</label>
                    <Input placeholder="Sua instituição" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Email</label>
                  <Input type="email" placeholder="seu@email.com" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Assunto</label>
                  <select className="w-full p-2 border border-gray-300 rounded-md">
                    <option>Parceria Institucional</option>
                    <option>Colaboração Científica</option>
                    <option>Suporte Técnico</option>
                    <option>Proposta de Pesquisa</option>
                    <option>Outros</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Mensagem</label>
                  <Textarea placeholder="Descreva sua solicitação ou proposta..." rows={4} />
                </div>
                <Button className="w-full bg-gradient-to-r from-blue-500 to-cyan-500">
                  <Mail className="w-4 h-4 mr-2" />
                  Enviar Mensagem
                </Button>
              </CardContent>
            </Card>

            {/* Academic Proposal */}
            <div className="space-y-6">
              <Card className="border-green-100">
                <CardHeader>
                  <CardTitle className="flex items-center text-green-800">
                    <Download className="w-6 h-6 mr-2" />
                    Proposta Acadêmica
                  </CardTitle>
                  <CardDescription>Acesse o documento completo do projeto</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">
                    Baixe o PDF completo da proposta acadêmica do CostaID, formatado segundo as normas da ABNT,
                    incluindo metodologia, fundamentação teórica e resultados esperados.
                  </p>
                  <Button className="w-full bg-gradient-to-r from-green-500 to-emerald-500">
                    <Download className="w-4 h-4 mr-2" />
                    Download PDF (ABNT)
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-purple-100">
                <CardHeader>
                  <CardTitle className="flex items-center text-purple-800">
                    <BarChart3 className="w-6 h-6 mr-2" />
                    Dados Exportáveis
                  </CardTitle>
                  <CardDescription>Para uso acadêmico e científico</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">
                    Acesse estatísticas públicas e dados exportáveis em formatos CSV e JSON para pesquisas acadêmicas.
                  </p>
                  <div className="space-y-2">
                    <Button variant="outline" className="w-full justify-start bg-transparent">
                      <Download className="w-4 h-4 mr-2" />
                      Exportar dados CSV
                    </Button>
                    <Button variant="outline" className="w-full justify-start bg-transparent">
                      <Download className="w-4 h-4 mr-2" />
                      Exportar dados JSON
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-orange-100">
                <CardHeader>
                  <CardTitle className="flex items-center text-orange-800">
                    <Globe className="w-6 h-6 mr-2" />
                    Suporte Multilíngue
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">
                    Plataforma disponível em português e inglês para alcance internacional.
                  </p>
                  <div className="flex gap-2">
                    <Badge>🇧🇷 Português</Badge>
                    <Badge variant="outline">🇺🇸 English</Badge>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-blue-900 to-cyan-900 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-blue-400 rounded-full flex items-center justify-center">
                  <Waves className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">CostaID</h3>
                  <p className="text-xs text-cyan-200">Ciência Cidadã Marinha</p>
                </div>
              </div>
              <p className="text-cyan-100 text-sm leading-relaxed">
                Conectando tecnologia, ciência cidadã e conservação marinha para proteger a biodiversidade dos oceanos
                brasileiros.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-4 text-cyan-200">Navegação</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="#inicio" className="text-cyan-100 hover:text-white transition-colors">
                    Início
                  </Link>
                </li>
                <li>
                  <Link href="#sobre" className="text-cyan-100 hover:text-white transition-colors">
                    Sobre
                  </Link>
                </li>
                <li>
                  <Link href="#como-funciona" className="text-cyan-100 hover:text-white transition-colors">
                    Como Funciona
                  </Link>
                </li>
                <li>
                  <Link href="#contribua" className="text-cyan-100 hover:text-white transition-colors">
                    Contribua
                  </Link>
                </li>
                <li>
                  <Link href="#mapa" className="text-cyan-100 hover:text-white transition-colors">
                    Mapa
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4 text-cyan-200">Recursos</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="#blog" className="text-cyan-100 hover:text-white transition-colors">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="#equipe" className="text-cyan-100 hover:text-white transition-colors">
                    Equipe
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-cyan-100 hover:text-white transition-colors">
                    API
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-cyan-100 hover:text-white transition-colors">
                    Documentação
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-cyan-100 hover:text-white transition-colors">
                    Suporte
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4 text-cyan-200">Contato</h4>
              <div className="space-y-3 text-sm">
                <div className="flex items-center space-x-2">
                  <Mail className="w-4 h-4 text-cyan-300" />
                  <span className="text-cyan-100">contato@costaid.org.br</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Phone className="w-4 h-4 text-cyan-300" />
                  <span className="text-cyan-100">+55 (11) 9999-9999</span>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin className="w-4 h-4 text-cyan-300" />
                  <span className="text-cyan-100">São Paulo, Brasil</span>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-cyan-700 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-cyan-200 text-sm">© 2024 CostaID. Todos os direitos reservados.</p>
              <div className="flex space-x-6 mt-4 md:mt-0">
                <Link href="#" className="text-cyan-200 hover:text-white text-sm transition-colors">
                  Política de Privacidade
                </Link>
                <Link href="#" className="text-cyan-200 hover:text-white text-sm transition-colors">
                  Termos de Uso
                </Link>
                <Link href="#" className="text-cyan-200 hover:text-white text-sm transition-colors">
                  Licença
                </Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
