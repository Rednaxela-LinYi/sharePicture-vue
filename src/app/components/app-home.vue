<template>
  <div>欢迎，您目前{{ isLoggedIn ? '已登录' : '未登录' }}</div>
  <div>
    <ButtonField @click="onClickPushMessage" text="推送消息" size="large">
    </ButtonField>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import ButtonField from '@/app/components/button-field.vue';
export default {
  computed: {
    ...mapGetters({
      isLoggedIn: 'auth/isLoggedIn',
    }),
  },

  methods: {
    ...mapActions({
      pushMessage: 'notification/pushMessage',
    }),

    onClickPushMessage() {
      this.pushMessage({
        id: Date.now(),
        content: '空山新雨后，天气晚来秋',
      });
    },
  },
  components: {
    ButtonField,
  },
};
</script>
