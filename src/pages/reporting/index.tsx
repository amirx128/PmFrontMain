import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {getRequest,postRequest} from './ApiRequestHandeler'
import { idID } from '@mui/material/locale';
import { Value } from '../product-details/style';

export default function index() {

    const [value, setValue] = useState([]);
    const [isLoading, SetIsLoading] = useState(true);

    useEffect(() => {

        // getRequest("AccountCountroller/testGet")


        // getRequest("AccountCountroller/testGet2?input2=11")

        //     .then((response) => {
        //         SetIsLoading(false)
        //         setValue(response.data)
        //     })
    })


    const handelSubmit = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault()

        getRequest("AccountCountroller/testGet2?input2=11")

            .then((response) => {
                SetIsLoading(false)
                setValue(response.data)
            })

            


    }

    const handelSubmit2 = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault()

        postRequest("AccountCountroller/Login")


    }

    return (
        <div>
        <form onSubmit={handelSubmit} >
                         
                        <button type='submit'>submit</button>
                    </form> 
          
<form onSubmit={handelSubmit2} >
                 
                 <button type='submit'>submit2</button>
             </form> 
                   
            {
            value.map(( v, index ) => {
          return (
            <tr key={index} style={{border: 150}}>
              <td>{v.id}</td>
              <td>{v.firstName}</td>
              <td> rols :  {
                
                v.usersRoles.map(( r, ir ) => {
                    return (
                      <tr key={index}>
                        <td>{r.id}</td>
                        <td>{r.roleName}</td>
                        <td>{r.roleTitle}</td>
                      </tr>
                    );
                  })}
<tr>....</tr>
                </td>
            </tr>
          );
        })
    }
            <h2>salam.....</h2>

          

            { isLoading && <h2>loading...</h2> }
    {
        value.map(v => (

            <h2 key={v.id}  >


                {v.usersRoles[0].roleTitle}



                iiiiii
                {v.firstName} -
                {v.lastName}
            </h2>))
    }
        </div >
    )
}

