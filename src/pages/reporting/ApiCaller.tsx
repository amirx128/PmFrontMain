import axios from "axios"
import create from "axios"

export const apiReza = axios.create({
    baseURL: "http://82.99.252.77:2060/",
})



// export const apiGhobad = axios.create({
//     baseURL: "http://82.99.252.77:2060/",
// })


// export const reza = axios({
//     method: 'post',
//     url: 'http://82.99.252.77:2060/account/login',
//     headers: {},
//     data: {
//         foo: 'bar', // This is the body part
//     }
// });