<template>
  <div class="user-menu">
    <CloseButton @close="$emit('close')"></CloseButton>
    <div class="user-menu-header">
      <UserName :user="currentUser"></UserName>
    </div>
    <div class="user-menu-item">
      <div
        class="group"
        v-for="(group, groupIndex) in menuItems"
        :key="groupIndex"
      >
        <div class="item" v-for="(item, itemIndex) in group" :key="itemIndex">
          <router-link class="link" :to="item.link" v-if="currentUser">
            <span>{{ item.text }}</span>
          </router-link>
        </div>
      </div>
    </div>
    <div class="user-menu-footer">
      <button @click="onClickLogoutButton" class="button block">
        退出登录
      </button>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import { mapGetters, mapActions } from 'vuex';
import UserName from '@/user/components/user-name/user-name.vue';
import CloseButton from '@/app/components/close-button.vue';

export default defineComponent({
  name: 'UserMenu',

  /**
   * 属性
   */
  props: {},

  /**
   * 数据
   */
  data() {
    return {
      menuItems: [
        [
          {
            link: {
              name: 'userPosts',
              params: {
                userId: this.currentUser?.id,
              },
            },
            text: '作品',
          },
          {
            link: {
              name: 'userComments',
              params: {
                userId: this.currentUser?.id,
              },
            },
            text: '评论',
          },
        ],
        [
          {
            link: {
              name: 'userAccount',
              params: {
                userId: this.currentUser?.id,
              },
            },
            text: '账户',
          },
        ],
      ],
    };
  },

  /**
   * 计算属性
   */
  computed: {
    ...mapGetters({
      currentUser: 'user/getCurrentUser',
    }),
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
      logout: 'auth/logout',
    }),

    onClickLogoutButton() {
      this.$emit('close');
      this.logout();
    },
  },

  emits: ['close'],
  /**
   * 使用组件
   */
  components: {
    CloseButton,
    UserName,
  },
});
</script>

<style scoped>
@import './styles/user-menu.css';
</style>
