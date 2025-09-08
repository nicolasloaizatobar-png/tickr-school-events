import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Phone, Mail, MessageCircle, MapPin, Clock, Send, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Contacto = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    school: "",
    subject: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSelectChange = (value: string) => {
    setFormData(prev => ({
      ...prev,
      subject: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: "Mensaje enviado",
        description: "Nos pondremos en contacto contigo pronto.",
      });
      setFormData({
        name: "",
        email: "",
        phone: "",
        school: "",
        subject: "",
        message: ""
      });
    }, 2000);
  };

  const contactMethods = [
    {
      icon: Phone,
      title: "Teléfono",
      description: "Llámanos directamente",
      contact: "+57 (1) 234-5678",
      action: "tel:+5712345678"
    },
    {
      icon: MessageCircle,
      title: "WhatsApp",
      description: "Chatea con nosotros",
      contact: "+57 300 123 4567",
      action: "https://wa.me/573001234567"
    },
    {
      icon: Mail,
      title: "Email",
      description: "Escríbenos un correo",
      contact: "hola@tickr.co",
      action: "mailto:hola@tickr.co"
    }
  ];

  const officeInfo = [
    {
      icon: MapPin,
      title: "Dirección",
      details: ["Carrera 11 #93-07", "Oficina 302", "Bogotá, Colombia"]
    },
    {
      icon: Clock,
      title: "Horarios",
      details: ["Lunes - Viernes: 8:00 AM - 6:00 PM", "Sábados: 9:00 AM - 2:00 PM", "Domingos: Cerrado"]
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-surface">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
              ¿Necesitas <span className="text-beige">ayuda</span>?
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Estamos aquí para resolver todas tus dudas sobre Tickr
            </p>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact Form */}
          <div>
            <Card className="bg-surface border-border">
              <CardHeader>
                <CardTitle className="text-2xl text-foreground">Envíanos un mensaje</CardTitle>
                <p className="text-muted-foreground">
                  Completa el formulario y te responderemos lo antes posible
                </p>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                        Nombre completo *
                      </label>
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Tu nombre"
                        className="bg-background"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                        Correo electrónico *
                      </label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="tu@correo.com"
                        className="bg-background"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-2">
                        Teléfono
                      </label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="+57 300 123 4567"
                        className="bg-background"
                      />
                    </div>
                    <div>
                      <label htmlFor="school" className="block text-sm font-medium text-foreground mb-2">
                        Institución
                      </label>
                      <Input
                        id="school"
                        name="school"
                        type="text"
                        value={formData.school}
                        onChange={handleInputChange}
                        placeholder="Nombre del colegio"
                        className="bg-background"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-foreground mb-2">
                      Asunto *
                    </label>
                    <Select value={formData.subject} onValueChange={handleSelectChange} required>
                      <SelectTrigger className="bg-background">
                        <SelectValue placeholder="Selecciona un tema" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="info">Información general</SelectItem>
                        <SelectItem value="demo">Solicitar demo</SelectItem>
                        <SelectItem value="pricing">Precios y planes</SelectItem>
                        <SelectItem value="support">Soporte técnico</SelectItem>
                        <SelectItem value="partnership">Alianzas comerciales</SelectItem>
                        <SelectItem value="other">Otro</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                      Mensaje *
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      required
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Cuéntanos cómo podemos ayudarte..."
                      rows={6}
                      className="bg-background"
                    />
                  </div>

                  <Button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="w-full bg-beige text-surface-darker hover:bg-beige-dark text-lg py-6 h-auto"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-surface-darker mr-2"></div>
                        Enviando...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4 mr-2" />
                        Enviar mensaje
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            {/* Contact Methods */}
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-6">Otras formas de contacto</h2>
              <div className="space-y-4">
                {contactMethods.map((method, index) => (
                  <Card key={index} className="bg-surface border-border hover:border-beige transition-colors">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-beige/10 rounded-lg flex items-center justify-center">
                          <method.icon className="w-6 h-6 text-beige" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-foreground">{method.title}</h3>
                          <p className="text-sm text-muted-foreground">{method.description}</p>
                          <a 
                            href={method.action}
                            className="text-beige hover:text-beige-dark transition-colors font-medium"
                          >
                            {method.contact}
                          </a>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Office Information */}
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-6">Información de oficina</h2>
              <div className="space-y-4">
                {officeInfo.map((info, index) => (
                  <Card key={index} className="bg-surface border-border">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-beige/10 rounded-lg flex items-center justify-center mt-1">
                          <info.icon className="w-6 h-6 text-beige" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-foreground mb-2">{info.title}</h3>
                          {info.details.map((detail, detailIndex) => (
                            <p key={detailIndex} className="text-muted-foreground text-sm">
                              {detail}
                            </p>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Quick Response Info */}
            <Card className="bg-beige/5 border-beige/20">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <CheckCircle className="w-6 h-6 text-beige" />
                  <h3 className="font-semibold text-foreground">Respuesta rápida garantizada</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  Nos comprometemos a responder todas las consultas en un máximo de 24 horas. 
                  Para consultas urgentes, no dudes en llamarnos directamente.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Contacto;