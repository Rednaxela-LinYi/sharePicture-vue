<template>
  <AppLayout>
    <router-view></router-view>
  </AppLayout>
</template>

<script>
import AppLayout from './components/layout/app-layout.vue';
import { mapGetters, mapMutations, mapActions } from 'vuex';
import { getStorages } from '@/app/app.service';
export default {
  computed: {
    ...mapGetters({
      token: 'auth/token',
    }),
  },

  methods: {
    ...mapMutations({
      setToken: 'auth/setToken',
    }),
    ...mapActions({
      configApiHttpClientAuthHeader: 'auth/configApiHttpClientAuthHeader',
    }),
  },

  components: {
    AppLayout,
  },

  data() {
    return {
      name: '宁皓网',
    };
  },

  created() {
    let token = getStorages('spv-token');
    if (token) {
      this.setToken(getStorages('spv-token'));
      this.configApiHttpClientAuthHeader(token);
    }
  },
};
</script>

<style>
@import './styles/normalize.css';
@import './styles/base.css';
@import './styles/theme.css';
@import './styles/app.css';
@import './styles/layout.css';
@import './styles/form.css';
@import './styles/button.css';
</style>
