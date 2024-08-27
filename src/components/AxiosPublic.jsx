import axios from 'axios';

const axiosPublic=axios.create({
    baseURL:'https://server-assets.vercel.app',
})

export default axiosPublic;