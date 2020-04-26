export const getUserId = (user: any): number|string => {
    let userId: number|string;

    if(typeof user['id'] !== 'undefined') {
        userId = user['id'];
    } else {
        userId = 'guest';
    }

    return userId;
}
