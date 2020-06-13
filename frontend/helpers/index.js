export const getJwt = () => {
    return 'bearer ' + localStorage.getItem('jwt');
}
