/**
 * @author: Thiago Lima
 * 
 * @description: Generic class which's used to 
 * define its typings. It's being imported in 
 * { StoresDataService }
 * 
 */

interface StoresDataSettings<T> {

    id: String;
    name: String;
    state: String;
    description: String;
    
}

export class StoresData implements StoresDataSettings<String> {

    public id;
    public name;
    public state;
    public description;

}