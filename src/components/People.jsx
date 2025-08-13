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


function People() {

document.title = 'Movie App | Tv '

    const navigate = useNavigate();
    const [category, setCategory] = useState("popular");
    const [duration, setDuration] = useState("day");
    const [people, setPeople] = useState([]);
    const [page, setPage] = useState(1);
    const [hasMore, sethasMore] = useState(true);

const getTv = async() => {
    try {
const {data} = await Axios.get(`/person/${category}?page=${page}`)
    if(data.results.length > 0) {
        setPeople((prevState) => [...prevState, ...data.results])
        setPage(page + 1);
    }else{
        sethasMore(false);
    }

    } catch (error) {
        console.log(error);
    }
}

const refreshHandler = () => {

if(people.length === 0) {
getTv();
}else{
    setPage(1);
    setPeople([]);
    getTv();
}
}

useEffect(()=>{
refreshHandler();
},[category]);

return people.length > 0 ?  (
<div className='w-full h-screen '>
    <div className='   flex flex-col '>
<div className='w-full  pt-[1%] pl-[3%] pr-[5%] flex items-center justify-center '>


<h1 className='text-2xl text-zinc-400 font-semibold flex items-center gap-3 w-full'>
<span onClick={() => navigate(-1)} className='hover:text-[#6556CD] cursor-pointer'><FaArrowLeft /></span>
    Peoples</h1>

    <TopNav/>





</div>

<InfiniteScroll
dataLength={people.length}
loader={<Loader/>}
hasMore={hasMore}
next={getTv}
>
    <Cards data={people} title='person' />
</InfiniteScroll>

    </div>
</div>

) : (
<Loader/>
);
}

export default People