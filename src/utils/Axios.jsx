import axios from "axios";

const instance = axios.create({
    baseURL: "https://api.themoviedb.org/3/",
    params: {
    api_key: 'f8faed3563f561b16e0834514593fbcb' // ⚠️ Public API key
    }
})

export default instance;