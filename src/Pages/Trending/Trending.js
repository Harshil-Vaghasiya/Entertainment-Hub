import React, { useEffect,useState } from 'react';
import axios from 'axios';
import SingleContent from '../../components/SingleContent/SingleContent';
import './Trending.css';
import CustomPagination from '../../components/pagination/CustomPagination';

const Trending = () => {
  const [page, setPage] = useState(1);
  const [content, setContent] = useState([]);

const fetchTrending=async ()=>{
  const {data}=await axios.get(`https://api.themoviedb.org/3/trending/all/day?api_key=${process.env.REACT_APP_API_KEY}&page=${page}`);
  // console.log(data);

  setContent(data.results)
}

useEffect(()=>{
  window.scroll(0, 0);
  fetchTrending()
   // eslint-disable-next-line
},[page]);

  return (
    <>
    <span className='pageTitle'>Trending</span>
    <div className='trending'>
      {
        content && content.map((val)=>(
          <SingleContent
           key={val.id}
            id={val.id}
            poster={val.poster_path}
            title={val.title || val.name}
            date={val.first_air_date || val.release_date}
            type={val.media_type}
            rating={val.vote_average}
           />
        ))
      }
    </div>
    <CustomPagination setPage={setPage} />
    </>
  )
}

export default Trending;
