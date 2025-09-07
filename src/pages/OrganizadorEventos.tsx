import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import { CalendarIcon, MapPinIcon, UsersIcon, EditIcon, TrashIcon, ArrowLeftIcon } from 'lucide-react';
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

export default function OrganizadorEventos() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const { user, signOut, userProfile } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      fetchEvents();
    }
  }, [user]);

  const fetchEvents = async () => {
    try {
      if (!user) return;

      const { data, error } = await supabase
        .from('events')
        .select('*')
        .eq('organizer_id', user.id)
        .order('event_date', { ascending: true });

      if (error) {
        console.error('Error fetching events:', error);
        toast({
          title: "Error",
          description: "No se pudieron cargar los eventos",
          variant: "destructive",
        });
      } else {
        setEvents(data || []);
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteEvent = async (eventId: string) => {
    if (!confirm('¿Estás seguro de que quieres eliminar este evento?')) {
      return;
    }

    try {
      const { error } = await supabase
        .from('events')
        .delete()
        .eq('id', eventId);

      if (error) {
        toast({
          title: "Error",
          description: "No se pudo eliminar el evento",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Evento eliminado",
          description: "El evento ha sido eliminado exitosamente",
        });
        fetchEvents(); // Refresh list
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
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

  return (
    <div className="min-h-screen bg-surface">
      {/* Header */}
      <header className="bg-surface-darker border-b border-border">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button 
              variant="ghost" 
              onClick={() => navigate('/organizador/dashboard')}
              className="text-muted-foreground hover:text-foreground"
            >
              <ArrowLeftIcon className="w-4 h-4 mr-2" />
              Volver
            </Button>
            <h1 className="text-2xl font-bold text-foreground">Mis Eventos</h1>
          </div>
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
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold text-foreground mb-2">Gestionar Eventos</h2>
            <p className="text-muted-foreground">Administra todos tus eventos</p>
          </div>
          <Button 
            onClick={() => navigate('/organizador/evento/nuevo')}
            className="bg-beige text-surface-darker hover:bg-beige-dark transition-smooth"
          >
            Crear Nuevo Evento
          </Button>
        </div>

        {events.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg mb-4">Aún no has creado ningún evento</p>
            <Button 
              onClick={() => navigate('/organizador/evento/nuevo')}
              className="bg-beige text-surface-darker hover:bg-beige-dark transition-smooth"
            >
              Crear mi primer evento
            </Button>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((event) => (
              <Card key={event.id} className="bg-surface-darker border-border">
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
                      <span className="text-xl font-bold text-beige">
                        ${event.price.toLocaleString()}
                      </span>
                      <div className="flex space-x-2">
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-beige text-beige hover:bg-beige hover:text-surface-darker"
                        >
                          <EditIcon className="w-4 h-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleDeleteEvent(event.id)}
                          className="border-red-400 text-red-400 hover:bg-red-400 hover:text-surface-darker"
                        >
                          <TrashIcon className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                    
                    {/* Status badge */}
                    <div className="pt-2">
                      {new Date(event.event_date) > new Date() ? (
                        <span className="inline-block px-2 py-1 text-xs rounded-full bg-green-400/20 text-green-400">
                          Próximo
                        </span>
                      ) : (
                        <span className="inline-block px-2 py-1 text-xs rounded-full bg-gray-400/20 text-gray-400">
                          Finalizado
                        </span>
                      )}
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