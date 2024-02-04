import React from 'react'
import img from '../../Assets/img2.jpg'

const Pricing = () => {
  return (
    <div class="row featurette">
      <div class="col-md-7 order-md-2">
        <h2 class="featurette-heading fw-normal lh-1">Oh yeah, it’s that good. <span class="text-body-secondary">See for yourself.</span></h2>
        <p class="lead">Another featurette? Of course. More placeholder content here to give you an idea of how this layout would work with some actual real-world content in place.</p>
      </div>
      <div class="col-md-5 order-md-1">
        <img src={img} alt="" width={500} height={500}/>
      </div>
    </div>
   
    
  )
}

export default Pricing