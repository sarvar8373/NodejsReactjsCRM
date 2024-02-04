import React from 'react'
import './Sidebar.css'
import logo from '../../../Assets/logo.png'
import { IoMdSpeedometer, IoIosColorPalette  } from "react-icons/io";
import { PiSignpostBold } from "react-icons/pi";
import { HiDocumentDuplicate } from "react-icons/hi2";
import { MdPermMedia, MdOutlineSettings  } from "react-icons/md";
import { FaUsers } from "react-icons/fa";
import { BsQuestionCircle } from "react-icons/bs";
import { BiLogOut } from "react-icons/bi";
import { Link, useLocation } from 'react-router-dom';

const Sidebar = ({ onLogout }) => {
    const handleLogoutClick = () => {
      // Perform any additional logout actions if needed
      // ...
  
      // Call the onLogout function to update the isAuthenticated state in App
      onLogout();
    };
    const location = useLocation();

    const isActive = (path) => {
      return location.pathname === path;
    };
  return (
    <div id="layoutSidenav_nav">
    <nav className="sb-sidenav accordion sb-sidenav-dark" id="sidenavAccordion">
        <div className="sb-sidenav-menu">
            <div className="nav">
                <div className="sb-sidenav-menu-heading">Core</div>
                <Link className="nav-link" to={'/'}>
                    <div className="sb-nav-link-icon"><i className="fas fa-tachometer-alt"></i></div>
                    Dashboard
                </Link>
                <div className="sb-sidenav-menu-heading">EDITORS</div>
                <a className="nav-link collapsed" href="#" data-bs-toggle="collapse" data-bs-target="#collapseCategories" aria-expanded="false" aria-controls="collapseCategories">
                    <div className="sb-nav-link-icon"><i className="fas fa-book-open"></i></div>
                    Categories
                    <div className="sb-sidenav-collapse-arrow"><i className="fas fa-angle-down"></i></div>
                </a>
                <div className="collapse" id="collapseCategories" aria-labelledby="headingTwo" data-bs-parent="#sidenavAccordion">
                    <nav className="sb-sidenav-menu-nested nav accordion" id="sidenavAccordionPages">
                        <Link className="nav-link" to='/dashboard/add-categories'>Add Categories</Link>
                        <Link className="nav-link" to='/dashboard/all-categories'>All Categories</Link>
                    </nav>
                </div>
                <a className="nav-link collapsed" href="#" data-bs-toggle="collapse" data-bs-target="#collapseLayouts" aria-expanded="false" aria-controls="collapseLayouts">
                    <div className="sb-nav-link-icon"><i className="fas fa-columns"></i></div>
                    Posts
                    <div className="sb-sidenav-collapse-arrow"><i className="fas fa-angle-down"></i></div>
                </a>
                <div className="collapse" id="collapseLayouts" aria-labelledby="headingOne" data-bs-parent="#sidenavAccordion">
                    <nav className="sb-sidenav-menu-nested nav">
                        <Link className="nav-link" to='/dashboard/add-posts'>Add Posts</Link>
                        <Link className="nav-link" to='/dashboard/all-posts'>All Posts</Link>
                    </nav>
                </div>
                <a className="nav-link collapsed" href="#" data-bs-toggle="collapse" data-bs-target="#collapsePages" aria-expanded="false" aria-controls="collapsePages">
                    <div className="sb-nav-link-icon"><i className="fas fa-book-open"></i></div>
                    Pages
                    <div className="sb-sidenav-collapse-arrow"><i className="fas fa-angle-down"></i></div>
                </a>
                <div className="collapse" id="collapsePages" aria-labelledby="headingTwo" data-bs-parent="#sidenavAccordion">
                    <nav className="sb-sidenav-menu-nested nav accordion" id="sidenavAccordionPages">
                        <Link className="nav-link" to='/dashboard/add-page'>Add Pages</Link>
                        <Link className="nav-link" to='/dashboard/all-page'>All Pages</Link>
                    </nav>
                </div>
                <div className="sb-sidenav-menu-heading">TOOLS</div>
                <a className="nav-link" href="tables.html">
                    <div className="sb-nav-link-icon"><i className="fas fa-palette"></i></div>
                    Styles
                </a>
                <Link className="nav-link" to="/dashboard/profile">
                    <div className="sb-nav-link-icon"><i className="fas fa-user"></i></div>
                    Profile
                </Link>
                <a className="nav-link collapsed" href="#" data-bs-toggle="collapse" data-bs-target="#collapseUsers" aria-expanded="false" aria-controls="collapseUsers">
                    <div className="sb-nav-link-icon"><i className="fas fa-users"></i></div>
                    Users
                    <div className="sb-sidenav-collapse-arrow"><i className="fas fa-angle-down"></i></div>
                </a>
                <div className="collapse" id="collapseUsers" aria-labelledby="headingTwo" data-bs-parent="#sidenavAccordion">
                    <nav className="sb-sidenav-menu-nested nav accordion" id="sidenavAccordionPages">
                        <Link className="nav-link" to='/dashboard/add-users'>Add Users</Link>
                        <Link className="nav-link" to='/dashboard/all-users'>All Users</Link>
                    </nav>
                </div>
                
                <a className="nav-link" href="tables.html">
                    <div className="sb-nav-link-icon"><i className="fas fa-tools"></i></div>
                    Settings
                </a>
            </div>
        </div>
        <div className="sb-sidenav-footer d-flex">
            <Link className="nav-link" to='/' onClick={handleLogoutClick}>
                   <BiLogOut/> Log out
            </Link>
        </div>
    </nav>
   
</div>
  )
}

export default Sidebar