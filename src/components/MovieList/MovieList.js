import React, { useState } from 'react';
import useFetch from '../../customHooks/useFetch';
import Slider from 'react-slick';

// Import css files
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './MovieList.css';
import MovieDetail from '../MovieDetail/MovieDetail';
import LoadingCommon from '../LoadingCommon';

function MovieList({ apiEndpoint, isOriginal }) {
   const { results, isLoading } = useFetch(apiEndpoint);
   const [isShowMovieDetail, setIsShowMovieDetail] = useState(false);
   const [isBannerList, setIsBannerList] = useState(false);
   const [movie, setMovie] = useState({});
   // let movieId;
   const settings = {
      dots: false,
      infinite: true,
      draggable: true,
      speed: 1000,
      slidesToShow: 9,
      slidesToScroll: 5,
      autoplaySpeed: 3000,
      lazyLoad: true,
      cssEase: 'linear',
   };
   const handleShowDetails = (movie, isOriginal) => {
      setIsShowMovieDetail(!isShowMovieDetail);
      setMovie(movie);
      setIsBannerList(isOriginal);
   };

   if (isLoading) return <LoadingCommon />;

   return (
      <div className='movieList'>
         <Slider {...settings}>
            {results?.results?.map(movie => {
               return (
                  <div className='movieItem' key={movie.id}>
                     {isOriginal ? (
                        <img
                           src={`https://image.tmdb.org/t/p/w185/${movie.poster_path}`}
                           alt={movie.title || movie.name}
                           className='movieImgPoster'
                           onClick={() => handleShowDetails(movie, isOriginal)}
                        />
                     ) : (
                        <img
                           src={`https://image.tmdb.org/t/p/w185/${movie.backdrop_path}`}
                           alt={movie.title || movie.name}
                           className='movieImgBackDrop'
                           onClick={() => handleShowDetails(movie, isOriginal)}
                        />
                     )}
                  </div>
               );
            })}
         </Slider>
         {isLoading ? (
            <LoadingCommon />
         ) : (
            <MovieDetail
               isShowMovieDetail={isShowMovieDetail}
               movieData={movie}
               isBannerList={isBannerList}
            />
         )}
      </div>
   );
}

export default MovieList;
