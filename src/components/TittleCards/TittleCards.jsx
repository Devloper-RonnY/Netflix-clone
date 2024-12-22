import { Link } from "react-router-dom";
import "./TittleCards.css"
import { useState } from "react";

const TittleCards = ({title, category}) => {

  const [apidata, setApiData] = useState([])

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5NzhmOThjYzQzMjE3MjdlM2UzMjdmYjNmNzQxZTQzMiIsIm5iZiI6MTczMzczNDAyMC4xMzEsInN1YiI6IjY3NTZhZTg0OThjMzM4OTJhMjU1OGQ2YyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.3e46JRZoG3nLL-gRSoJfAwYMBtnSwxNQZ5WlNlBymXU'
    }
  };
  
  fetch(`https://api.themoviedb.org/3/movie/${category ? category : "now_playing"}?language=en-US&page=1`, options)
    .then(res => res.json())
    .then(res => setApiData(res.results))
    .catch(err => console.error(err));

  return (
    <div className='title-cards'>
        <h2>{title ? title : "Popular on Netflix"}</h2>
        <div className="card-list }">
          {apidata.map((card, index) => {
            return <Link to={`/player/${card.id}`} className="card" key={index}>
              <img src={`https://image.tmdb.org/t/p/w500` + card.backdrop_path} />
              <p>{card.original_title}</p>
            </Link>
          })}
        </div>
    </div>
  )
}

export default TittleCards; 