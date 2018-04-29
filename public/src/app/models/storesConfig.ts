/**
 * @author: <thiagolimasp@live.com> Thiago Lima
 * @description: Generic interface which's used to
 * define its typings. It's being imported as
 * { StoresConfig }
 */

import { User } from './index';
import { Store } from './index';

export interface StoresConfig <T, X, Y, Z> {
    stores: Store[];
    store: Store;
    model: Object;
    loading: boolean;
    error: string;
    storeHeader: { title: string };
    getCurrentUser(): User;
    getShow(): boolean;
    getMessage(): string;
  }
