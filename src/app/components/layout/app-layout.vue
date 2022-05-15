<template>
  <div :class="['page', theme]">
    <PageAside></PageAside>
    <PageHeader></PageHeader>
    <div class="page-main">
      <slot> </slot>
    </div>
    <AppNotification></AppNotification>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import { mapGetters, mapMutations } from 'vuex';
import { getStorages } from '@/app/app.service';

import PageAside from './components/page-aside.vue';
import PageHeader from './components/page-header.vue';
import AppNotification from '@/app/components/notification/app-notification.vue';
export default defineComponent({
  name: 'AppLayout',

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
      theme: 'layout/theme',
    }),
  },

  /**
   * 已创建
   */
  created() {
    const theme = getStorages('theme');
    if (theme) {
      this.setTheme(theme);
    }
  },

  /**
   * 组件方法
   */
  methods: {
    ...mapMutations({
      setTheme: 'layout/setTheme',
    }),
  },

  /**
   * 使用组件
   */
  components: {
    PageHeader,
    PageAside,
    AppNotification,
  },
});
</script>

<style scoped></style>
