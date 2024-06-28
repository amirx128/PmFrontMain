// import axios from "axios"
// import {  apiReza } from "./ApiCaller"

// export  function getRequest(route: string) {
//     return apiReza.get(route).catch(() => console.error('1111')).finally(() => {console.log("object")})

// }

// export function postRequest(url : string) {
  
//     axios.post("http://82.99.252.77:2060/"+url,{
           
//   userName: "string11",
//   password: "string111",
//   captchaId: "string555",
//   captchaValues: "ALI"
//         }).then(res => console.log(res.status)).catch(error => {
//             console.log(error)
//         })

// }

// export function postRequest2(url : string) {
  
//     axios.post("http://82.99.252.77:2060/Definition/GetAllPersons"+url,{
           
//   USERiD: "1",
//         }).then(res => console.log(res.status)).catch(error => {
//             console.log(error)
//         })

// }

// // export function GetDataPosts() {
// //     return getRequest("posts")
// // }

// /// api route any 
import axios from 'axios';
import { apiReza } from './ApiCaller';

export const getRequest = (url) => {
    return apiReza.get(url);
};

export const postRequest = (url, data = {}) => {
    return apiReza.post(url, data);
};
