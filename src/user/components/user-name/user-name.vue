<template>
  <div class="user-name">
    {{ userName }}
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import { mapActions } from 'vuex';
export default defineComponent({
  name: 'UserName',

  /**
   * 属性
   */
  props: {
    user: {
      type: Object,
    },
  },

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
    userName() {
      return this.user?.name || '';
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
    ...mapActions({
      getUserById: 'user/show/getUserById',
    }),
  },

  /**
   * 使用组件
   */
  components: {},
});
</script>

<style scoped></style>
