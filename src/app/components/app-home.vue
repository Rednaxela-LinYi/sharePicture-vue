<template>
  <component :is="home"></component>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import PostIndex from '@/post/index/post-index.vue';
export default {
  data() {
    return {
      home: 'PostIndex',
    };
  },

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
    PostIndex,
  },
};
</script>
