<template>
  <div class="auth-login">
    <div class="form">
      <h1 class="header">用户登录</h1>
      <TextField type="text" placeholder="用户" v-model="name"> </TextField>
      <TextField type="text" placeholder="密码" v-model="password"> </TextField>
      <ButtonField size="large" text="登录" @click="loginHandler"></ButtonField>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import { mapGetters, mapActions } from 'vuex';
import TextField from '@/app/components/text-field.vue';
import ButtonField from '@/app/components/button-field.vue';
export default defineComponent({
  name: 'authLogin',

  /**
   * 属性
   */
  props: {},

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
  computed: {
    ...mapGetters({
      loading: 'auth/login/loading',
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
      login: 'auth/login/login',
    }),
    async loginHandler() {
      try {
        const response = await this.login({
          name: this.name,
          password: this.password,
        });
        console.log(response);
      } catch (error) {
        console.log(error);
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
@import './styles/auth-login.css';
</style>
