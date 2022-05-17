import { Module } from 'vuex';
import { RootState } from '@/app/app.store';
import { apiHttpClient } from '@/app/app.service';
import { API_BASE_URL } from '@/app/app.config';

export interface LoginResponseData {
  id: number;
  name: string;
  token: string;
}

export interface AuthLoginStoreState {
  loading: boolean;
  loginResponseData: LoginResponseData | null;
}

export const authLoginStoreModule: Module<AuthLoginStoreState, RootState> = {
  /**
   * 命名空间
   */
  namespaced: true,

  /**
   * 数据
   */
  state: {
    loading: false,
    loginResponseData: null,
  } as AuthLoginStoreState,

  /**
   * 获取器
   */
  getters: {
    loading(state) {
      return state.loading;
    },

    responseData(state) {
      return state.loginResponseData;
    },
  },

  /**
   * 修改器
   */
  mutations: {
    setLoading(state, data) {
      state.loading = data;
    },

    setResponseData(state, data) {
      state.loginResponseData = data;
    },
  },

  /**
   * 动作
   */
  actions: {
    async login({ commit, dispatch }, data) {
      const url = `${API_BASE_URL}/login`;
      commit('setLoading', true);
      console.log(url);
      try {
        const response = await apiHttpClient.post(url, data);
        commit('setResponseData', response.data);
        commit('setLoading', false);
        commit('auth/setToken', response.data.token, { root: true });
        dispatch('auth/configApiHttpClientAuthHeader', response.data.token, {
          root: true,
        });
        dispatch('user/updateCurrentUserById', response.data.id, {
          root: true,
        });
        return response;
      } catch (error) {
        commit('setLoading', false);

        throw error.response;
      }
    },
  },
};
