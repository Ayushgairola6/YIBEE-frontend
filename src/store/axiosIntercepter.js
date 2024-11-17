import axios from "axios";
import store from "./store"
import { logout } from "./AuthSlice";

export const setUpAxiosInterCeptors=()=>{
    axios.interceptors.response.use((response)=>{
        response,(error)=> {
            if(error.response && error.response.staus === 401){
                localStorage.removeItem("token");
                store.dispatch(logout())
            }
        }
    })
}