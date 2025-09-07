import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import { ArrowLeftIcon } from 'lucide-react';

export default function CrearEvento() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    event_date: '',
    event_time: '',
    price: '',
    max_capacity: '',
    venue: '',
    image_url: '',
  });
  const [loading, setLoading] = useState(false);
  const { user, signOut, userProfile } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (!user) {
        toast({
          title: "Error",
          description: "No estás autenticado",
          variant: "destructive",
        });
        return;
      }

      // Combine date and time
      const eventDateTime = new Date(`${formData.event_date}T${formData.event_time}`).toISOString();

      const { error } = await supabase
        .from('events')
        .insert({
          organizer_id: user.id,
          title: formData.title,
          description: formData.description,
          event_date: eventDateTime,
          price: parseFloat(formData.price),
          max_capacity: parseInt(formData.max_capacity),
          available_tickets: parseInt(formData.max_capacity),
          venue: formData.venue,
          image_url: formData.image_url || null,
        });

      if (error) {
        toast({
          title: "Error al crear evento",
          description: error.message,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Evento creado",
          description: "Tu evento ha sido creado exitosamente",
        });
        navigate('/organizador/eventos');
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

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
            <h1 className="text-2xl font-bold text-foreground">Crear Evento</h1>
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
        <div className="max-w-2xl mx-auto">
          <Card className="bg-surface-darker border-border">
            <CardHeader>
              <CardTitle className="text-foreground">Nuevo Evento</CardTitle>
              <CardDescription className="text-muted-foreground">
                Completa la información para crear tu evento
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="title" className="text-foreground">Título del evento</Label>
                  <Input
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    required
                    className="bg-background border-border text-foreground"
                    placeholder="Ej: Graduación 2024"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description" className="text-foreground">Descripción</Label>
                  <Textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    className="bg-background border-border text-foreground"
                    placeholder="Describe tu evento..."
                    rows={3}
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="event_date" className="text-foreground">Fecha</Label>
                    <Input
                      id="event_date"
                      name="event_date"
                      type="date"
                      value={formData.event_date}
                      onChange={handleInputChange}
                      required
                      className="bg-background border-border text-foreground"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="event_time" className="text-foreground">Hora</Label>
                    <Input
                      id="event_time"
                      name="event_time"
                      type="time"
                      value={formData.event_time}
                      onChange={handleInputChange}
                      required
                      className="bg-background border-border text-foreground"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="venue" className="text-foreground">Lugar</Label>
                  <Input
                    id="venue"
                    name="venue"
                    value={formData.venue}
                    onChange={handleInputChange}
                    required
                    className="bg-background border-border text-foreground"
                    placeholder="Ej: Auditorio Principal"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="price" className="text-foreground">Precio por boleta</Label>
                    <Input
                      id="price"
                      name="price"
                      type="number"
                      min="0"
                      step="0.01"
                      value={formData.price}
                      onChange={handleInputChange}
                      required
                      className="bg-background border-border text-foreground"
                      placeholder="0.00"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="max_capacity" className="text-foreground">Capacidad máxima</Label>
                    <Input
                      id="max_capacity"
                      name="max_capacity"
                      type="number"
                      min="1"
                      value={formData.max_capacity}
                      onChange={handleInputChange}
                      required
                      className="bg-background border-border text-foreground"
                      placeholder="100"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="image_url" className="text-foreground">URL de imagen (opcional)</Label>
                  <Input
                    id="image_url"
                    name="image_url"
                    type="url"
                    value={formData.image_url}
                    onChange={handleInputChange}
                    className="bg-background border-border text-foreground"
                    placeholder="https://ejemplo.com/imagen.jpg"
                  />
                </div>

                <div className="flex gap-4 pt-6">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => navigate('/organizador/dashboard')}
                    className="flex-1"
                  >
                    Cancelar
                  </Button>
                  <Button 
                    type="submit" 
                    className="flex-1 bg-beige text-surface-darker hover:bg-beige-dark transition-smooth"
                    disabled={loading}
                  >
                    {loading ? 'Creando...' : 'Crear Evento'}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}