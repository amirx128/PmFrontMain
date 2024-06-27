import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { getRequest } from './ApiRequestHandeler'
import { reza } from './ApiCaller'
import { GetDataPosts } from './ApiRequestHandeler'
import { idID } from '@mui/material/locale';

export default function index() {

    const [value, setValue] = useState([]);
    const [isLoading, SetIsLoading] = useState(true);

    useEffect(() => {

        // getRequest("AccountCountroller/testGet")

      
        getRequest("AccountCountroller/testGet2?input2=11")

            .then((response) => {
                SetIsLoading(false)
                setValue(response.data)
            })
    })

    return (
        <div>
            <h2>salam</h2>

            {isLoading && <h2>loading...</h2>}
            {
                value.map(v => (

                    <h2 key={v.id}  >
                       
                       
                        {v.usersRoles[0].roleTitle} 
                        
                        
                        
                        iiiiii
                        {v.firstName} - 
                        {v.lastName}
                    </h2>))
            }
        </div>
    )
}

