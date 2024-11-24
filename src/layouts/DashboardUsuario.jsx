import { Outlet } from 'react-router-dom';
import NavMenu from '../components/NavMenu';

import '../css/global.css';

export default function AppLayout() {
    return (
        <>
            <div className="min-h-screen flex flex-col .main-content">
                {/* Barra de navegación en la parte superior */}
                <header className="w-full bg-base ">
                    <NavMenu />
                </header>

                {/* Contenido principal bajo el NavMenu */}

                <main className="flex-grow w-full  p-5 pt-20 bg-base">
                    <Outlet />
                </main>
            </div>
        </>
    );
}
