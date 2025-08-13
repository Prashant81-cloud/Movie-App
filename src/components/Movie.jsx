import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Loader from './Loader';
import { FaArrowLeft } from "react-icons/fa";
import TopNav from './partials/TopNav';
import Dropdown from './partials/Dropdown';
import Axios from '../utils/Axios'
import Cards from './partials/Cards';
import InfiniteScroll from 'react-infinite-scroll-component';
import axios from 'axios';


function Movie() {

document.title = 'Movie App | Movies'

    const navigate = useNavigate();
    const [category, setCategory] = useState("now_playing");
    const [duration, setDuration] = useState("day");
    const [movie, setMovie] = useState([]);
    const [page, setPage] = useState(1);
    const [hasMore, sethasMore] = useState(true);

const getMovie = async() => {
    try {
const {data} = await Axios.get(`/movie/${category}?page=${page}`)
    if(data.results.length > 0) {
        setMovie((prevState) => [...prevState, ...data.results])
        setPage(page + 1);
    }else{
        sethasMore(false);
    }

    } catch (error) {
        console.log(error);
    }
}

const refreshHandler = () => {

if(movie.length === 0) {
getMovie();
}else{
    setPage(1);
    setMovie([]);
    getMovie();
}
}

useEffect(()=>{
refreshHandler();
},[category]);

return movie.length > 0 ?  (
<div className='w-full h-screen '>
    <div className='   flex flex-col '>
<div className='w-full  pt-[1%] pl-[3%] pr-[5%] flex items-center justify-center '>


<h1 className='text-2xl text-zinc-400 font-semibold flex items-center gap-3 w-full'>
<span onClick={() => navigate(-1)} className='hover:text-[#6556CD] cursor-pointer'><FaArrowLeft /></span>
    Movies</h1>

    <TopNav/>



    <div className='flex gap-10' >
<Dropdown 
    title='Category' 
    options={[ 'popular', 'now_playing', 'top_rated', 'upcoming']} 
    func={(e) => setCategory(e.target.value)}
    />


    </div>


</div>

<InfiniteScroll
dataLength={movie.length}
loader={<Loader/>}
hasMore={hasMore}
next={getMovie}
>
    <Cards data={movie} title='movie' />
</InfiniteScroll>

    </div>
</div>

) : (
<Loader/>
);
}

export default Movie