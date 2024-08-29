import axios from 'axios';

const axiosPublic=axios.create({
    // baseURL:'https://server-assets.vercel.app',
    baseURL:'http://localhost:9000'
})

export default axiosPublic;