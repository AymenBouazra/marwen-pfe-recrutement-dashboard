import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { routes } from '../routes';

const Sidebar = ({ showSidebarFN, isSidebarOpen }) => {
    const location = useLocation();

    const isLinkActive = (path) => {
        return location.pathname === path ? 'active' : '';
    };
    return (
        <aside className='left-sidebar'>
            <div className="brand-logo d-flex align-items-center justify-content-between">
                <Link to="/" className="text-nowrap logo-img">
                    <img src="img/logo/dark-logo.svg" width="180" alt="" />
                </Link>
                <div
                    className="close-btn d-xl-none d-block sidebartoggler cursor-pointer"
                    id="sidebarCollapse"
                    onClick={showSidebarFN}
                >
                    <i className={`ti ${isSidebarOpen ? 'ti-arrow-left' : 'ti-x'} fs-8`}></i>
                </div>
            </div>
            <nav className="sidebar-nav scroll-sidebar" data-simplebar="">
                <ul id="sidebarnav">
                    <li className="nav-small-cap">
                        <i className="ti ti-dots nav-small-cap-icon fs-4"></i>
                        <span className="hide-menu">Home</span>
                    </li>

                    {routes.map((nav, index) => {
                        return (
                            <li className='sidebar-item' key={index}>
                                <Link className={`sidebar-link ${isLinkActive(nav.path)}`} to={nav.path} aria-expanded="false">
                                    <span>
                                        <i className={"ti ti-" + nav.icon}></i>
                                    </span>
                                    <span className="hide-menu">{nav.name}</span>
                                </Link>
                            </li>
                        )
                    })}
                    <li className="nav-small-cap">
                        <i className="ti ti-dots nav-small-cap-icon fs-4"></i>
                        <span className="hide-menu">AUTH</span>
                    </li>
                    <li className='sidebar-item'>
                        <Link className='sidebar-link' to="/login" aria-expanded="false">
                            <span>
                                <i className="ti ti-login"></i>
                            </span>
                            <span className="hide-menu">Login</span>
                        </Link>
                    </li>
                    <li className='sidebar-item'>
                        <Link className='sidebar-link' to="/register" aria-expanded="false">
                            <span>
                                <i className="ti ti-user-plus"></i>
                            </span>
                            <span className="hide-menu">Register</span>
                        </Link>
                    </li>
                </ul>

            </nav>
        </aside>
    )
}

export default Sidebar