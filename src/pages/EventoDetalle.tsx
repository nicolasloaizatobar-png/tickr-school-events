import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, MapPin, Users, ArrowLeft } from "lucide-react";
import Header from "@/components/Header";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
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
}

const EventoDetalle = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);
  const [purchasing, setPurchasing] = useState(false);

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
      navigate('/comprar');
    } finally {
      setLoading(false);
    }
  };

  const handlePurchase = async () => {
    if (!user) {
      toast({
        title: "Inicia sesión",
        description: "Debes iniciar sesión para comprar boletas",
        variant: "destructive",
      });
      navigate('/login');
      return;
    }

    if (!event || event.available_tickets <= 0) {
      toast({
        title: "Sin boletas",
        description: "No hay boletas disponibles para este evento",
        variant: "destructive",
      });
      return;
    }

    setPurchasing(true);

    try {
      // Generate a simple QR code (in a real app, this would be more sophisticated)
      const qrCode = `TICKR-${event.id}-${user.id}-${Date.now()}`;

      // Insert ticket record
      const { error } = await supabase
        .from('tickets')
        .insert({
          event_id: event.id,
          buyer_id: user.id,
          qr_code: qrCode,
          status: 'active'
        });

      if (error) throw error;

      toast({
        title: "¡Compra exitosa!",
        description: "Tu boleta ha sido comprada exitosamente",
      });

      // In a real app, you would redirect to a payment processor here
      // For now, we'll simulate success and redirect to a confirmation page
      setTimeout(() => {
        navigate('/comprador/eventos');
      }, 2000);

    } catch (error) {
      console.error('Error purchasing ticket:', error);
      toast({
        title: "Error",
        description: "No se pudo completar la compra. Intenta de nuevo.",
        variant: "destructive",
      });
    } finally {
      setPurchasing(false);
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
              <Button onClick={() => navigate('/comprar')}>Volver a eventos</Button>
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
        <div className="container mx-auto px-4">
          {/* Back Button */}
          <Button
            variant="outline"
            onClick={() => navigate('/comprar')}
            className="mb-8 border-primary/20 text-primary hover:bg-primary hover:text-primary-foreground button-premium"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Volver a eventos
          </Button>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Event Image */}
            <div className="aspect-video overflow-hidden rounded-lg">
              <img 
                src={event.image_url || "/placeholder.svg"} 
                alt={event.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Event Details */}
            <div>
              <h1 className="text-4xl font-bold text-foreground mb-4">{event.title}</h1>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-center text-muted-foreground">
                  <Calendar className="w-5 h-5 mr-3" />
                  <span className="text-lg">{formatDate(event.event_date)}</span>
                </div>
                <div className="flex items-center text-muted-foreground">
                  <MapPin className="w-5 h-5 mr-3" />
                  <span className="text-lg">{event.venue}</span>
                </div>
                <div className="flex items-center text-muted-foreground">
                  <Users className="w-5 h-5 mr-3" />
                  <span className="text-lg">{event.available_tickets} de {event.max_capacity} boletas disponibles</span>
                </div>
              </div>

              <div className="mb-8">
                <h2 className="text-2xl font-bold text-foreground mb-4">Descripción</h2>
                <p className="text-muted-foreground text-lg leading-relaxed">{event.description}</p>
              </div>

              {/* Event Characteristics */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-foreground mb-4">Características del evento</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-surface rounded-lg p-4">
                    <p className="text-muted-foreground">Tipo de evento</p>
                    <p className="text-foreground font-semibold">Evento escolar</p>
                  </div>
                  <div className="bg-surface rounded-lg p-4">
                    <p className="text-muted-foreground">Aforo máximo</p>
                    <p className="text-foreground font-semibold">{event.max_capacity} personas</p>
                  </div>
                  <div className="bg-surface rounded-lg p-4">
                    <p className="text-muted-foreground">Lugar</p>
                    <p className="text-foreground font-semibold">{event.venue}</p>
                  </div>
                  <div className="bg-surface rounded-lg p-4">
                    <p className="text-muted-foreground">Edad permitida</p>
                    <p className="text-foreground font-semibold">Todas las edades</p>
                  </div>
                </div>
              </div>

              {/* Price and Purchase */}
              <Card className="bg-card border-border">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <p className="text-muted-foreground">Precio por boleta</p>
                      <p className="text-3xl font-bold text-primary">{formatPrice(event.price)}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-muted-foreground">Disponibles</p>
                      <p className="text-2xl font-bold text-foreground">{event.available_tickets}</p>
                    </div>
                  </div>

                  <Button 
                    onClick={handlePurchase}
                    disabled={purchasing || event.available_tickets <= 0}
                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground button-premium"
                    size="lg"
                  >
                    {purchasing 
                      ? "Procesando compra..." 
                      : event.available_tickets <= 0 
                        ? "Agotado" 
                        : "Comprar boleta"
                    }
                  </Button>

                  {!user && (
                    <p className="text-sm text-muted-foreground text-center mt-4">
                      <Button variant="link" onClick={() => navigate('/login')} className="text-primary p-0">
                        Inicia sesión
                      </Button>
                      {" "}para comprar boletas
                    </p>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default EventoDetalle;