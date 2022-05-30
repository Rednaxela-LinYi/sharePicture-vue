import { Module } from 'vuex';
import { RootState } from '@/app/app.store';
import { apiHttpClient } from '@/app/app.service';
import { API_BASE_URL } from '@/app/app.config';

export interface UserAccountStoreState {
  loading: boolean;
  name: string;
  avatarSource: string;
}

export const userAccountStoreModule: Module<UserAccountStoreState, RootState> =
  {
    /**
     * 命名空间
     */
    namespaced: true,

    /**
     * 数据
     */
    state: {
      loading: false,
      avatarSource: '',
      name: '',
    } as UserAccountStoreState,

    /**
     * 获取器
     */
    getters: {
      getLoading(state) {
        return state.loading;
      },
      getAvatarSource(state) {
        return state.avatarSource;
      },
      getUsername(state) {
        return state.name;
      },
    },

    /**
     * 修改器
     */
    mutations: {
      setLoading(state, data) {
        state.loading = data;
      },
      setAvatarSource(state, data) {
        state.avatarSource = data;
      },
      setUsername(state, data) {
        state.name = data;
      },
    },

    /**
     * 动作
     */
    actions: {
      async postAvatar({ commit, dispatch }, data) {
        console.log('file', data?.file);
        commit('setLoading', true);
        const formData = new FormData();
        formData.append('avatar', data?.file);
        const url = `${API_BASE_URL}/avatar`;
        try {
          const response = await apiHttpClient.post(url, formData);
          commit('setLoading', false);
          // dispatch('user/updateCurrentUserById', data.userId, { root: true });
          const fileReader = new FileReader();
          fileReader.readAsDataURL(data.file);
          fileReader.onload = (event) => {
            commit('setAvatarSource', event?.target?.result);
          };
          return response;
        } catch (err) {
          commit('setLoading', false);
          throw err.response;
        }
      },

      async updateUserAccount({ commit, dispatch }, data) {
        commit('setLoading', true);
        const url = `${API_BASE_URL}/users`;
        try {
          const response = await apiHttpClient.patch(url, data.body);
          dispatch('user/updateCurrentUserById', data.userId, { root: true });
          commit('setLoading', false);
          console.log('1111', response);
          return response;
        } catch (err) {
          commit('setLoading', false);
          throw err.response;
        }
      },
    },
  };
