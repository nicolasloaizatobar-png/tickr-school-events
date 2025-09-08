import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";

const Header = () => {
  const location = useLocation();

  return (
    <header className="fixed top-0 w-full bg-background/95 backdrop-blur-sm border-b border-border z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/home" className="flex items-center space-x-2">
          <div className="text-2xl font-bold text-foreground hover:text-beige transition-colors">Tickr</div>
        </Link>
        
        <nav className="hidden md:flex items-center space-x-8">
          <Link 
            to="/home"
            className={`transition-colors ${
              location.pathname === '/' || location.pathname === '/home' 
                ? 'text-beige' 
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            Home
          </Link>
          <Link 
            to="/eventos"
            className={`transition-colors ${
              location.pathname === '/eventos' 
                ? 'text-beige' 
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            Eventos
          </Link>
          <Link 
            to="/ventajas"
            className={`transition-colors ${
              location.pathname === '/ventajas' 
                ? 'text-beige' 
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            Ventajas
          </Link>
          <Link 
            to="/contacto"
            className={`transition-colors ${
              location.pathname === '/contacto' 
                ? 'text-beige' 
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            Contacto
          </Link>
        </nav>

        <div className="flex items-center space-x-4">
          <Button 
            variant="outline" 
            onClick={() => window.location.href = '/login'}
            className="border-beige text-beige hover:bg-beige hover:text-surface-darker transition-smooth"
          >
            Iniciar sesión
          </Button>
          <Button 
            onClick={() => window.location.href = '/register'}
            className="bg-beige text-surface-darker hover:bg-beige-dark transition-smooth"
          >
            Registrarse
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;