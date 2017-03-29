/**
 * @author: Thiago Lima
 * 
 * @description: Generic class which's used to 
 * define its typings. It's being imported in 
 * { StoresDataService }
 * 
 */

export class StoresData <String> {
    private _id: string;
    private username: String;
    private lastname: String;
    private photo: String;
    private isAdmin: Boolean;
    private hasAttachment: Boolean;
}