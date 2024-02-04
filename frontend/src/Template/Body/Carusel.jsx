import React from 'react'
import img from '../../Assets/img.jpg'
import img2 from '../../Assets/img2.jpg'
import img3 from '../../Assets/img3.jpg'
const Carusel = () => {
  return (
    <div className=" mt-2">
<div id="carouselExampleInterval" className="carousel carousel-dark slide" data-bs-ride="carousel">
  <div className="carousel-indicators">
    <button type="button" data-bs-target="#carouselExampleInterval" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
    <button type="button" data-bs-target="#carouselExampleInterval" data-bs-slide-to="1" aria-label="Slide 2"></button>
    <button type="button" data-bs-target="#carouselExampleInterval" data-bs-slide-to="2" aria-label="Slide 3"></button>
  </div>
  <div className="carousel-inner">
    <div className="carousel-item active" data-bs-interval="3000">
      <img src={img} className="d-block  w-100 imgs" alt="..."/>
      <div className="carousel-caption d-none d-md-block">
        <div className='textss'>
          <h1 className='titlee'>Create New Wesite</h1>
          <p className='fs-3'>This your hand create new web site with CRM</p>
        </div>
        
      </div>
    </div>
    <div className="carousel-item imgs" data-bs-interval="3000">
      <img src={img2} className="d-block w-100" alt="..."/>
      <div className="carousel-caption d-none d-md-block">
      <div className='textss'>
      <h1 className='titlee'>Your Safety Protected</h1>
        <p className='fs-3'>Your web safety with ssl sertifated.</p>
      </div>
        
      </div>
    </div>
    <div className="carousel-item imgs" data-bs-interval="3000">
      <img src={img3} className="d-block w-100" alt="..."/>
      <div className="carousel-caption d-none d-md-block">
      <div className='textss'>
      <h1 className='titlee'>Web Site Modern</h1>
        <p className='fs-3'>Our web sites moedrn design.</p>
      </div>
      </div>
    </div>
  </div>
  <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleInterval" data-bs-slide="prev">
  <i className="fas fa-chevron-left" style={{width: 30, height: 30}}></i>
    <span className="visually-hidden">Previous</span>
  </button>
  <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleInterval" data-bs-slide="next">
    <i className="fas fa-chevron-right" style={{width: 30, height: 30}}></i>
    <span className="visually-hidden">Next</span>
  </button>
</div>
    </div>
    
  )
}

export default Carusel