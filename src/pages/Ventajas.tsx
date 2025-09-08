import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, X, Star, Shield, Zap, Clock, Users, CreditCard, Phone } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Ventajas = () => {
  const comparison = [
    {
      feature: "Venta de boletas",
      traditional: "Manualmente en el colegio",
      tickr: "100% digital y automatizado",
      traditionalIcon: X,
      tickrIcon: Check
    },
    {
      feature: "Seguridad del dinero",
      traditional: "Riesgo de pérdida o robo",
      tickr: "Pagos seguros y garantizados",
      traditionalIcon: X,
      tickrIcon: Check
    },
    {
      feature: "Control de aforo",
      traditional: "Conteo manual propenso a errores",
      tickr: "Control automático en tiempo real",
      traditionalIcon: X,
      tickrIcon: Check
    },
    {
      feature: "Tiempo de venta",
      traditional: "Semanas de venta presencial",
      tickr: "Disponible 24/7 online",
      traditionalIcon: X,
      tickrIcon: Check
    },
    {
      feature: "Validación de entrada",
      traditional: "Boletas físicas falsificables",
      tickr: "QR único e infalsificable",
      traditionalIcon: X,
      tickrIcon: Check
    },
    {
      feature: "Reportes y estadísticas",
      traditional: "Información limitada y manual",
      tickr: "Dashboard completo en tiempo real",
      traditionalIcon: X,
      tickrIcon: Check
    }
  ];

  const testimonials = [
    {
      name: "María González",
      role: "Rectora",
      school: "Colegio San José",
      quote: "Tickr revolucionó nuestra forma de vender boletas. Ya no tenemos que preocuparnos por el manejo de dinero físico.",
      rating: 5
    },
    {
      name: "Carlos Ramírez",
      role: "Coordinador de Eventos",
      school: "Instituto La Salle",
      quote: "El sistema de QR ha eliminado completamente las boletas falsas. Ahora tenemos control total del evento.",
      rating: 5
    },
    {
      name: "Ana Patricia López",
      role: "Tesorera",
      school: "Colegio Marista",
      quote: "Los reportes en tiempo real nos permiten tomar decisiones inmediatas. Es increíblemente útil.",
      rating: 5
    },
    {
      name: "Luis Fernando Torres",
      role: "Director Administrativo",
      school: "Gimnasio Moderno",
      quote: "Nuestros padres de familia están encantados con la facilidad de compra. Todo desde su celular.",
      rating: 5
    }
  ];

  const benefits = [
    {
      icon: Shield,
      title: "Seguridad Garantizada",
      description: "Pagos procesados con la más alta seguridad bancaria. Tu dinero está protegido."
    },
    {
      icon: Zap,
      title: "Rapidez Incomparable",
      description: "Compra tu boleta en menos de 2 minutos. Sin filas, sin esperas."
    },
    {
      icon: Clock,
      title: "Disponible 24/7",
      description: "Compra cuando quieras, donde quieras. Siempre disponible para ti."
    },
    {
      icon: Users,
      title: "Aforo Controlado",
      description: "Sistema automático que previene sobreventa. Garantizamos tu lugar."
    },
    {
      icon: CreditCard,
      title: "Múltiples Métodos de Pago",
      description: "Tarjetas de crédito, débito, PSE y más. Elige como prefieras pagar."
    },
    {
      icon: Phone,
      title: "Soporte Especializado",
      description: "Equipo de atención al cliente listo para ayudarte cuando lo necesites."
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
              ¿Por qué elegir <span className="text-beige">Tickr</span>?
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Compara el método tradicional con nuestra plataforma moderna y descubre las ventajas
            </p>
          </div>
        </div>
      </section>

      {/* Comparison Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Método tradicional vs <span className="text-beige">Tickr</span>
            </h2>
            <p className="text-lg text-muted-foreground">
              Ve la diferencia por ti mismo
            </p>
          </div>

          <div className="max-w-6xl mx-auto">
            <Card className="bg-surface border-border">
              <CardContent className="p-0">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
                  {/* Header */}
                  <div className="p-6 border-b border-border md:border-b-0 md:border-r">
                    <h3 className="text-lg font-semibold text-center text-foreground">Característica</h3>
                  </div>
                  <div className="p-6 border-b border-border md:border-b-0 md:border-r bg-red-950/20">
                    <h3 className="text-lg font-semibold text-center text-red-400">Método Tradicional</h3>
                  </div>
                  <div className="p-6 border-b border-border md:border-b-0 bg-green-950/20">
                    <h3 className="text-lg font-semibold text-center text-green-400">Con Tickr</h3>
                  </div>

                  {/* Comparison Items */}
                  {comparison.map((item, index) => (
                    <div key={index} className="contents">
                      <div className="p-6 border-b border-border md:border-r">
                        <p className="font-medium text-foreground">{item.feature}</p>
                      </div>
                      <div className="p-6 border-b border-border md:border-r bg-red-950/10">
                        <div className="flex items-center gap-3">
                          <item.traditionalIcon className="w-5 h-5 text-red-400" />
                          <p className="text-red-300">{item.traditional}</p>
                        </div>
                      </div>
                      <div className="p-6 border-b border-border bg-green-950/10">
                        <div className="flex items-center gap-3">
                          <item.tickrIcon className="w-5 h-5 text-green-400" />
                          <p className="text-green-300">{item.tickr}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Benefits Grid */}
      <section className="py-16 bg-surface">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Ventajas que marcan la diferencia
            </h2>
            <p className="text-lg text-muted-foreground">
              Todo lo que necesitas para eventos exitosos
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <Card key={index} className="bg-background border-border hover:border-beige transition-colors">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-beige/10 rounded-lg flex items-center justify-center">
                      <benefit.icon className="w-6 h-6 text-beige" />
                    </div>
                    <h3 className="text-xl font-semibold text-foreground">{benefit.title}</h3>
                  </div>
                  <p className="text-muted-foreground">{benefit.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Lo que dicen nuestros clientes
            </h2>
            <p className="text-lg text-muted-foreground">
              Colegios que ya confían en Tickr
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="bg-surface border-border">
                <CardContent className="p-6">
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-beige text-beige" />
                    ))}
                  </div>
                  <blockquote className="text-lg text-foreground mb-4 italic">
                    "{testimonial.quote}"
                  </blockquote>
                  <div className="flex items-center gap-4">
                    <div>
                      <p className="font-semibold text-foreground">{testimonial.name}</p>
                      <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                      <Badge variant="outline" className="mt-1 border-beige text-beige">
                        {testimonial.school}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-surface">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              ¿Listo para la <span className="text-beige">revolución</span>?
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Únete a los colegios que ya están disfrutando de las ventajas de Tickr
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-beige text-surface-darker hover:bg-beige-dark text-lg px-8 py-6 h-auto"
              >
                Crear mi primer evento
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="border-beige text-beige hover:bg-beige hover:text-surface-darker text-lg px-8 py-6 h-auto"
              >
                Ver demo en vivo
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Ventajas;