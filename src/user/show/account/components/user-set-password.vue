<template>
  <div class="user-set-password">
    <TextField
      class="item new-user-password"
      type="text"
      placeholder="新密码"
      v-model="newPassword"
    ></TextField>
    <TextField
      class="item validate-password"
      type="text"
      placeholder="旧密码验证"
      v-model="oldPassword"
    ></TextField>
    <ButtonField
      @click="updateUserPassword"
      class="item"
      size="large"
      text="确认"
    ></ButtonField>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import { mapActions } from 'vuex';
import TextField from '@/app/components/text-field.vue';
import ButtonField from '@/app/components/button-field.vue';
export default defineComponent({
  name: 'UserSetPassword',

  /**
   * 属性
   */
  props: {
    user: {
      type: Object,
      default: null,
    },
  },

  /**
   * 数据
   */
  data() {
    return {
      oldPassword: '',
      newPassword: '',
    };
  },

  /**
   * 计算属性
   */
  computed: {},

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
      updateUserAccount: 'user/account/updateUserAccount',
      pushMessage: 'notification/pushMessage',
    }),
    async updateUserPassword() {
      try {
        const response = await this.updateUserAccount({
          userId: this.user?.id,
          body: {
            update: {
              password: this.newPassword,
            },
            validate: {
              password: this.oldPassword,
            },
          },
        });
        this.pushMessage({ content: '更改密码成功' });
      } catch (err) {
        this.pushMessage({ content: '更改密码失败' });
        throw err.response;
      }
    },
  },

  /**
   * 使用组件
   */
  components: {
    TextField,
    ButtonField,
  },
});
</script>

<style scoped>
@import '../styles/user-set-password.css';
</style>
