import { Module } from 'vuex';
import { RootState } from '@/app/app.store';
import {
  User,
  userShowStoreModule,
  UserShowStoreState,
} from './show/user-show.store';
import {
  userAccountStoreModule,
  UserAccountStoreState,
} from './show/account/user-account.store';
export interface UserStoreState {
  currentUser: User | null;
  show: UserShowStoreState;
  account: UserAccountStoreState;
}

export const userStoreModule: Module<UserStoreState, RootState> = {
  /**
   * 命名空间
   */
  namespaced: true,

  /**
   * 数据
   */
  state: {
    currentUser: null,
  } as UserStoreState,

  /**
   * 获取器
   */
  getters: {
    getCurrentUser(state) {
      return state.currentUser;
    },
  },

  /**
   * 修改器
   */
  mutations: {
    setCurrentUser(state, data) {
      state.currentUser = data;
    },
  },

  /**
   * 动作
   */
  actions: {
    async updateCurrentUserById({ commit, dispatch }, data) {
      const response = await dispatch('user/show/getUserById', data, {
        root: true,
      });
      commit('setCurrentUser', response.data);
      return response;
    },
  },

  modules: {
    show: userShowStoreModule,
    account: userAccountStoreModule,
  },
};
