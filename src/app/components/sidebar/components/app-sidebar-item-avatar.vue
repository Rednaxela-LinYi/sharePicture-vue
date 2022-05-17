<template>
  <div class="app-sidebar-item avatar">
    <UserAvatar
      sizeType="medium"
      link="/login"
      :user="getCurrentUser"
    ></UserAvatar>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import { mapGetters } from 'vuex';
import UserAvatar from '@/user/components/user-avatar/user-avatar.vue';

export default defineComponent({
  name: 'AppSidebarItemAvatar',

  /**
   * 属性
   */
  props: {},

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
  methods: {},

  /**
   * 使用组件
   */
  components: {
    UserAvatar,
  },
});
</script>

<style scoped></style>
