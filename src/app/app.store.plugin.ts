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
        if (!mutation.payload) {
          setStorages('spv-token', '');
          setStorages('spv-uid', '');
        } else {
          setStorages('spv-token', mutation.payload.token);
          setStorages('spv-uid', mutation.payload.id);
        }

        break;
      case 'post/index/setLayout':
        setStorages('spv-post-list-layout', mutation.payload);
        break;
    }
  });
};
