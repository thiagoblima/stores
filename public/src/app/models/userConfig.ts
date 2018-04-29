/**
 * @author: <thiagolimasp@live.com> Thiago Lima
 * @description: Generic interface which's used to
 * define its typings. It's being imported as
 * { UserConfig }
 */

export interface UserConfig<T, X, Y, Z> {
    users: Array<{}>;
    getCurrentUser(): Object;
    getMessage(): string;
    getShow(): boolean;
}
