import { RouteRecordRaw } from 'vue-router';
import userShow from './show/user-show.vue';
import userLiked from '@/user/show/components/user-liked.vue';
import userPosts from '@/user/show/components/user-posts.vue';
import userReplies from '@/user/show/components/user-replies.vue';
import userComments from '@/user/show/components/user-comments.vue';

/**
 * 定义路由
 */
const routes: Array<RouteRecordRaw> = [
  {
    name: 'userShow',
    path: '/user/:userId',
    component: userShow,
    props: true,
    children: [
      {
        name: 'userLiked',
        path: 'liked',
        component: userLiked,
      },
      {
        name: 'userPosts',
        path: 'posts',
        component: userPosts,
      },
      {
        name: 'userReplies',
        path: 'replies',
        component: userReplies,
      },
      {
        name: 'userComments',
        path: 'comments',
        component: userComments,
      },
    ],
  },
];

/**
 * 默认导出
 */
export default routes;
