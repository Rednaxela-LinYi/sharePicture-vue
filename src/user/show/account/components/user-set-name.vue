<template>
  <div class="user-set-name">
    <TextField
      class="item new-user-name"
      type="text"
      placeholder="新用户名"
      v-model="name"
    ></TextField>
    <TextField
      class="item validate-password"
      type="text"
      placeholder="密码验证"
      v-model="password"
    ></TextField>
    <ButtonField
      @click="updateUsername"
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
  name: 'UserSetName',

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
      name: '',
      password: '',
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
    async updateUsername() {
      try {
        const response = await this.updateUserAccount({
          userId: this.user?.id,
          body: {
            update: {
              name: this.name,
            },
            validate: {
              password: this.password,
            },
          },
        });
        this.pushMessage({ content: '更改用户名成功' });
      } catch (err) {
        this.pushMessage({ content: '更改用户名失败' });
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
@import '../styles/user-set-name.css';
</style>
