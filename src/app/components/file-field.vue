<template>
  <div class="file-field">
    <label :for="name">{{ text }}</label>
    <input
      class="input-file"
      @change="$emit('change', $event.target.files)"
      type="file"
      :name="name"
      :id="name"
      :accept="fileType"
    />
  </div>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'FileField',

  /**
   * 属性
   */
  props: {
    fileType: {
      type: String,
    },
    text: {
      type: String,
    },
    name: {
      type: String,
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
  computed: {},

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
  components: {},

  emits: ['change'],
});
</script>

<style scoped>
@import './styles/file-field.css';
</style>
