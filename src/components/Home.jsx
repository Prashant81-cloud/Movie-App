import React, { useEffect, useState } from 'react'
import SideNav from './partials/SideNav'
import TopNav from './partials/TopNav'
import Header from './partials/Header'
import Axios from '../utils/Axios'
import { data } from 'react-router-dom'
import HorizontalCards from './partials/HorizontalCards'
import Dropdown from './partials/Dropdown'
import Loader from './Loader'

function Home() {

const [wallpaper, setWallpaper] = useState(null);
const [topRated, setTopRated] = useState(null);
const [category, setcategory] = useState("movie");

    const getHeaderWallpaper = async() => {
    try {
        const {data} = await Axios.get(`/movie/top_rated`);
        const randomData = data.results.filter((val, index) => index > 13);
        setWallpaper(randomData);
    } catch (error) {
        console.log(error)
    }
    }

console.log(wallpaper)
const getTopRated = async () => {
    try {
        const [moviesRes, tvRes] = await Promise.all([
            Axios.get(`/movie/top_rated`),
            Axios.get(`/tv/top_rated`)
        ]);

        let combined = [];

        if (category === "movie") {
            combined = moviesRes.data.results;
        } else if (category === "tv") {
            combined = tvRes.data.results;
        } else {
            combined = [...moviesRes.data.results.filter((val, index) => index > 9), ...tvRes.data.results.filter((val, index) => index > 9)];
        }

        

        setTopRated(combined);
    } catch (error) {
        console.log(error);
    }
};




    useEffect(()=>{
    getTopRated();
    !wallpaper && getHeaderWallpaper();
    },[category])

    

return wallpaper && topRated ? (
    <div className='flex'>
{< SideNav/>}
<div className='h-screen w-[80%] '>
    <div className='sticky top-0 z-50 bg-[#1F1E24]'>
{<TopNav/>}
    </div>

{<Header data = {wallpaper} title = {category}/>}
<div className="flex justify-between p-5">
    <h1 className="text-3xl font-semibold text-zinc-400">
        Top Rated
    </h1>

    <Dropdown
    title="Filter"
    options={["tv", "movie"]}
    func={(e) => setcategory(e.target.value)}
    />
</div>
<HorizontalCards data={topRated} title = {category}/>
</div>
    </div>
) : (
    <Loader/>
)
}

export default Home