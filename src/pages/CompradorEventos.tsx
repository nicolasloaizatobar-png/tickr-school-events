import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { CalendarIcon, MapPinIcon, UsersIcon } from 'lucide-react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

interface Event {
  id: string;
  title: string;
  description: string;
  event_date: string;
  price: number;
  available_tickets: number;
  max_capacity: number;
  venue: string;
  image_url: string;
}

export default function CompradorEventos() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const { signOut, userProfile } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .gte('event_date', new Date().toISOString())
        .order('event_date', { ascending: true });

      if (error) {
        console.error('Error fetching events:', error);
      } else {
        setEvents(data || []);
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleBuyTicket = (eventId: string) => {
    navigate(`/checkout/${eventId}`);
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

  return (
    <div className="min-h-screen bg-surface">
      {/* Header */}
      <header className="bg-surface-darker border-b border-border">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-foreground">Tickr</h1>
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
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-foreground mb-2">Eventos Disponibles</h2>
          <p className="text-muted-foreground">Encuentra y compra boletas para eventos escolares</p>
        </div>

        {events.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">No hay eventos disponibles en este momento</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((event) => (
              <Card key={event.id} className="bg-surface-darker border-border hover-scale">
                {event.image_url && (
                  <div className="aspect-video bg-background rounded-t-lg overflow-hidden">
                    <img 
                      src={event.image_url} 
                      alt={event.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <CardHeader>
                  <CardTitle className="text-foreground">{event.title}</CardTitle>
                  <CardDescription className="text-muted-foreground">
                    {event.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center text-muted-foreground">
                      <CalendarIcon className="w-4 h-4 mr-2 text-beige" />
                      <span className="text-sm">
                        {format(new Date(event.event_date), "PPP 'a las' HH:mm", { locale: es })}
                      </span>
                    </div>
                    <div className="flex items-center text-muted-foreground">
                      <MapPinIcon className="w-4 h-4 mr-2 text-beige" />
                      <span className="text-sm">{event.venue}</span>
                    </div>
                    <div className="flex items-center text-muted-foreground">
                      <UsersIcon className="w-4 h-4 mr-2 text-beige" />
                      <span className="text-sm">
                        {event.available_tickets} / {event.max_capacity} disponibles
                      </span>
                    </div>
                    <div className="flex items-center justify-between pt-4">
                      <span className="text-2xl font-bold text-beige">
                        ${event.price.toLocaleString()}
                      </span>
                      <Button
                        onClick={() => handleBuyTicket(event.id)}
                        disabled={event.available_tickets === 0}
                        className="bg-beige text-surface-darker hover:bg-beige-dark transition-smooth"
                      >
                        {event.available_tickets === 0 ? 'Agotado' : 'Comprar'}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}