<template>
  <div class="user-show">
    <div class="header">
      <div class="item">
        <UserAvatar
          size="128"
          :user="visitedUser"
          :avatarSource="avatarSource"
        ></UserAvatar>
      </div>
      <div class="item">
        <UserName :user="visitedUser"></UserName>
      </div>
    </div>
    <div class="content-tab">
      <UserShowMenu :user="visitedUser"></UserShowMenu>
    </div>
    <div class="content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import { mapGetters, mapActions } from 'vuex';
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

  watch: {
    userId() {
      console.log('change');
      this.getUserById(this.userId);
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
      visitedUser: 'user/show/getUser',
      currentUser: 'user/getCurrentUser',
      avatarSource: 'user/account/getAvatarSource',
    }),
  },

  /**
   * 已创建
   */
  created() {
    console.log('show page ', this.userId);
    this.getUserById(this.userId);
  },

  unmounted() {
    console.log('show销毁');
  },
  /**
   * 组件方法
   */
  methods: {
    ...mapActions({
      getUserById: 'user/show/getUserById',
    }),
  },

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
