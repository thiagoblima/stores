/**
 * @author: Thiago Lima
 * 
 * @description: Generic class which's used to 
 * define its typings. It's being imported in 
 * { StoresDataService }
 * 
 */

interface StoresDataSettings<T> {

    _id: String;
    type: String;
    description: String;
    logo: String;
    
}

export class StoresData implements StoresDataSettings<String> {

    public _id;
    public type;
    public description;
    public logo;

}