<template>
  <div class="app-sidebar-item avatar">
    <UserAvatar
      sizeType="medium"
      :link="userAvatarLink"
      :avatarSource="avatarSource"
      :user="currentUser"
      @click="toggleUserMenuDisplayStatus"
    ></UserAvatar>
    <transition name="user-menu">
      <UserMenu
        @close="closeUserMenu"
        v-if="isUserMenuShow"
        class="user-menu"
      ></UserMenu>
    </transition>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import { mapGetters } from 'vuex';
import UserAvatar from '@/user/components/user-avatar/user-avatar.vue';
import UserMenu from '@/user/components/user-menu.vue';
export default defineComponent({
  name: 'AppSidebarItemAvatar',
  props: {},
  data() {
    return {
      isUserMenuShow: false,
    };
  },
  computed: {
    ...mapGetters({
      currentUser: 'user/getCurrentUser',
      avatarSource: 'user/account/getAvatarSource',
    }),
    userAvatarLink() {
      return this.currentUser ? null : 'login';
    },
  },

  /**
   * 已创建
   */
  created() {
    document.addEventListener('keyup', this.closeUserMenuByKeyBoard);
  },

  unmounted() {
    document.removeEventListener('keyup', this.closeUserMenuByKeyBoard);
  },
  /**
   * 组件方法
   */
  methods: {
    toggleUserMenuDisplayStatus() {
      if (this.currentUser?.id) {
        this.isUserMenuShow = !this.isUserMenuShow;
      } else {
        this.isUserMenuShow = false;
      }
    },

    closeUserMenu() {
      this.isUserMenuShow = false;
    },

    closeUserMenuByKeyBoard(event) {
      if (event.key === 'Escape') {
        this.closeUserMenu();
      }
    },
  },

  /**
   * 使用组件
   */
  components: {
    UserAvatar,
    UserMenu,
  },
});
</script>

<style scoped>
@import './styles/app-sidebar-item-avatar.css';
</style>
