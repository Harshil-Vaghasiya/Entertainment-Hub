import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Genres from "../../components/Genres/Genres";
import SingleContent from "../../components/SingleContent/SingleContent";
// import useGenre from "../../hooks/useGenre";
import CustomPagination from "../../components/pagination/CustomPagination";
import useGenre from '../../hooks/useGenre';

const Movies = () => {
  const [page, setPage] = useState(1);
  const [content, setContent] = useState([]);
  const [numOfPages, setNumOfPages] = useState();
  const [genres, setGenres] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const genreforURL=useGenre(selectedGenres);

  const fetchMovies = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=${genreforURL}`
    );
    setContent(data.results);
    setNumOfPages(data.total_pages);
    // console.log(data);
  };

  useEffect(() => {
    window.scroll(0, 0);
    fetchMovies();
       // eslint-disable-next-line
  }, [page,genreforURL])

  return (
    <>
      <span className='pageTitle'>Movies</span>
      <Genres
        type="movie"
        selectedGenres={selectedGenres}
        setSelectedGenres={setSelectedGenres}
        genres={genres}
        setGenres={setGenres}
        setPage={setPage}
      />
      <div className="trending">
        {
          content && content.map((val) => (
            <SingleContent
              key={val.id}
              id={val.id}
              poster={val.poster_path}
              title={val.title || val.name}
              date={val.first_air_date || val.release_date}
              type='movie'
              rating={val.vote_average}
            />
          ))
        }
      </div>
      {numOfPages > 1 && (
        <CustomPagination setPage={setPage} numOfPages={numOfPages} />
      )}
    </>
  )
}

export default Movies;
