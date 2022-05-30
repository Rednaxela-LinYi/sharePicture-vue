<template>
  <div class="app-sidebar-item avatar">
    <UserAvatar
      sizeType="medium"
      link="userShow"
      :avatarSource="avatarSource"
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
  props: {},
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      getCurrentUser: 'user/getCurrentUser',
      avatarSource: 'user/account/getAvatarSource',
    }),
  },

  /**
   * 已创建
   */
  created() {
    //
  },

  unmounted() {
    console.log('销毁');
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
