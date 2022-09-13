import React from 'react'
import './CardGame.css'

export default function CardGame({name, img, genres}) {
    return (
      <div className="fondo">
        <div className="outer2 circle">
          <div>
            <h3 className="h3">{name}</h3>
            <img className="img"  src={img} alt="Not Found" />
            <arguments>
              { typeof genres[0] === 'object' ? 
              genres.map(g=> <p className="genre_p"> {g.name + " - "}</p>):
              genres.map(g=> <p className="genre_p"> {g + " - "}</p>) }
            </arguments>
          </div>
        </div>
      </div>
    )
}
