import { Plugin } from 'vuex';
import { RootState } from './app.store';
import { setStorages } from '@/app/app.service';
export const localStorageStorePlugin: Plugin<RootState> = (store) => {
  store.subscribe((mutation) => {
    switch (mutation.type) {
      case 'layout/setTheme':
        setStorages('theme', mutation.payload);
        break;
      case 'auth/login/setResponseData':
        setStorages('spv-token', mutation.payload.token);
        break;
    }
  });
};
