export default function(authorization){

    const token = authorization.split('Bearer')[1].trim();
    return token;

};