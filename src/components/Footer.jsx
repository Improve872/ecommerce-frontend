import React from 'react';
import { Facebook, Instagram, Twitter, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="bg-stone-900 text-white mt-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 border-t border-stone-700">
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    
                    {/* Columna 1: Logo y Copyright */}
                    <div>
                        <Link to="/" className="text-xl font-bold tracking-wider text-amber-400">
                            URBAN STYLE
                        </Link>
                        <p className="mt-4 text-sm text-gray-400">
                            &copy; {new Date().getFullYear()} Urban Style. Todos los derechos reservados.
                        </p>
                    </div>

                    {/* Columna 2: Navegación */}
                    <div>
                        <h3 className="text-md font-semibold mb-3">Navegación</h3>
                        <ul className="space-y-2 text-sm text-gray-400">
                            <li><Link to="/" className="hover:text-amber-400 transition">Inicio</Link></li>
                            <li><Link to="/products" className="hover:text-amber-400 transition">Colección</Link></li>
                            <li><Link to="/cart" className="hover:text-amber-400 transition">Mi Carrito</Link></li>
                            <li><Link to="/auth/login" className="hover:text-amber-400 transition">Mi Cuenta</Link></li>
                        </ul>
                    </div>

                    {/* Columna 3: Información */}
                    <div>
                        <h3 className="text-md font-semibold mb-3">Soporte</h3>
                        <ul className="space-y-2 text-sm text-gray-400">
                            <li><Link to="/contact" className="hover:text-amber-400 transition">Contacto</Link></li>
                            <li><Link to="/faq" className="hover:text-amber-400 transition">FAQ</Link></li>
                            <li><Link to="/terms" className="hover:text-amber-400 transition">Términos y Condiciones</Link></li>
                        </ul>
                    </div>

                    {/* Columna 4: Redes Sociales */}
                    <div>
                        <h3 className="text-md font-semibold mb-3">Síguenos</h3>
                        <div className="flex space-x-4">
                            <a href="#" className="text-gray-400 hover:text-amber-400 transition"><Facebook /></a>
                            <a href="#" className="text-gray-400 hover:text-amber-400 transition"><Instagram /></a>
                            <a href="#" className="text-gray-400 hover:text-amber-400 transition"><Twitter /></a>
                            <a href="#" className="text-gray-400 hover:text-amber-400 transition"><Mail /></a>
                        </div>
                    </div>

                </div>
            </div>
        </footer>
    );
};

export default Footer;