/**
 * @author: Thiago Lima
 * 
 * @description: Generic class which's used to 
 * define its typings. It's being imported in 
 * { StoresDataService }
 * 
 */

interface StoresDataSettings <String> {

    _id: string;
    username: String;
    lastname: String;
    photo: String;
    isAdmin: Boolean;
    hasAttachment: Boolean;

}

export class StoresData implements StoresDataSettings <String> {

    public _id;
    public username;
    public lastname;
    public photo;
    public isAdmin;
    public hasAttachment;

}