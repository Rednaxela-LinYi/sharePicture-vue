import { Module } from 'vuex';
import { RootState } from '@/app/app.store';

export interface ToolbarStoreState {
  isShow: boolean;
}

export const toolbarStoreModule: Module<ToolbarStoreState, RootState> = {
  /**
   * 命名空间
   */
  namespaced: true,

  /**
   * 数据
   */
  state: {
    isShow: false,
  } as ToolbarStoreState,

  /**
   * 获取器
   */
  getters: {
    isShow(state) {
      return state.isShow;
    },
  },

  /**
   * 修改器
   */
  mutations: {
    setIsShow(state, data) {
      state.isShow = data;
    },
  },

  /**
   * 动作
   */
  actions: {},
};
