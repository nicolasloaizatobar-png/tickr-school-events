import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Calendar, MapPin, Users, Building } from "lucide-react";
import Header from "@/components/Header";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface Event {
  id: string;
  title: string;
  description: string;
  event_date: string;
  venue: string;
  price: number;
  available_tickets: number;
  max_capacity: number;
  image_url: string;
  organizer_id: string;
}

const VerDetalles = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      fetchEvent(id);
    }
  }, [id]);

  const fetchEvent = async (eventId: string) => {
    try {
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .eq('id', eventId)
        .single();

      if (error) throw error;
      setEvent(data);
    } catch (error) {
      console.error('Error fetching event:', error);
      toast({
        title: "Error",
        description: "No se pudo cargar el evento",
        variant: "destructive",
      });
      navigate('/eventos');
    } finally {
      setLoading(false);
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0
    }).format(price);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handlePurchase = () => {
    navigate(`/evento/${id}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-20 pb-12">
          <div className="container mx-auto px-4">
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
              <p className="text-muted-foreground mt-4">Cargando evento...</p>
            </div>
          </div>
        </main>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-20 pb-12">
          <div className="container mx-auto px-4">
            <div className="text-center py-12">
              <p className="text-xl text-muted-foreground mb-4">Evento no encontrado</p>
              <Button onClick={() => navigate('/eventos')}>Volver a eventos</Button>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-20 pb-12">
        {/* Event Header - Image + Title */}
        <div className="relative h-[60vh] bg-black/50 overflow-hidden">
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url(${event.image_url || "/placeholder.svg"})`,
            }}
          />
          <div className="absolute inset-0 bg-black/60" />
          
          <div className="relative container mx-auto px-4 h-full flex flex-col justify-end pb-12">
            <Button
              variant="outline"
              onClick={() => navigate('/eventos')}
              className="absolute top-8 left-4 border-white/20 text-white hover:bg-white hover:text-black backdrop-blur-sm"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Volver a eventos
            </Button>
            
            <div className="max-w-4xl">
              <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 leading-tight">
                {event.title}
              </h1>
              <div className="flex items-center gap-6 text-white/80 text-xl">
                <div className="flex items-center">
                  <Building className="w-5 h-5 mr-2" />
                  <span>Colegio San Carlos</span>
                </div>
                <div className="flex items-center">
                  <Calendar className="w-5 h-5 mr-2" />
                  <span>{formatDate(event.event_date)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-12">
          {/* Key Information Block */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="bg-surface rounded-xl p-8 text-center border border-border hover:shadow-[var(--shadow-card)] transition-all duration-300">
              <div className="text-3xl font-bold text-primary mb-2">{formatPrice(event.price)}</div>
              <p className="text-muted-foreground">Precio por boleta</p>
            </div>
            <div className="bg-surface rounded-xl p-8 text-center border border-border hover:shadow-[var(--shadow-card)] transition-all duration-300">
              <div className="text-3xl font-bold text-foreground mb-2">{event.max_capacity}</div>
              <p className="text-muted-foreground">Aforo máximo</p>
            </div>
            <div className="bg-surface rounded-xl p-8 text-center border border-border hover:shadow-[var(--shadow-card)] transition-all duration-300">
              <div className="text-3xl font-bold text-foreground mb-2">{event.available_tickets}</div>
              <p className="text-muted-foreground">Boletas disponibles</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Description Block */}
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-6">Descripción del evento</h2>
              <p className="text-muted-foreground text-lg leading-relaxed mb-8">
                {event.description || "Una experiencia única que no te puedes perder. Este evento escolar reúne a toda la comunidad educativa para celebrar los logros y el talento de nuestros estudiantes."}
              </p>

              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <MapPin className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">Ubicación</h3>
                    <p className="text-muted-foreground">{event.venue}</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Users className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">Capacidad</h3>
                    <p className="text-muted-foreground">Hasta {event.max_capacity} asistentes</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Characteristics & Services Block */}
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-6">Características y servicios</h2>
              
              <div className="space-y-4 mb-8">
                <div className="bg-surface rounded-lg p-6 border border-border">
                  <h3 className="font-semibold text-foreground mb-2">Tipo de evento</h3>
                  <p className="text-muted-foreground">Evento escolar oficial</p>
                </div>
                <div className="bg-surface rounded-lg p-6 border border-border">
                  <h3 className="font-semibold text-foreground mb-2">Duración aproximada</h3>
                  <p className="text-muted-foreground">3 horas</p>
                </div>
                <div className="bg-surface rounded-lg p-6 border border-border">
                  <h3 className="font-semibold text-foreground mb-2">Edad permitida</h3>
                  <p className="text-muted-foreground">Todas las edades</p>
                </div>
                <div className="bg-surface rounded-lg p-6 border border-border">
                  <h3 className="font-semibold text-foreground mb-2">Servicios incluidos</h3>
                  <p className="text-muted-foreground">Acceso al evento, programa oficial, refrigerio</p>
                </div>
              </div>
            </div>
          </div>

          {/* Action Block */}
          <div className="mt-16 text-center">
            <div className="bg-surface rounded-2xl p-12 border border-border max-w-2xl mx-auto">
              <h2 className="text-3xl font-bold text-foreground mb-4">¿Listo para asistir?</h2>
              <p className="text-muted-foreground text-lg mb-8">
                Asegura tu lugar en este evento especial. Las boletas se agotan rápido.
              </p>
              <Button 
                onClick={handlePurchase}
                disabled={event.available_tickets <= 0}
                className="bg-primary hover:bg-primary/90 text-primary-foreground px-12 py-6 text-lg font-semibold rounded-lg transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                size="lg"
              >
                {event.available_tickets <= 0 ? "Agotado" : "Comprar boleta"}
              </Button>
              {event.available_tickets <= 5 && event.available_tickets > 0 && (
                <p className="text-amber-400 text-sm mt-4">
                  ¡Solo quedan {event.available_tickets} boletas!
                </p>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default VerDetalles;