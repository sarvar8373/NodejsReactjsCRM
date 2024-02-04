import React from 'react'
import Navbar from './Header/Navbar'
import Carusel from './Body/Carusel'
import Card from './Body/Card'
import img from '../Assets/img.jpg'
import PostCard from './Body/PostCard'
import TextAbout from './Body/TextAbout'
import Pricing from './Body/Pricing'

const Template = () => {
    return (
        <div className='bg-check'>

            <Navbar/>
            <Carusel/>
            <div className="container-fluid d-flex justify-content-between my-5">
              <Card
                      title="SAFETY"
                      text="Lorem Ipsum is simply dummy text of the printing and typesetting industry."
                      img={<i className='fas fa-shield-alt'></i>}/>
                    
              <Card
                      title="MODERN"
                      text="Lorem Ipsum is simply dummy text of the printing and typesetting industry."
                      img={<i className='fas fa-palette'></i>}/>
              <Card
                      title="FASTING"
                      text="Lorem Ipsum is simply dummy text of the printing and typesetting industry."
                      img={<i className='	fas fa-cogs'></i>}/>
            </div>
            <div className="bg-secondary d-flex justify-content-between my-5 py-5">
              <TextAbout/>
            </div>
            <div className="container d-flex justify-content-between my-5">
              <PostCard
                title="News"
                text="Lorem Ipsum is simply dummy text of the printing and typesetting industry."
                img={img}
                createDate="2024-02-02"
              />
              <PostCard
                title="News"
                text="Lorem Ipsum is simply dummy text of the printing and typesetting industry."
                img={img}
                createDate="2024-02-02"
              />
              <PostCard
                title="News"
                text="Lorem Ipsum is simply dummy text of the printing and typesetting industry."
                img={img}
                createDate="2024-02-02"
              />
            </div>
            <div className="container">
              <Pricing/>
            </div>
            <footer class="container-fluid bg-white text-center my-5 py-5">
              <p>© 2017–2023 Company, Inc. · <a href="#">Privacy</a> · <a href="#">Terms</a></p>
            </footer>
        </div>
    )
}

export default Template