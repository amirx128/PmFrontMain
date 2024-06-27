import axios from "axios"
import {  apiReza } from "./ApiCaller"

export  function getRequest(route: string) {
    return apiReza.get(route).catch(() => console.error('1111')).finally(() => {console.log("object")})

}

export function postRequest(url : string) {
  
    axios.post("http://82.99.252.77:2060/"+url,{
           
  userName: "string",
  password: "string",
  captchaId: "string",
  captchaValues: "string"
        }).then(res => console.log(res.status)).catch(error => {
            console.log(error)
        })

}

// export function GetDataPosts() {
//     return getRequest("posts")
// }

/// api route any 