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
    name: String;
    state: String
    description: String
}

export class StoresData implements StoresDataSettings<String> {

    public _id;
    public name;
    public state;
    public description;

}