export {removeperson} from '../reducers/PersonSlice'
import {loadperson} from '../reducers/PersonSlice'
import Axios from '../../utils/Axios'

export const asyncloadperson = (id) => async (dispatch, getState) => {

try {
    const detail = await Axios.get(`/person/${id}`);
    const externalid = await Axios.get(`/person/${id}/external_ids`);
    const combinedCredits = await Axios.get(`/person/${id}/combined_credits`);
    const tvCredits = await Axios.get(`/person/${id}/tv_credits`);
    const movieCredits = await Axios.get(`/person/${id}/movie_credits`);


let theultimatedetails = {
    detail: detail.data,
    externalid: externalid.data,
    combinedCredits: combinedCredits.data,
    movieCredits: movieCredits.data,
    tvCredits: tvCredits.data,
};

dispatch(loadperson(theultimatedetails))

} catch (error) {
    console.log(error)
}


} 