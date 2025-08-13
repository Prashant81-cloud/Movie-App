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


function Popular() {

document.title = 'Movie App | Popular'

    const navigate = useNavigate();
    const [category, setCategory] = useState("movie");
    const [duration, setDuration] = useState("day");
    const [popular, setPopular] = useState([]);
    const [page, setPage] = useState(1);
    const [hasMore, sethasMore] = useState(true);

const getPopular = async() => {
    try {
const {data} = await Axios.get(`/${category}/popular?page=${page}`)
    if(data.results.length > 0) {
        setPopular((prevState) => [...prevState, ...data.results])
        setPage(page + 1);
    }else{
        sethasMore(false);
    }

    } catch (error) {
        console.log(error);
    }
}

const refreshHandler = () => {

if(popular.length === 0) {
getPopular();
}else{
    setPage(1);
    setPopular([]);
    getPopular();
}
}

useEffect(()=>{
refreshHandler();
},[category]);

return popular.length > 0 ?  (
<div className='w-full h-screen '>
    <div className='   flex flex-col '>
<div className='w-full  pt-[1%] pl-[3%] pr-[5%] flex items-center justify-center '>


<h1 className='text-2xl text-zinc-400 font-semibold flex items-center gap-3 w-full'>
<span onClick={() => navigate(-1)} className='hover:text-[#6556CD] cursor-pointer'><FaArrowLeft /></span>
    Popular</h1>

    <TopNav/>



    <div className='flex gap-10' >
<Dropdown 
    title='Category' 
    options={[ 'movie', 'tv']} 
    func={(e) => setCategory(e.target.value)}
    />


    </div>


</div>

<InfiniteScroll
dataLength={popular.length}
loader={<Loader/>}
hasMore={hasMore}
next={getPopular}
>
    <Cards data={popular} title={category} />
</InfiniteScroll>

    </div>
</div>

) : (
<Loader/>
);
}

export default Popular