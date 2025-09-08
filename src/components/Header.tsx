import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

const Header = () => {
  const location = useLocation();
  const { user, userProfile, signOut } = useAuth();

  return (
    <header className="fixed top-0 w-full bg-background/95 backdrop-blur-sm border-b border-border z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/home" className="flex items-center space-x-2">
          <div className="text-2xl font-bold text-foreground hover:text-primary transition-colors">Tickr</div>
        </Link>
        
        <nav className="hidden md:flex items-center space-x-8">
          <Link 
            to="/home"
            className={`transition-colors ${
              location.pathname === '/' || location.pathname === '/home' 
                ? 'text-primary' 
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            Home
          </Link>
          <Link 
            to="/eventos"
            className={`transition-colors ${
              location.pathname === '/eventos' 
                ? 'text-primary' 
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            Eventos
          </Link>
          <Link 
            to="/ventajas"
            className={`transition-colors ${
              location.pathname === '/ventajas' 
                ? 'text-primary' 
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            Ventajas
          </Link>
          <Link 
            to="/contacto"
            className={`transition-colors ${
              location.pathname === '/contacto' 
                ? 'text-primary' 
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            Contacto
          </Link>
        </nav>

        <div className="flex items-center space-x-4">
          {user ? (
            <>
              <Link 
                to={userProfile?.role === 'organizador' ? '/organizador/dashboard' : '/comprador/eventos'}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                Dashboard
              </Link>
              <Button 
                variant="outline" 
                onClick={signOut}
                className="border-primary/20 text-primary hover:bg-primary hover:text-primary-foreground button-premium"
              >
                Cerrar sesión
              </Button>
            </>
          ) : (
            <>
              <Button 
                variant="outline" 
                onClick={() => window.location.href = '/login'}
                className="border-primary/20 text-primary hover:bg-primary hover:text-primary-foreground button-premium"
              >
                Iniciar sesión
              </Button>
              <Button 
                onClick={() => window.location.href = '/register'}
                className="bg-primary text-primary-foreground hover:bg-primary/90 button-premium"
              >
                Registrarse
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;