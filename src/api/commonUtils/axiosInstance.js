import axios from "axios";


const processENV = import.meta.env.VITE_BASE_URL;
console.log("processEnv===>",processENV);
const axiosInstance = axios.create({
    baseURL :  processENV,
    headers : {
        "Content-type":"application/json"
    }
}   
)

axiosInstance.interceptors.request.use(

    (config) => {
        console.log("request was sent", config);
        return config;
    },
    (error) =>{
        console.log("error in sending  request ", error);
        return Promise.reject(error);
    }

)

axiosInstance.interceptors.response.use(
    (response) =>{
        console.log("recive the response",response );
        return response;
    },
    (error) =>{
        console.log("error in reciving response", error);
        return Promise.reject(error);
    }
)

export default axiosInstance