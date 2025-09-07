import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { PlusIcon, CalendarIcon, TicketIcon, TrendingUpIcon } from 'lucide-react';

interface DashboardStats {
  totalEvents: number;
  totalTicketsSold: number;
  totalRevenue: number;
  upcomingEvents: number;
}

export default function OrganizadorDashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    totalEvents: 0,
    totalTicketsSold: 0,
    totalRevenue: 0,
    upcomingEvents: 0,
  });
  const [loading, setLoading] = useState(true);
  const { signOut, userProfile, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      fetchDashboardStats();
    }
  }, [user]);

  const fetchDashboardStats = async () => {
    try {
      if (!user) return;

      // Fetch events created by this organizer
      const { data: events, error: eventsError } = await supabase
        .from('events')
        .select('*, tickets(*)')
        .eq('organizer_id', user.id);

      if (eventsError) {
        console.error('Error fetching events:', eventsError);
        return;
      }

      if (events) {
        const totalEvents = events.length;
        const upcomingEvents = events.filter(
          event => new Date(event.event_date) > new Date()
        ).length;

        let totalTicketsSold = 0;
        let totalRevenue = 0;

        events.forEach(event => {
          const ticketCount = event.tickets?.length || 0;
          totalTicketsSold += ticketCount;
          totalRevenue += ticketCount * event.price;
        });

        setStats({
          totalEvents,
          totalTicketsSold,
          totalRevenue,
          upcomingEvents,
        });
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
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
          <h1 className="text-2xl font-bold text-foreground">Tickr - Dashboard</h1>
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
          <h2 className="text-3xl font-bold text-foreground mb-2">Panel de Control</h2>
          <p className="text-muted-foreground">Gestiona tus eventos y supervisa las ventas</p>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-surface-darker border-border">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Eventos
              </CardTitle>
              <CalendarIcon className="h-4 w-4 text-beige" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{stats.totalEvents}</div>
            </CardContent>
          </Card>

          <Card className="bg-surface-darker border-border">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Boletas Vendidas
              </CardTitle>
              <TicketIcon className="h-4 w-4 text-beige" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{stats.totalTicketsSold}</div>
            </CardContent>
          </Card>

          <Card className="bg-surface-darker border-border">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Ingresos Totales
              </CardTitle>
              <TrendingUpIcon className="h-4 w-4 text-beige" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">
                ${stats.totalRevenue.toLocaleString()}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-surface-darker border-border">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Próximos Eventos
              </CardTitle>
              <CalendarIcon className="h-4 w-4 text-beige" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{stats.upcomingEvents}</div>
            </CardContent>
          </Card>
        </div>

        {/* Action Buttons */}
        <div className="grid md:grid-cols-2 gap-6">
          <Card className="bg-surface-darker border-border hover-scale cursor-pointer"
                onClick={() => navigate('/organizador/evento/nuevo')}>
            <CardHeader>
              <CardTitle className="text-foreground flex items-center">
                <PlusIcon className="w-5 h-5 mr-2 text-beige" />
                Crear Nuevo Evento
              </CardTitle>
              <CardDescription className="text-muted-foreground">
                Configura un nuevo evento y comienza a vender boletas
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full bg-beige text-surface-darker hover:bg-beige-dark transition-smooth">
                Crear Evento
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-surface-darker border-border hover-scale cursor-pointer"
                onClick={() => navigate('/organizador/eventos')}>
            <CardHeader>
              <CardTitle className="text-foreground flex items-center">
                <CalendarIcon className="w-5 h-5 mr-2 text-beige" />
                Gestionar Eventos
              </CardTitle>
              <CardDescription className="text-muted-foreground">
                Ve y edita todos tus eventos existentes
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button 
                variant="outline" 
                className="w-full border-beige text-beige hover:bg-beige hover:text-surface-darker transition-smooth"
              >
                Ver Mis Eventos
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}