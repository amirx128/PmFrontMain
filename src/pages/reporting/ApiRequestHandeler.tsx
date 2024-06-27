import {  apiReza } from "./ApiCaller"

export function getRequest(route: string) {
    return apiReza.get(route).catch(() => console.error('1111'))

}

// export function postRequest(route: string) {
//     return apiGhobad.post(route).catch(() => console.error('1111'))

// }

// export function GetDataPosts() {
//     return getRequest("posts")
// }

/// api route any 