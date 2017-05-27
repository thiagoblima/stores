/**
 * @author: Thiago Limaall
 * 
 * @description: Generic class which's used to 
 * define its typings. It's being imported in 
 * { UserService }
 * 
 */

interface UserData <T, Z> {

    _id: string;
    username: string;
    password: string;
    email: string;
    firstname: string;
    lastname: string;
    age: number;
    file: string;
    
}

export class User implements UserData <String, Number> {
    public _id;
    public username;
    public password;
    public email;
    public firstname;
    public lastname;
    public age;
    public file;
}