import { createRouter, createWebHistory } from 'vue-router';
import appRoutes from './app.routes';
import postRoutes from '@/post/post.routes';
import authRoutes from '@/auth/auth.routes';
import userRoutes from '@/user/user.routes';
import { appToolbarGuard } from './app.router.guard';

/**
 * 创建路由器
 */
const router = createRouter({
  history: createWebHistory(),
  routes: [...appRoutes, ...postRoutes, ...authRoutes, ...userRoutes],
});

router.beforeEach(appToolbarGuard);
/**
 * 默认导出
 */
export default router;
