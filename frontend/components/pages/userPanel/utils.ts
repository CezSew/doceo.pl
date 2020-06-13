import axios from "axios";
import { getJwt } from '../../../helpers';

export const getUserTests = (userID, host) => {
    axios.post(`${host}/api/user-tests`, {
            userId: userID
        },
        { headers: { Authorization: getJwt() } }
    ).then(res => {
        console.log(res)
    }).catch(e => {
        console.log(e)
    })
}
