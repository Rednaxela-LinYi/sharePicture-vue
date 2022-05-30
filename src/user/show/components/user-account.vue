<template>
  <div class="user-account">
    <UserSetAvatar :user="currentUser"></UserSetAvatar>
    <UserSetName :user="currentUser"></UserSetName>
    <UserSetPassword :user="currentUser"></UserSetPassword>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import { mapGetters } from 'vuex';
import UserSetAvatar from '@/user/show/account/components/user-set-avatar.vue';
import UserSetName from '@/user/show/account/components/user-set-name.vue';
import UserSetPassword from '@/user/show/account/components/user-set-password.vue';
export default defineComponent({
  name: 'UserAccount',

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
  methods: {},

  /**
   * 使用组件
   */
  components: {
    UserSetAvatar,
    UserSetName,
    UserSetPassword,
  },
});
</script>

<style scoped></style>
