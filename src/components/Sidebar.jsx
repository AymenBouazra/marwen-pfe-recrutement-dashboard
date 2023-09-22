import React from 'react'
import { Link, useLocation } from 'react-router-dom'

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
                    <li className='sidebar-item'>
                        <Link className={`sidebar-link ${isLinkActive('/')}`} to="/" aria-expanded="false">
                            <span>
                                <i className="ti ti-layout-dashboard"></i>
                            </span>
                            <span className="hide-menu">Dashboard</span>
                        </Link>
                    </li>
                    <li className="nav-small-cap">
                        <i className="ti ti-dots nav-small-cap-icon fs-4"></i>
                        <span className="hide-menu">UI COMPONENTS</span>
                    </li>
                    <li className='sidebar-item'>
                        <Link className={`sidebar-link ${isLinkActive('/buttons')}`} to="/buttons" aria-expanded="false">
                            <span>
                                <i className="ti ti-article"></i>
                            </span>
                            <span className="hide-menu">Buttons</span>
                        </Link>
                    </li>
                    <li className='sidebar-item'>
                        <Link className={`sidebar-link ${isLinkActive('/alerts')}`} to="/alerts" aria-expanded="false">
                            <span>
                                <i className="ti ti-alert-circle"></i>
                            </span>
                            <span className="hide-menu">Alerts</span>
                        </Link>
                    </li>
                    <li className='sidebar-item'>
                        <Link className={`sidebar-link ${isLinkActive('/card')}`} to="/card" aria-expanded="false">
                            <span>
                                <i className="ti ti-cards"></i>
                            </span>
                            <span className="hide-menu">Card</span>
                        </Link>
                    </li>
                    <li className='sidebar-item'>
                        <Link className={`sidebar-link ${isLinkActive('/forms')}`} to="/forms" aria-expanded="false">
                            <span>
                                <i className="ti ti-file-description"></i>
                            </span>
                            <span className="hide-menu">Forms</span>
                        </Link>
                    </li>
                    <li className='sidebar-item'>
                        <Link className={`sidebar-link ${isLinkActive('/typography')}`} to="/typography" aria-expanded="false">
                            <span>
                                <i className="ti ti-typography"></i>
                            </span>
                            <span className="hide-menu">Typography</span>
                        </Link>
                    </li>
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
                    <li className="nav-small-cap">
                        <i className="ti ti-dots nav-small-cap-icon fs-4"></i>
                        <span className="hide-menu">EXTRA</span>
                    </li>
                    <li className='sidebar-item'>
                        <Link className={`sidebar-link ${isLinkActive('/tabler-icons')}`} to="/tabler-icons" aria-expanded="false">
                            <span>
                                <i className="ti ti-mood-happy"></i>
                            </span>
                            <span className="hide-menu">Icons</span>
                        </Link>
                    </li>
                    <li className='sidebar-item'>
                        <Link className={`sidebar-link ${isLinkActive('/sample-page')}`} to="/sample-page" aria-expanded="false">
                            <span>
                                <i className="ti ti-aperture"></i>
                            </span>
                            <span className="hide-menu">Sample Page</span>
                        </Link>
                    </li>
                </ul>

            </nav>
        </aside>
    )
}

export default Sidebar