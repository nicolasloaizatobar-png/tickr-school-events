import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, X, Star, Shield, Zap, Clock, Users, CreditCard, Phone, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Ventajas = () => {
  const navigate = useNavigate();
  const { userProfile } = useAuth();
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
      traditional: "Personas que se cuelan con nombres ajenos",
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


      {/* Organizer Exclusive Section */}
      {userProfile?.role === 'organizador' && (
        <section className="py-16 bg-gradient-to-r from-beige-dark/10 to-beige/10 border-y border-beige/20">
          <div className="container mx-auto px-4 text-center">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                ¡Empieza ahora como <span className="text-beige">Organizador</span>!
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Tienes todo lo que necesitas para crear eventos increíbles. Da el primer paso.
              </p>
              <Button 
                size="lg" 
                onClick={() => navigate('/organizador/crear-evento')}
                className="bg-beige text-surface-darker hover:bg-beige-dark text-lg px-8 py-6 h-auto group"
              >
                <Plus className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                Crea mi primer evento
              </Button>
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-16 bg-surface">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              El futuro de tus eventos empieza aquí
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Únete a los colegios que ya están disfrutando de las ventajas de Tickr
            </p>
            <div className="flex justify-center">
              <Button 
                size="lg" 
                onClick={() => navigate('/register')}
                className="bg-beige text-surface-darker hover:bg-beige-dark text-lg px-8 py-6 h-auto"
              >
                Crear mi primer evento
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