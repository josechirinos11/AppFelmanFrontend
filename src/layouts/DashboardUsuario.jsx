import { Outlet } from 'react-router-dom';
import NavMenu from '../components/NavMenu';

export default function AppLayout() {
    return (
        <>
            {/* Barra de navegación en la parte superior */}
            <header className="w-full bg-gray-100 p-4 shadow">
                <NavMenu />
            </header>

            {/* Contenido principal bajo el NavMenu */}
            <main className="container mx-auto mt-8 p-5">
                <Outlet />
            </main>
        </>
    );
}
