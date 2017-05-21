/**
 * @author: Thiago Lima
 * 
 * @description: Generic class which's used to 
 * define its typings. It's being imported in 
 * { StoresService }
 * 
 */

interface StoresSettings<T, Z> {

    _id: String;
    store_name: String;
    store_image: String;
    store_phone: Number;
    store_country: String;
    store_address: String;
    
}

export class Stores implements StoresSettings<String, Number> {

    public _id;
    public store_name;
    public store_image;
    public store_phone;
    public store_country;
    public store_address;

}