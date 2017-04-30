/**
 * @author: Thiago Limaall
 * 
 * @description: Generic class which's used to 
 * define its typings. It's being imported in 
 * { UserService }
 * 
 */

interface UserData <T, Z> {

    id: string;
    username: string;
    email: string;
    firstname: string;
    lastname: string;
    age: number;
    
}



export class User implements UserData <String, Number> {
    public id;
    public username;
    public password;
    public email;
    public firstname;
    public lastname;
    public age;
}