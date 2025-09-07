import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import { CalendarIcon, MapPinIcon, CreditCardIcon } from 'lucide-react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

interface Event {
  id: string;
  title: string;
  description: string;
  event_date: string;
  price: number;
  available_tickets: number;
  venue: string;
  image_url: string;
}

export default function Checkout() {
  const { eventId } = useParams<{ eventId: string }>();
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);
  const [purchasing, setPurchasing] = useState(false);
  const { user, signOut, userProfile } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    if (eventId) {
      fetchEvent();
    }
  }, [eventId]);

  const fetchEvent = async () => {
    try {
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .eq('id', eventId)
        .single();

      if (error) {
        console.error('Error fetching event:', error);
        toast({
          title: "Error",
          description: "No se pudo cargar el evento",
          variant: "destructive",
        });
        navigate('/comprador/eventos');
      } else {
        setEvent(data);
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const generateQRCode = () => {
    // Simple QR code generation (in production, use a proper QR library)
    return `TICKET-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  };

  const handlePurchase = async () => {
    if (!event || !user) return;

    setPurchasing(true);
    try {
      const qrCode = generateQRCode();

      const { error } = await supabase
        .from('tickets')
        .insert({
          event_id: event.id,
          buyer_id: user.id,
          qr_code: qrCode,
        });

      if (error) {
        toast({
          title: "Error en la compra",
          description: error.message,
          variant: "destructive",
        });
      } else {
        toast({
          title: "¡Compra exitosa!",
          description: "Tu boleta ha sido generada",
        });
        
        // Simulate redirect to ticket view
        setTimeout(() => {
          navigate('/comprador/eventos');
        }, 2000);
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setPurchasing(false);
    }
  };

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-surface flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="min-h-screen bg-surface flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-foreground mb-4">Evento no encontrado</h2>
          <Button onClick={() => navigate('/comprador/eventos')}>
            Volver a eventos
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-surface">
      {/* Header */}
      <header className="bg-surface-darker border-b border-border">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-foreground">Tickr - Checkout</h1>
          <div className="flex items-center space-x-4">
            <span className="text-muted-foreground">Hola, {userProfile?.full_name}</span>
            <Button variant="outline" onClick={handleSignOut}>
              Cerrar sesión
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold text-foreground mb-8 text-center">Finalizar Compra</h2>
          
          <div className="grid gap-6">
            {/* Event Details */}
            <Card className="bg-surface-darker border-border">
              <CardHeader>
                <CardTitle className="text-foreground">Resumen del Evento</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {event.image_url && (
                    <div className="aspect-video bg-background rounded-lg overflow-hidden">
                      <img 
                        src={event.image_url} 
                        alt={event.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  
                  <div>
                    <h3 className="text-xl font-bold text-foreground">{event.title}</h3>
                    <p className="text-muted-foreground mt-2">{event.description}</p>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center text-muted-foreground">
                      <CalendarIcon className="w-4 h-4 mr-2 text-beige" />
                      <span>
                        {format(new Date(event.event_date), "PPP 'a las' HH:mm", { locale: es })}
                      </span>
                    </div>
                    <div className="flex items-center text-muted-foreground">
                      <MapPinIcon className="w-4 h-4 mr-2 text-beige" />
                      <span>{event.venue}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Payment Summary */}
            <Card className="bg-surface-darker border-border">
              <CardHeader>
                <CardTitle className="text-foreground flex items-center">
                  <CreditCardIcon className="w-5 h-5 mr-2 text-beige" />
                  Resumen de Pago
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Boleta x1</span>
                    <span className="text-foreground">${event.price.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Comisión de servicio</span>
                    <span className="text-foreground">$0</span>
                  </div>
                  <hr className="border-border" />
                  <div className="flex justify-between text-lg font-bold">
                    <span className="text-foreground">Total</span>
                    <span className="text-beige">${event.price.toLocaleString()}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Payment Actions */}
            <Card className="bg-surface-darker border-border">
              <CardHeader>
                <CardTitle className="text-foreground">Método de Pago</CardTitle>
                <CardDescription className="text-muted-foreground">
                  Simulación de checkout - En producción se integraría con Stripe/Wompi
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 bg-background rounded-lg border border-border">
                    <p className="text-muted-foreground text-sm">
                      💳 Tarjeta de crédito/débito (Simulado)
                    </p>
                  </div>
                  
                  <div className="flex gap-4">
                    <Button
                      variant="outline"
                      onClick={() => navigate('/comprador/eventos')}
                      className="flex-1"
                    >
                      Cancelar
                    </Button>
                    <Button
                      onClick={handlePurchase}
                      disabled={purchasing || event.available_tickets === 0}
                      className="flex-1 bg-beige text-surface-darker hover:bg-beige-dark transition-smooth"
                    >
                      {purchasing ? 'Procesando...' : 'Confirmar Compra'}
                    </Button>
                  </div>

                  {event.available_tickets === 0 && (
                    <p className="text-center text-red-400 text-sm">
                      Lo sentimos, este evento está agotado
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}