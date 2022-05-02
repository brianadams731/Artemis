import { generateHashedPasswordAsync } from "../utils/passwordHash";

interface IUser{
    email?:string,
    password?:string,
    username?:string
}
const parseUserRegisterAsync = async(request:any):Promise<IUser> =>{
    let user:IUser = {};
    user.email = request.email;
    user.password = await generateHashedPasswordAsync(request.password);
    user.username = request.username;
    return user;
}


export {parseUserRegisterAsync, IUser}