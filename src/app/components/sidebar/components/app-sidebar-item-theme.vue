<template>
  <div class="app-sidebar-item theme bottom pointer">
    <AppIcon :name="themeIconName" @click="toggleTheme"></AppIcon>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import { mapGetters, mapMutations } from 'vuex';
import AppIcon from '@/app/components/app-icon.vue';
export default defineComponent({
  name: 'AppSidebarItemTheme',

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

    themeIconName() {
      return this.theme === 'light' ? 'wb_incandescent' : 'wb_sunny';
    },
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
    ...mapMutations({
      setTheme: 'layout/setTheme',
    }),
    toggleTheme() {
      const nextTheme = this.theme === 'light' ? 'dark' : 'light';
      this.setTheme(nextTheme);
    },
  },

  /**
   * 使用组件
   */
  components: {
    AppIcon,
  },
});
</script>

<style scoped>
@import './styles/app-sidebar-item-theme.css';
</style>
