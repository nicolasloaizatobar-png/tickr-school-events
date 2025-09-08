import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Filter, Calendar, MapPin, DollarSign } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import EventCard from "@/components/EventCard";
import graduationImage from "@/assets/event-graduation.jpg";
import culturalImage from "@/assets/event-cultural.jpg";
import sportsImage from "@/assets/event-sports.jpg";

const Eventos = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [priceFilter, setPriceFilter] = useState("all");

  const events = [
    {
      image: graduationImage,
      school: "Colegio San Carlos",
      eventName: "Ceremonia de Graduación 2024",
      date: "15 Diciembre",
      time: "10:00 AM",
      location: "Auditorio Principal",
      price: "$25.000",
      availableTickets: 150,
      category: "graduation"
    },
    {
      image: culturalImage,
      school: "Instituto María Auxiliadora",
      eventName: "Festival Cultural Internacional",
      date: "22 Diciembre",
      time: "7:00 PM",
      location: "Teatro del colegio",
      price: "$15.000",
      availableTickets: 200,
      category: "cultural"
    },
    {
      image: sportsImage,
      school: "Liceo Moderno",
      eventName: "Juegos Intercolegiados",
      date: "18 Diciembre",
      time: "2:00 PM",
      location: "Coliseo deportivo",
      price: "$10.000",
      availableTickets: 300,
      category: "sports"
    },
    {
      image: graduationImage,
      school: "Colegio La Presentación",
      eventName: "Grados Bachilleres 2024",
      date: "20 Diciembre",
      time: "3:00 PM",
      location: "Auditorio Central",
      price: "$30.000",
      availableTickets: 100,
      category: "graduation"
    },
    {
      image: culturalImage,
      school: "Instituto Técnico Industrial",
      eventName: "Muestra Artística Anual",
      date: "28 Diciembre",
      time: "6:00 PM",
      location: "Centro Cultural",
      price: "$12.000",
      availableTickets: 250,
      category: "cultural"
    },
    {
      image: sportsImage,
      school: "Colegio Salesiano",
      eventName: "Campeonato de Fútbol",
      date: "30 Diciembre",
      time: "4:00 PM",
      location: "Estadio Municipal",
      price: "$8.000",
      availableTickets: 500,
      category: "sports"
    }
  ];

  const filteredEvents = events.filter(event => {
    const matchesSearch = event.eventName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.school.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === "all" || event.category === categoryFilter;
    const matchesPrice = priceFilter === "all" || 
                        (priceFilter === "low" && parseInt(event.price.replace(/[^0-9]/g, '')) < 15000) ||
                        (priceFilter === "medium" && parseInt(event.price.replace(/[^0-9]/g, '')) >= 15000 && parseInt(event.price.replace(/[^0-9]/g, '')) <= 25000) ||
                        (priceFilter === "high" && parseInt(event.price.replace(/[^0-9]/g, '')) > 25000);
    
    return matchesSearch && matchesCategory && matchesPrice;
  });

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-24 pb-12 bg-surface">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
              Eventos <span className="text-beige">Escolares</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Encuentra y compra boletas para los mejores eventos escolares en Bogotá
            </p>
          </div>
        </div>
      </section>

      {/* Filters Section */}
      <section className="py-8 bg-background border-b border-border">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                type="text"
                placeholder="Buscar eventos o colegios..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-surface"
              />
            </div>
            
            <div className="flex gap-4">
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-[180px] bg-surface">
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="Categoría" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas las categorías</SelectItem>
                  <SelectItem value="graduation">Graduaciones</SelectItem>
                  <SelectItem value="cultural">Eventos Culturales</SelectItem>
                  <SelectItem value="sports">Deportivos</SelectItem>
                </SelectContent>
              </Select>

              <Select value={priceFilter} onValueChange={setPriceFilter}>
                <SelectTrigger className="w-[180px] bg-surface">
                  <DollarSign className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="Precio" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos los precios</SelectItem>
                  <SelectItem value="low">Menos de $15.000</SelectItem>
                  <SelectItem value="medium">$15.000 - $25.000</SelectItem>
                  <SelectItem value="high">Más de $25.000</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </section>

      {/* Events Grid */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          {filteredEvents.length === 0 ? (
            <div className="text-center py-16">
              <Calendar className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-2xl font-semibold text-foreground mb-2">No se encontraron eventos</h3>
              <p className="text-muted-foreground">Intenta ajustar los filtros de búsqueda</p>
            </div>
          ) : (
            <>
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold text-foreground">
                  {filteredEvents.length} evento{filteredEvents.length !== 1 ? 's' : ''} encontrado{filteredEvents.length !== 1 ? 's' : ''}
                </h2>
                <Button variant="outline" className="border-beige text-beige hover:bg-beige hover:text-surface-darker">
                  <MapPin className="w-4 h-4 mr-2" />
                  Ver en mapa
                </Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredEvents.map((event, index) => (
                  <EventCard key={index} {...event} />
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Eventos;