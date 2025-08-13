import React from 'react'
import Home from './components/Home'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Route, Routes } from 'react-router-dom';
import Loader from './components/Loader';
import Trending from './components/Trending';
import Popular from './components/Popular'
import Movie from './components/Movie';
import TvShows from './components/TvShows';
import People from './components/People';
import MovieDetails from './components/MovieDetails';
import PersonDetails from './components/PersonDetails';
import TvDetails from './components/TvDetails';
import Trailer from './components/partials/Trailer';
import NotFound from './components/NotFound';

function App() {
  return (
    
    <div className='h-screen w-screen bg-[#1F1E24] '>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/trending' element={<Trending />} />
        <Route path='/popular' element = {<Popular/>} />
        <Route path='/movies' element = {<Movie/>} />
        <Route path='/movie/details/:id' element = {<MovieDetails/>} >
                <Route path='/movie/details/:id/trailer' element={<Trailer/>} />
        </Route>
        <Route path='/tvshows' element = {<TvShows/>} />
        <Route path='/tv/details/:id' element = {<TvDetails/>}>
                <Route path='/tv/details/:id/trailer' element={<Trailer/>} />
        </Route>
        <Route path='/people' element = {<People/>} />
        <Route path='/person/details/:id' element = {<PersonDetails/>} />


<Route path='*' element={<NotFound/>} />
      </Routes>
    </div>
  )
}

export default App