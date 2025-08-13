export {removemovie} from '../reducers/MovieSlice'
import {loadmovie} from '../reducers/MovieSlice'
import Axios from '../../utils/Axios'

export const asyncloadmovie = (id) => async (dispatch, getState) => {

try {
    const detail = await Axios.get(`/movie/${id}`);
    const externalid = await Axios.get(`/movie/${id}/external_ids`);
    const recommendations = await Axios.get(`/movie/${id}/recommendations`);
    const similar = await Axios.get(`/movie/${id}/similar`);
    const translations = await Axios.get(`/movie/${id}/translations`);
    const videos = await Axios.get(`/movie/${id}/videos`);
    const watchprovides = await Axios.get(`/movie/${id}/watch/providers`);

let theultimatedetails = {
    detail: detail.data,
    externalid: externalid.data,
    recommendations: recommendations.data.results,
    similar: similar.data.results,
    translations: translations.data.translations.map((t) => t.name),
    videos: videos.data.results.find((m) => m.type === 'Trailer'),
    watchprovides: watchprovides.data.results.IN,
};

dispatch(loadmovie(theultimatedetails))
console.log(theultimatedetails)
} catch (error) {
    console.log(error)
}


} 