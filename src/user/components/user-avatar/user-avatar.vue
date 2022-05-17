<template>
  <div :class="userAvatarClasses">
    <router-link :to="linkTo" v-if="link">
      <img :src="userAvatarSource" :style="userAvatarInlineStyle" />
    </router-link>
    <img v-else :src="userAvatarSource" :style="userAvatarInlineStyle" />
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import { API_BASE_URL } from '@/app/app.config';
import { mapGetters } from 'vuex';
export default defineComponent({
  name: 'UserAvatar',

  /**
   * 属性
   */
  props: {
    user: {
      type: Object,
      default: null,
    },
    sizeType: {
      type: String,
      default: 'small',
    },
    size: {
      type: Number,
      default: null,
    },
    link: {
      type: String,
      default: '',
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
    }),
    userAvatarSource() {
      if (this.user && this.user.avatar) {
        return `${API_BASE_URL}/users/${this.user.id}/avatar?size=${this.sizeType}`;
      } else {
        return 'icons/account-black-32px.svg';
      }
    },
    userAvatarClasses() {
      return [
        'user-avatar',
        this.sizeType,
        { fade: !this.isLoggedIn && !this.user },
      ];
    },
    userAvatarInlineStyle() {
      if (this.size) {
        return `width:${this.size}px;height:${this.size}px;`;
      } else {
        return '';
      }
    },

    linkTo() {
      if (this.link) {
        return `${window.location}/${this.link}`;
      } else {
        return '';
      }
    },
  },

  /**
   * 已创建
   */
  created() {
    //
  },

  /**
   * 组件方法
   */
  methods: {},

  /**
   * 使用组件
   */
  components: {},
});
</script>

<style scoped>
@import '../styles/user-avatar.css';
</style>
