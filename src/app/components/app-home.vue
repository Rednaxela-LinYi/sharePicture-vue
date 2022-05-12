<template>
  <div>欢迎，您目前{{ isLoggedIn ? '已登录' : '未登录' }}</div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters({
      isLoggedIn: 'auth/isLoggedIn',
    }),
  },
  components: {},
};
</script>
