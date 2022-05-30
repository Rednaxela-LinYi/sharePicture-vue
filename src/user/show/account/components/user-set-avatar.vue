<template>
  <div class="user-set-avatar">
    <span class="title">设置头像</span>
    <div class="avatar-preview">
      <img v-if="previewAvatarSource" :src="previewAvatarSource" />
    </div>
    <div class="file-upload">
      <FileField
        @change="selectedFileChangeHandler"
        class="item btn-select-file"
        name="avatar"
        fileType="image/*"
      ></FileField>
      <ButtonField
        @click="uploadFileAsAvatar"
        class="item"
        size="large"
        text="提交"
      ></ButtonField>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import { mapActions } from 'vuex';
import ButtonField from '@/app/components/button-field.vue';
import FileField from '@/app/components/file-field.vue';

export default defineComponent({
  name: 'ComponentName',

  /**
   * 属性
   */
  props: {
    user: {
      type: Object,
      default: null,
    },
  },

  /**
   * 数据
   */
  data() {
    return {
      avatarFile: null,
      previewAvatarSource: '',
    };
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
  methods: {
    ...mapActions({
      postAvatar: 'user/account/postAvatar',
      pushMessage: 'notification/pushMessage',
    }),
    selectedFileChangeHandler(files) {
      if (files.length > 0) {
        this.createPreviewAvatar(files[0]);
      }
    },

    createPreviewAvatar(file) {
      this.avatarFile = file;
      let fileReader = new FileReader(file);
      fileReader.readAsDataURL(file);
      fileReader.onload = (event) => {
        this.previewAvatarSource = event.target.result;
      };
    },

    async uploadFileAsAvatar() {
      console.log(this.user?.id);
      try {
        await this.postAvatar({
          file: this.avatarFile,
          userId: this.user?.id,
        });

        this.pushMessage({ content: '设置头像成功' });
      } catch (err) {
        this.pushMessage({ content: '设置头像出错' });
      }
    },
  },

  /**
   * 使用组件
   */
  components: {
    ButtonField,
    FileField,
  },
});
</script>

<style scoped>
@import '../styles/user-set-avatar.css';
</style>
