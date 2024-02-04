import React from 'react'
import img from '../../Assets/logo.png'

const Navbar = () => {
    return (
        <div className='bg-check'>
            <div className="container-fluid">
                <nav className="navbar bg-check navbar-expand-lg bg-body-tertiary">
                    <div className="container-fluid">
                    <a class="navbar-brand text-secondary fw-bold" href="#">
                        SOTF-PRO
                        </a>
                        <button
                            className="navbar-toggler"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#navbarScroll"
                            aria-controls="navbarScroll"
                            aria-expanded="false"
                            aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarScroll">
                            <ul className="navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll">
                                <li className="nav-item">
                                    <a className="nav-link text-dark" aria-current="page" href="#">Home</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link text-dark" href="#">About</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link text-dark" aria-disabled="true">Contact Us</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </div>
        </div>

    )
}

export default Navbar