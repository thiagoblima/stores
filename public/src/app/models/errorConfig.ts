/**
 * @author: <thiagolimasp@live.com> Thiago Lima
 * @description: Generic interface which's used to
 * define its typings. It's being imported as
 * { ErrorConfig }
 */

export interface ErrorConfig<T, X, Y> {
    success: boolean;
    msg: string;
    err: {
      name: string,
      message: string,
      ok: number,
      errmsg: string,
      code: number,
      codeName: string
    }
  }
