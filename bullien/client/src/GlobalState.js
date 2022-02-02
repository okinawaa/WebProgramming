import React, {createContext, } from 'react'

export const GlobalState = createContext()


export const DataProvider = ({children}) =>{



    const state = {
    }

    return (
        <GlobalState.Provider value={state}>
            {children}
        </GlobalState.Provider>
    )
}