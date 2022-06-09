<template>
  <div :class="userAvatarClasses">
    <router-link :to="linkTo" v-if="link">
      <img
        :src="avatarSource || userAvatarSource"
        :style="userAvatarInlineStyle"
      />
    </router-link>
    <img
      v-else
      :src="avatarSource || userAvatarSource"
      :style="userAvatarInlineStyle"
    />
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import { API_BASE_URL } from '@/app/app.config';
import { mapGetters, mapActions } from 'vuex';
export default defineComponent({
  name: 'UserAvatar',

  /**
   * 属性
   */
  props: {
    user: {
      type: Object,
    },
    sizeType: {
      type: String,
      default: 'small',
    },
    size: {
      type: String,
      default: null,
    },
    link: {
      type: String,
      default: '',
    },
    avatarSource: {
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
      getCurrentUser: 'user/getCurrentUser',
    }),
    userAvatarSource() {
      if (this.user && this.user.avatar) {
        return `${API_BASE_URL}/users/${parseInt(this.user?.id)}/avatar?size=${
          this.sizeType
        }`;
      } else {
        return '/icons/account-black-32px.svg';
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
      let link;
      if (!this.isLoggedIn) {
        link = {
          name: 'login',
        };
      } else if (this.isLoggedIn && this.user) {
        link = {
          name: this.link,
          params: {
            userId: parseInt(this.user?.id),
          },
        };
      } else {
        link = {
          name: 'home',
        };
      }
      console.log(link);
      return link;
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
  methods: {
    ...mapActions({
      getUserById: 'user/show/getUserById',
    }),
  },

  /**
   * 使用组件
   */
  components: {},
});
</script>

<style scoped>
@import '../styles/user-avatar.css';
</style>
