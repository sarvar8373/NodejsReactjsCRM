import React, { useEffect } from 'react'
import { Link } from 'react-router-dom';

const Navbar = () => {
    const handleSidebarToggle = () => {
        document.body.classList.toggle('sb-sidenav-toggled');
        localStorage.setItem('sb|sidebar-toggle', document.body.classList.contains('sb-sidenav-toggled'));
      };
    
      useEffect(() => {
        // Cleanup the event listener when the component unmounts
        return () => {
          // No need to manually remove the event listener when using onClick
        };
      }, []);
  return (
    <nav className="sb-topnav navbar navbar-expand navbar-dark bg-dark">
    <Link className='navbar-brand ps-3' to='/'>Soft Pro CRM</Link>
    <button className="btn btn-link btn-sm order-1 order-lg-0 me-4 me-lg-0" id="sidebarToggle" onClick={handleSidebarToggle}>
        <i className="fas fa-bars"></i>
      </button>    <form className="d-none d-md-inline-block form-inline ms-auto me-0 me-md-3 my-2 my-md-0">
      <ul className="navbar-nav ms-auto ms-md-0">
        <li className="nav-item dropdown">
            <a className="nav-link dropdown-toggle" id="navbarDropdown" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false"><i className="fas fa-bell"></i></a>
            <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
            </ul>
        </li>
    </ul>
    </form>
    <ul className="navbar-nav ms-auto ms-md-0 me-3 me-lg-4">
        <li className="nav-item dropdown">
            <a className="nav-link dropdown-toggle" id="navbarDropdown" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false"><i className="fas fa-user"></i></a>
            <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
                <li><a className="dropdown-item" href="#!">Settings</a></li>
                <li><a className="dropdown-item" href="#!">Activity Log</a></li>
                <li><hr className="dropdown-divider" /></li>
                <li><Link className='dropdown-item' to='/'>Logout</Link></li>
            </ul>
        </li>
    </ul>
</nav>

  )
}

export default Navbar