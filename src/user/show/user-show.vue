<template>
  <div class="user-show">
    <div class="header">
      <div class="item">
        <UserAvatar size="128" :user="currentUser"></UserAvatar>
      </div>
      <div class="item">
        <UserName :user="currentUser"></UserName>
      </div>
    </div>
    <div class="content-tab">
      <UserShowMenu></UserShowMenu>
    </div>
    <div class="content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import { mapGetters } from 'vuex';
import UserAvatar from '@/user/components/user-avatar/user-avatar.vue';
import UserName from '@/user/components/user-name/user-name.vue';
import UserShowMenu from '@/user/show/components/user-show-menu.vue';
export default defineComponent({
  name: 'UserShow',

  /**
   * 属性
   */
  props: {
    userId: {
      type: String,
    },
  },

  /**
   * 数据
   */
  data() {
    return {};
  },

  /**
   * 计算属性
   */
  computed: {
    ...mapGetters({
      isLoggedIn: 'auth/isLoggedIn',
      currentUser: 'user/getCurrentUser',
    }),
  },

  /**
   * 已创建
   */
  created() {
    // if (!this.isLoggedIn || this.getCurrentUser?.id !== this.userId) {
    //   this.$router.back();
    // }
  },

  /**
   * 组件方法
   */
  methods: {},

  /**
   * 使用组件
   */
  components: {
    UserAvatar,
    UserName,
    UserShowMenu,
  },
});
</script>

<style scoped>
@import './styles/user-show.css';
</style>
