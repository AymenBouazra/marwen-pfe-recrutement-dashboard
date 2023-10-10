import React, { useEffect, useState } from 'react'
import Sidebar from './Sidebar'
import Header from './Header'
import { Link, Outlet } from 'react-router-dom'
const Layout = () => {
    const [isMiniSidebar, setIsMiniSidebar] = useState(window.innerWidth < 1200);

    const showSidebarFN = () => {
        setIsMiniSidebar(!isMiniSidebar)
    }
    useEffect(() => {
        const handleResize = () => {
            setIsMiniSidebar(window.innerWidth < 1200);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);
    return (
        <div
            className={`page-wrapper ${isMiniSidebar ? 'mini-sidebar' : 'show-sidebar'}`}
            id="main-wrapper"
            data-layout="vertical"
            data-navbarbg="skin6"
            data-sidebartype={`${isMiniSidebar ? 'mini-sidebar' : 'full'}`}
            data-sidebar-position="fixed"
            data-header-position="fixed"
        >
            <Sidebar showSidebarFN={showSidebarFN} isSidebarOpen={isMiniSidebar} />
            <div className="body-wrapper">
                <Header showSidebarFN={showSidebarFN} isSidebarOpen={isMiniSidebar} />
                <Outlet />
                <div className="py-6 px-6 text-center">
                    <p className="mb-0 fs-4">Designed and Developed by <Link to="/">Marwen BOUGOSSA</Link></p>
                </div>
            </div>
        </div>
    )
}

export default Layout