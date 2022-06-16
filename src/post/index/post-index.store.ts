import { StringifiableRecord } from 'query-string';
import { Module } from 'vuex';
import { API_BASE_URL, POSTS_PER_PAGE } from '../../app/app.config';
import { apiHttpClient, queryStringProcess } from '../../app/app.service';
import { RootState } from '../../app/app.store';
import { User } from '../../user/show/user-show.store';

export interface PostListItem {
  id: number;
  title: string;
  content: string;
  user: User;
  totalComments: number;
  totalLikes: number;
  file: {
    id: number;
    width: number;
    height: number;
    orientation: string;
    size: {
      thumbnail: string;
      medium: string;
      large: string;
    };
  };
  tags: [
    {
      id: number;
      name: string;
    },
  ];
}

export interface PostIndexStoreState {
  loading: boolean;
  posts: Array<PostListItem>;
  layout: string;
  totalPages: number;
  nextPage: number;
  queryString: string;
}

export interface GetPostsOptions {
  sort?: string;
}

export const postIndexStoreModule: Module<PostIndexStoreState, RootState> = {
  namespaced: true,

  state: {
    loading: false,
    posts: [],
    layout: '',
    totalPages: 1,
    nextPage: 1,
    queryString: '',
  } as PostIndexStoreState,

  getters: {
    loading(state) {
      return state.loading;
    },

    posts(state) {
      return state.posts.map((post) => {
        let { file } = post;

        if (file) {
          const { id: fileId, width, height } = file;
          const fileBaseUrl = `${API_BASE_URL}/files/${fileId}/serve`;
          const orientation = width > height ? 'horizontal' : 'vertical';

          file = {
            ...file,
            orientation,
            size: {
              thumbnail: `${fileBaseUrl}?size=thumbnail`,
              medium: `${fileBaseUrl}?size=medium`,
              large: `${fileBaseUrl}?size=large`,
            },
          };

          post = {
            ...post,
            file,
          };
          return post;
        }
      });
    },

    layout(state) {
      return state.layout;
    },

    nextPage(state) {
      return state.nextPage;
    },

    totalPages(state) {
      return state.totalPages;
    },

    queryString(state) {
      return state.queryString;
    },
  },

  mutations: {
    setLoading(state, data) {
      state.loading = data;
    },

    setPosts(state, data) {
      state.posts = data;
    },

    setLayout(state, data) {
      state.layout = data;
    },

    setNextPage(state, data) {
      if (data) {
        state.nextPage = data;
      } else {
        state.nextPage++;
      }
    },

    setTotalPages(state, data) {
      state.totalPages = data;
    },

    setQueryString(state, data) {
      state.queryString = data;
    },
  },

  actions: {
    async getPosts({ commit, state, dispatch }, options: GetPostsOptions = {}) {
      const queryString = await dispatch('getPostsPreProcess', options);
      const url = `/posts?page=${state.nextPage}&${queryString}`;
      try {
        const response = await apiHttpClient.get(url);
        dispatch('updatePostProgress', response);

        return response;
      } catch (error) {
        commit('setLoading', false);
        throw error.response;
      }
    },

    getPostsPreProcess({ commit, state }, options: GetPostsOptions) {
      commit('setLoading', true);
      const postsQueryObject: StringifiableRecord = {
        sort: options.sort,
      };
      const postsQueryString = queryStringProcess(postsQueryObject);

      if (state.queryString !== postsQueryString) {
        commit('setNextPage', 1);
      }

      commit('setQueryString', postsQueryString);

      return postsQueryString;
    },

    updatePostProgress({ commit, state }, response) {
      if (state.nextPage === 1) {
        commit('setPosts', response?.data);
      } else {
        commit('setPosts', [...state.posts, ...response.data]);
      }

      const total =
        response?.headers['X-Total-Count'] ||
        response?.headers['x-total-count'];
      console.log(response);
      const totalPages = Math.ceil(parseInt(total, 10) / POSTS_PER_PAGE);
      commit('setTotalPages', totalPages);
      // commit('setNextPage');
      commit('setLoading', false);
    },
  },
};
