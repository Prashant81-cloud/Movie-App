export {removetv} from '../reducers/TvSlice'
import {loadtv} from '../reducers/TvSlice'
import Axios from '../../utils/Axios'

export const asyncloadtv = (id) => async (dispatch, getState) => {

try {
    const detail = await Axios.get(`/tv/${id}`);
    const externalid = await Axios.get(`/tv/${id}/external_ids`);
    const recommendations = await Axios.get(`/tv/${id}/recommendations`);
    const similar = await Axios.get(`/tv/${id}/similar`);
    const translations = await Axios.get(`/tv/${id}/translations`);
    const videos = await Axios.get(`/tv/${id}/videos`);
    const watchprovides = await Axios.get(`/tv/${id}/watch/providers`);

let theultimatedetails = {
    detail: detail.data,
    externalid: externalid.data,
    recommendations: recommendations.data.results,
    similar: similar.data.results,
    translations: translations.data.translations.map((t) => t.name),
    videos: videos.data.results.find((m) => m.type === 'Trailer'),
    watchprovides: watchprovides.data.results.IN,
};

dispatch(loadtv(theultimatedetails))
console.log(theultimatedetails)
} catch (error) {
    console.log(error)
}


} 