<template>
  <div class="app-toolbar">
    <div class="app-toolbar-item layout" v-if="isShow">
      <PostListLayoutSwitcher></PostListLayoutSwitcher>
    </div>

    <AppToolbarItemSearch></AppToolbarItemSearch>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import { mapGetters } from 'vuex';
import AppToolbarItemSearch from './components/app-toolbar-item-search.vue';
import PostListLayoutSwitcher from '@/post/index/components/post-list-layout-switcher.vue';
export default defineComponent({
  name: 'AppToolbar',

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
      isShow: 'toolbar/isShow',
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
  methods: {},

  /**
   * 使用组件
   */
  components: {
    AppToolbarItemSearch,
    PostListLayoutSwitcher,
  },
});
</script>

<style scoped>
@import './styles/app-toolbar.css';
</style>
