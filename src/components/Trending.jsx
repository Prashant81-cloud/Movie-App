import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Loader from './Loader';
import { FaArrowLeft } from "react-icons/fa";
import TopNav from './partials/TopNav';
import Dropdown from './partials/Dropdown';
import Axios from '../utils/Axios'
import Cards from './partials/Cards';
import InfiniteScroll from 'react-infinite-scroll-component';


function Trending() {

document.title = 'Movie App | Trending'

    const navigate = useNavigate();
    const [category, setCategory] = useState("all");
    const [duration, setDuration] = useState("day");
    const [trending, setTrending] = useState([]);
    const [page, setPage] = useState(1);
    const [hasMore, sethasMore] = useState(true);

console.log(category)

const getTrending = async() => {
    try {
const {data} = await Axios.get(`/trending/${category}/${duration}?page=${page}`);
    if(data.results.length > 0) {
        setTrending((prevState) => [...prevState, ...data.results])
        setPage(page + 1);
    }else{
        sethasMore(false);
    }

    } catch (error) {
        console.log(error);
    }
}

const refreshHandler = () => {

if(trending.length === 0) {
getTrending();
}else{
    setPage(1);
    setTrending([]);
    getTrending();
}
}

useEffect(()=>{
refreshHandler();
},[category, duration]);

return trending.length > 0 ?  (
<div className='w-full h-screen '>
    <div className='   flex flex-col '>
<div className='w-full  pt-[1%] pl-[3%] pr-[5%] flex items-center justify-center '>


<h1 className='text-2xl text-zinc-400 font-semibold flex items-center gap-3 w-full'>
<span onClick={() => navigate(-1)} className='hover:text-[#6556CD] cursor-pointer'><FaArrowLeft /></span>
    Trending</h1>

    <TopNav/>



    <div className='flex gap-10' >
<Dropdown 
    title='Category' 
    options={['all', 'movie', 'tv']} 
    func={(e) => setCategory(e.target.value)}
    />

<Dropdown 
    title='Duration' 
    options={['week', 'day']} 
    func={(e) => setDuration(e.target.value)}
    />
    </div>


</div>

<InfiniteScroll
dataLength={trending.length}
loader={<Loader/>}
hasMore={hasMore}
next={getTrending}
>
    <Cards data={trending} title={category} />
</InfiniteScroll>

    </div>
</div>

) : (
<Loader/>
);
}

export default Trending