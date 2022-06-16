import { NavigationGuardNext, RouteLocationNormalized } from 'vue-router';
import appStore from './app.store';

export const appToolbarGuard = (
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext,
) => {
  let isShowToolbar = false;
  switch (to.name) {
    case 'home':
    case 'postIndex':
    case 'postIndexPopular':
      isShowToolbar = true;
      break;
  }
  appStore.commit('toolbar/setIsShow', isShowToolbar);
  next();
};
