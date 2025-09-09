import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Calendar, MapPin, Users, DollarSign, Clock, Image } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const OrganizadorCrearEvento = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    time: "",
    venue: "",
    max_capacity: "",
    price: "",
    image_url: ""
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast({
        title: "Error",
        description: "Debes estar autenticado para crear un evento",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Combine date and time
      const eventDateTime = new Date(`${formData.date}T${formData.time}`);
      
      const { data, error } = await supabase
        .from('events')
        .insert({
          title: formData.title,
          description: formData.description,
          event_date: eventDateTime.toISOString(),
          venue: formData.venue,
          max_capacity: parseInt(formData.max_capacity),
          available_tickets: parseInt(formData.max_capacity),
          price: parseFloat(formData.price),
          image_url: formData.image_url || null,
          organizer_id: user.id
        });

      if (error) throw error;

      toast({
        title: "¡Evento creado exitosamente!",
        description: "Tu evento ha sido publicado y está disponible para la venta de boletas.",
      });

      navigate('/organizador/dashboard');
    } catch (error) {
      console.error('Error creating event:', error);
      toast({
        title: "Error al crear evento",
        description: "Hubo un problema al crear tu evento. Inténtalo de nuevo.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Header */}
          <div className="flex items-center gap-4 mb-8">
            <Button
              variant="outline"
              onClick={() => navigate('/ventajas')}
              className="border-beige text-beige hover:bg-beige hover:text-surface-darker"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Volver a Ventajas
            </Button>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-foreground">
                Crear Nuevo <span className="text-beige">Evento</span>
              </h1>
              <p className="text-muted-foreground mt-2">
                Completa la información de tu evento y publícalo al instante
              </p>
            </div>
          </div>

          {/* Form */}
          <Card className="bg-surface border-border">
            <CardHeader>
              <CardTitle className="text-2xl text-foreground">Información del Evento</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Title */}
                <div className="space-y-2">
                  <Label htmlFor="title" className="text-foreground flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    Título del evento
                  </Label>
                  <Input
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    placeholder="Ej: Grado 11° - Promoción 2024"
                    required
                    className="bg-background border-border text-foreground"
                  />
                </div>

                {/* Description */}
                <div className="space-y-2">
                  <Label htmlFor="description" className="text-foreground">
                    Descripción
                  </Label>
                  <Textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="Describe tu evento, qué incluye, qué pueden esperar los asistentes..."
                    rows={4}
                    className="bg-background border-border text-foreground resize-none"
                  />
                </div>

                {/* Date and Time */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="date" className="text-foreground flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      Fecha del evento
                    </Label>
                    <Input
                      id="date"
                      name="date"
                      type="date"
                      value={formData.date}
                      onChange={handleInputChange}
                      required
                      className="bg-background border-border text-foreground"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="time" className="text-foreground flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      Hora del evento
                    </Label>
                    <Input
                      id="time"
                      name="time"
                      type="time"
                      value={formData.time}
                      onChange={handleInputChange}
                      required
                      className="bg-background border-border text-foreground"
                    />
                  </div>
                </div>

                {/* Venue */}
                <div className="space-y-2">
                  <Label htmlFor="venue" className="text-foreground flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    Lugar del evento
                  </Label>
                  <Input
                    id="venue"
                    name="venue"
                    value={formData.venue}
                    onChange={handleInputChange}
                    placeholder="Ej: Auditorio Principal, Hotel Marriott, etc."
                    required
                    className="bg-background border-border text-foreground"
                  />
                </div>

                {/* Capacity and Price */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="max_capacity" className="text-foreground flex items-center gap-2">
                      <Users className="w-4 h-4" />
                      Aforo máximo
                    </Label>
                    <Input
                      id="max_capacity"
                      name="max_capacity"
                      type="number"
                      value={formData.max_capacity}
                      onChange={handleInputChange}
                      placeholder="300"
                      min="1"
                      required
                      className="bg-background border-border text-foreground"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="price" className="text-foreground flex items-center gap-2">
                      <DollarSign className="w-4 h-4" />
                      Precio por boleta (COP)
                    </Label>
                    <Input
                      id="price"
                      name="price"
                      type="number"
                      value={formData.price}
                      onChange={handleInputChange}
                      placeholder="50000"
                      min="0"
                      step="1000"
                      required
                      className="bg-background border-border text-foreground"
                    />
                  </div>
                </div>

                {/* Image URL */}
                <div className="space-y-2">
                  <Label htmlFor="image_url" className="text-foreground flex items-center gap-2">
                    <Image className="w-4 h-4" />
                    URL de imagen (opcional)
                  </Label>
                  <Input
                    id="image_url"
                    name="image_url"
                    type="url"
                    value={formData.image_url}
                    onChange={handleInputChange}
                    placeholder="https://ejemplo.com/imagen-evento.jpg"
                    className="bg-background border-border text-foreground"
                  />
                </div>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row gap-4 pt-6">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => navigate('/ventajas')}
                    className="border-border text-muted-foreground hover:bg-surface-darker"
                  >
                    Cancelar
                  </Button>
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-beige text-surface-darker hover:bg-beige-dark flex-1 sm:flex-none"
                  >
                    {isSubmitting ? "Creando evento..." : "Crear Evento"}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default OrganizadorCrearEvento;