/**
 * @author: <thiagolimasp@live.com> Thiago Lima
 * @description: Generic class which's used to
 * define its typings. It's being imported in
 * { StoresType }
 */

interface StoresTypeSettings<T> {
  _id: String;
  type: String;
  description: String;
  logo: String;
}

export class StoresType implements StoresTypeSettings<String> {
  public _id;
  public type;
  public description;
  public logo;
}
