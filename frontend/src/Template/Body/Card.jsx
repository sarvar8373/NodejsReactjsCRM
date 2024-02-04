import React from 'react'

const Card = ({title, text, img, createDate}) => {
    return (
        <div className="col-3">
            <div class="card h-100 bg-transparent  border-0">
                <span className='display-1 text-center text-primary'>{img}</span>
                <div class="card-body text-center">
                    <h3 class="card-title text-primary">{title}</h3>
                    <p class="card-text text-secondary">{text}</p>
                </div>
            </div>
        </div>

    )
}

export default Card