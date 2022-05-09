<template>
  <AppLayout>
    <router-view></router-view>
  </AppLayout>
</template>

<script>
import AppLayout from './components/layout/app-layout.vue';
export default {
  components: {
    AppLayout,
  },
  data() {
    return {
      name: '宁皓网',
    };
  },

  created() {
    console.log(this.$store.state);
  },
};
</script>

<style>
@import './styles/normalize.css';
@import './styles/app.css';
@import './styles/layout.css';
</style>
