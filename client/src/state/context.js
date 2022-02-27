import React, {createContext, useState} from 'react'

export const TContext=createContext();



export const TProvider=(props)=>{
    const[lokacija,SetLokacija]=useState({
        x:20.6011428833,
        y:44.6703948975
    })
    const[loginToken,setLoginToken]=useState(false)
    const[user,setUser]=useState({id:'',name:''})
    
    return(                                                  
        <TContext.Provider value={{
            lokacija:[lokacija,SetLokacija],
            loginToken:[loginToken,setLoginToken],
            user:[user,setUser],
         }}>
            {props.children}
        </TContext.Provider>
    )
}