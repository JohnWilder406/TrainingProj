import React, {useState} from 'react';
import {LoginContext} from '../context/context'


const Wrapper = (props) => {
    const {children} = props;
    const [id, setId] = useState();

    return (
            <LoginContext.Provider value={{id, setId}}>
            {children}
            </LoginContext.Provider>
    )
}

export default Wrapper