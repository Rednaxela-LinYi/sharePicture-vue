import { createStore } from 'vuex';
import { postStoreModule, PostStoreState } from '../post/post.store';
import {
  layoutStoreModule,
  LayoutStoreState,
} from '@/app/components/layout/layout.store';
import { localStorageStorePlugin } from '@/app/app.store.plugin';
import { authStoreModule, AuthStoreState } from '../auth/auth.store';
import {
  appNotificationStoreModule,
  AppNotificationStoreState,
} from './components/notification/app-notification.store';
export interface RootState {
  appName: string;
  post: PostStoreState;
  layout: LayoutStoreState;
  auth: AuthStoreState;
  notification: AppNotificationStoreState;
}

/**
 * 创建 Store
 */
const store = createStore({
  state: {
    appName: '宁皓网',
  } as RootState,

  modules: {
    post: postStoreModule,
    layout: layoutStoreModule,
    auth: authStoreModule,
    notification: appNotificationStoreModule,
  },
  plugins: [localStorageStorePlugin],
});

/**
 * 默认导出
 */
export default store;
