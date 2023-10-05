import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { deleteCookie } from '../utils/functions'
import axios from 'axios'
import { toast } from 'react-toastify'
import { CoockieContext } from '../features/contexts'
const Header = ({ showSidebarFN }) => {
    const Context = useContext(CoockieContext)

    const navigate = useNavigate()
    const logout = async () => {
        const response = await axios.get(process.env.REACT_APP_BASE_URL + 'auth/logout')
        toast.success(response.data.message)
        navigate('/login')
        deleteCookie('token')
    }

    return (
        <header className="app-header">
            <nav className="navbar navbar-expand-lg navbar-light">
                <ul className="navbar-nav">
                    <li className="nav-item d-block d-xl-none">
                        <div className="nav-link sidebartoggler nav-icon-hover" id="headerCollapse"
                            onClick={showSidebarFN}
                        >
                            <i className="ti ti-menu-2"></i>
                        </div>
                    </li>
                    {/* <li className="nav-item">
                        <div className="nav-link nav-icon-hover">
                            <i className="ti ti-bell-ringing"></i>
                            <div className="notification bg-primary rounded-circle"></div>
                        </div>
                    </li> */}
                </ul>
                <div className="navbar-collapse justify-content-end px-0" id="navbarNav">
                    <ul className="navbar-nav flex-row ms-auto align-items-center justify-content-end">
                        <li><span>{Context.role}</span></li>
                        <li className="nav-item dropdown">
                            <div className="nav-link nav-icon-hover" id="drop2" data-bs-toggle="dropdown"
                                aria-expanded="false">
                                <img src="img/profile/user-1.jpg" alt="" width="35" height="35" className="rounded-circle" />
                            </div>
                            <div className="dropdown-menu dropdown-menu-end dropdown-menu-animate-up" aria-labelledby="drop2">
                                <div className="message-body">
                                    <Link
                                        to='/profile'
                                        className="d-flex align-items-center gap-2 dropdown-item">
                                        <i className="ti ti-user fs-6"></i>
                                        <p className="mb-0 fs-3">My Profile</p>
                                    </Link>
                                    <div className="d-flex align-items-center gap-2 dropdown-item">
                                        <i className="ti ti-list-check fs-6"></i>
                                        <p className="mb-0 fs-3">My Task</p>
                                    </div>
                                    <div onClick={logout} className="btn btn-outline-primary mx-3 mt-2 d-block">Logout</div>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </nav>
        </header>
    )
}

export default Header