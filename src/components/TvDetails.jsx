import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { asyncloadtv, removetv } from '../store/actions/TvActions'
import { Link, Outlet, useLocation, useNavigate, useParams } from 'react-router-dom'
import { FaArrowLeft } from "react-icons/fa";
import Loader from './Loader';
import { FaWikipediaW } from "react-icons/fa";
import { TiWorld } from "react-icons/ti";
import { FaExternalLinkAlt } from "react-icons/fa";
import { FaPlay } from "react-icons/fa";
import HorizontalCards from './partials/HorizontalCards';


function TvDetails() {

    const {id} = useParams();
const dispatch = useDispatch()
const navigate = useNavigate()
const {info} = useSelector(((state) => state.tv))
const {pathname} = useLocation()

useEffect(() => {
    dispatch(asyncloadtv(id));
    return () => {
        dispatch(removetv());
    }
},[id])



return info ? (
    <div
        style={{
        background: ` linear-gradient(rgba(0,0,0,0.2),rgba(0,0,0,0.5),rgba(0,0,0,0.8)), url(https://image.tmdb.org/t/p/original/${
            info.detail.backdrop_path 
        })`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat"
        }}
    className='w-screen h-[200vh] px-[10%] relative'>

{/* Part-1 */}
<nav className='w-full text-zinc-100 h-[10vh] text-zinc-100 flex items-center gap-10 text-xl'>
<Link onClick={() => navigate(-1)} className='hover:text-[#6556CD]'><FaArrowLeft /></Link>

<a className='hover:text-[#6556CD] text-md' target='_blank' href={info.detail.homepage} ><FaExternalLinkAlt /></a>
<a className='hover:text-[#6556CD] text-2xl' target='_blank' href={`https://www.wikidata.org/wiki/${info.externalid.wikidata_id}/`}><TiWorld /></a>
<a className='hover:text-[#6556CD]' target='_blank' href={`https://www.imdb.com/title/${info.externalid_imdb_id}/`}>imdb</a>

</nav>

{/* Part-2 */}
<div className='w-full flex '>
<div className='w-full'>
<img
        className="shadow-[8px_17px_38px_2px_rgba(0,0,0,.5)] h-[50vh] object-cover"
        src={`https://image.tmdb.org/t/p/original/${
        info.detail.poster_path || info.detail.backdrop_path}`}
        alt=""
/>
<div className='   mt-10'>
{info.watchprovides &&
info.watchprovides.flatrate &&
    <div className='mb-5  gap-x-10 items-center text-white '> 
        <h1 className='font-bold'>Availabe on Platforms</h1>
    <div className='flex gap-5 mt-2'>
    {info.watchprovides.flatrate.map((w,i) => (
        <img 
        title={w.provider_name}
        key={i} className='w-[5vh] h-[5vh] object-cover rounded-md  '
        src={`https://image.tmdb.org/t/p/original/${w.logo_path}`}
        alt=""
/>
))}
</div>
    </div>}
{info.watchprovides &&
info.watchprovides.rent &&
    <div className=' gap-x-10 items-center text-white mb-5'> 
        <h1 className='font-bold'>Availabe on Rent</h1>
            <div className='flex gap-5 mt-2'>
    {info.watchprovides.rent.map((w,i) => (
        <img 
        title={w.provider_name}
        key={i} className='w-[5vh] h-[5vh] object-cover rounded-md  '
        src={`https://image.tmdb.org/t/p/original/${w.logo_path}`}
        alt=""
/>
))}
</div>
    </div>}
{info.watchprovides && info.watchprovides.buy &&
    <div className=' gap-x-10 items-center text-white mb-5'> 
            <h1 className='font-bold'>Availabe to Buy</h1>
        <div className='flex gap-5 mt-2'>
    {info.watchprovides.buy.map((w,i) => (
        <img 
        title={w.provider_name}
        key={i} className='w-[5vh] h-[5vh] object-cover rounded-md  '
        src={`https://image.tmdb.org/t/p/original/${w.logo_path}`}
        alt=""
/>
))}
</div>
    </div>}

</div>


</div>
<div className='contact ml-[5%] text-white' >

<h1 className='text-5xl font-black text-white'>        
    {info.detail.name ||
    info.detail.title ||
    info.detail.original_name ||
    info.detail.original_title ||
    info.detail.profile_path}
    <small className='text-2xl font-bold text-white' >({info.detail.first_air_date.split("-")[0]})</small>
</h1>
<div className='flex text-zinc-100 gap-x-5 items-center gap-y-10 mt-3 mb-5'>
    <span className="rounded-full text-xl font-semibold bg-yellow-600 text-white w-[5vh] h-[5vh] flex justify-center items-center">
      {(info.detail.vote_average * 10).toFixed()} <sup>%</sup>
    </span>
    <h1 className='font-semibold text-2xl w-[60px] leading-6'>User Score</h1>
    <h1>{info.detail.release_date}</h1>
    <h1>{info.detail.genres.map((g) => (g.name)).join(", ")}</h1>
    <h1>{info.detail.runtime} min</h1>
</div>
<h1 className='text-2xl font-semibold italic text-zinc-200 mb-8 mt-8'>{info.detail.tagline}</h1>
<h1 className='mt-5 text-xl font-bold'>Overview</h1>
<p>{info.detail.overview}</p>
<h1 className=' mt-8 text-2xl'> Tv Translated </h1>
<p className='mb-8'>{info.translations.join(" , ")}</p>
    <Link to={`${pathname}/trailer`} className="bg-[#6556CD] p-3 rounded hover:bg-[#4B3FA1] flex items-center gap-3 w-33"> <FaPlay /> Play Trailer</Link>

</div>
</div>

{/* Part-3 */}
<hr className='text-white mt-10 mb-5 h-[1px] bg-zinc-500' />
<h1 className='text-2xl font-semibold text-white' >Seasons</h1>
<div className='w-[100%] flex  overflow-y-hidden mb-5 p-5 ' >
    {info.detail.seasons.length > 0 ? info.detail.seasons.map((s,i) => (
        <div className='w-[15vh] mr-[8.5%]'>
        <img
            className="shadow-[8px_17px_38px_2px_rgba(0,0,0,.5)] h-[30vh] object-cover min-w-[14vw] h-[30vh]"
            src={`https://image.tmdb.org/t/p/original/${s.poster_path}`} alt=""/>
                <h1 className="text-2xl text-zinc-300 mt-3 font-semibold ">
            {s.name }
        </h1>
        </div>
    )) : <h1 className='text-2xl font-black'>Nothing To Show</h1> }


</div>

{/* Part-4 */}
<hr className='text-white mt-10 mb-5 h-[1px] bg-zinc-500' />
<h1 className='text-2xl font-semibold text-white' >Recommendations & Similar Stuffs</h1>
<HorizontalCards data={
    info.recommendations.length > 0 ?
    info.recommendations :
    info.similar}
        title = {`/tv`}
    />
<Outlet/>
    </div>
) : <Loader/>;
}

export default TvDetails