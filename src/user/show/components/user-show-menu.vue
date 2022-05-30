<template>
  <div class="user-show-menu">
    <div
      class="user-show-menu-item"
      v-for="(item, index) in menuItems"
      :key="index"
    >
      <router-link v-if="isOwner(item)" class="link" :to="item.linkTo">
        {{ item.text }}
      </router-link>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import { mapGetters } from 'vuex';
export default defineComponent({
  name: 'UserShowMenu',

  /**
   * 属性
   */
  props: {
    user: {
      type: Object,
    },
  },

  /**
   * 数据
   */
  data() {
    return {
      menuItems: [
        {
          linkTo: {
            name: 'userPosts',
          },
          text: '作品',
          isShow: true,
        },
        {
          linkTo: {
            name: 'userLiked',
          },
          text: '喜欢',
          isShow: true,
        },
        {
          linkTo: {
            name: 'userReplies',
          },
          text: '回复',
          isShow: true,
        },
        {
          linkTo: {
            name: 'userComments',
          },
          text: '评论',
          isShow: true,
        },
        {
          linkTo: {
            name: 'userAccount',
          },
          text: '账户',
          isShow: false,
        },
      ],
    };
  },

  /**
   * 计算属性
   */
  computed: {
    ...mapGetters({
      getCurrentUser: 'user/getCurrentUser',
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
    isOwner(item) {
      const isHasRole =
        parseInt(this.getCurrentUser?.id) === parseInt(this.user?.id);
      return item.text === '账户' ? isHasRole : true;
    },
  },

  /**
   * 使用组件
   */
  components: {},
});
</script>

<style scoped>
@import './styles/user-show-menu.css';
</style>
