import axios  from "axios";
import { jwtDecode } from "jwt-decode";

 
const refreshToken = async () => {
    try{
     const res = await axios.post("http://localhost:3030/v1/api/user/refesh",{
         withCredentials: true,
     });
     return res.data;
    }catch(err){
     console.log(err);
    }
 }

export const createAxios = (user,dispatch , stateSuccess) =>{
    const newInstance = axios.create();
    newInstance.interceptors.request.use(
        async(config) => {
            let date = new Date();
            const decodeToken = jwtDecode(user?.accessToken)
            if(decodeToken.exp < date.getTime()/1000){
                const data = await refreshToken();
                const refreshUser = {
                    ...user,
                    accessToken: data.accessToken,
                };
                dispatch(stateSuccess(refreshUser));
                config.headers["token"] = data.accessToken;
            }
            return config;
        },
        (err) => {
            return Promise.reject(err);
        }
        );
        return newInstance;
}