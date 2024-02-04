import React from 'react'

const PostCard = ({title, text, img, createDate}) => {
  return (
    <div class="col-3">
      <div class="card h-100">
        <img src={img} class="card-img-top" alt="..."/>
        <div class="card-body">
          <h5 class="card-title">{title}</h5>
          <p class="card-text">{text}</p>
        </div>
        <div class="card-footer">
          <small class="text-body-secondary">{createDate}</small>
        </div>
      </div>
    </div>
    
  )
}

export default PostCard