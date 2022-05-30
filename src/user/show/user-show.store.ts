import { Module } from 'vuex';
import { RootState } from '@/app/app.store';
import { API_BASE_URL } from '@/app/app.config';
import { apiHttpClient } from '../../app/app.service';

export interface User {
  id: number;
  name: string;
  avatarId: number;
}

export interface UserAvatar {
  source: string;
  size: string;
  link: string;
}

export interface UserShowStoreState {
  loading: boolean;
  user: User | null;
}

export const userShowStoreModule: Module<UserShowStoreState, RootState> = {
  /**
   * 命名空间
   */
  namespaced: true,

  /**
   * 数据
   */
  state: {
    loading: false,
    user: null,
  } as UserShowStoreState,

  /**
   * 获取器
   */
  getters: {
    getUser(state) {
      return state.user;
    },
  },

  /**
   * 修改器
   */
  mutations: {
    setLoading(state, data) {
      state.loading = data;
    },
    setUser(state, data) {
      state.user = data;
    },
  },

  /**
   * 动作
   */
  actions: {
    async getUserById({ commit }, data) {
      commit('setLoading', true);
      const url = `${API_BASE_URL}/users/${data}`;
      try {
        const response = await apiHttpClient.get(url);
        commit('setUser', response.data);
        commit('setLoading', false);
        return response;
      } catch (err) {
        commit('setLoading', false);
      }
    },
  },
};
