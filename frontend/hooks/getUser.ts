import axios from "axios";
import { getJwt } from '../helpers';
import { useState, useEffect } from 'react';

export const useGetUser = (props) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        console.log('try get user from server')
        console.log(props)

    }, [])


    return user;
}
