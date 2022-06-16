<template>
  <div :class="postListClasses">
    <PostListItem v-for="post in posts" :item="post" :key="post?.id" />
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import { mapGetters, mapMutations, mapActions } from 'vuex';
import { getStorages } from '@/app/app.service';
import PostListItem from './post-list-item';

export default defineComponent({
  data() {
    return {
      maxScrollTop: 0,
      sort: '',
    };
  },

  async created() {
    this.sort =
      this.$route.name === 'postIndexPopular' ? 'most_comments' : 'latest';
    await this.getPosts({ sort: this.sort });

    const currentLayout = getStorages('spv-post-list-layout');
    if (currentLayout) {
      this.setLayout(currentLayout);
    } else {
      this.setLayout('flow');
    }
    if (window) {
      window.scrollTo({ top: 0 });
      window.addEventListener('scroll', this.onScrollWindow, true);
    }
  },

  beforeUnmount() {
    if (window) {
      window.scrollTo({ top: 0 });
      window.removeEventListener('scroll', this.onScrollWindow);
    }
  },

  computed: {
    ...mapGetters({
      loading: 'post/index/loading',
      posts: 'post/index/posts',
      layout: 'post/index/layout',
      nextPage: 'post/index/nextPage',
      totalPages: 'post/index/totalPages',
    }),

    postListClasses() {
      console.log('getLayout', this.layout);
      return ['post-list', this.layout];
    },
  },

  methods: {
    ...mapMutations({
      setLayout: 'post/index/setLayout',
      setNextPage: 'post/index/setNextPage',
    }),
    ...mapActions({
      getPosts: 'post/index/getPosts',
    }),
    onScrollWindow() {
      if (document) {
        const { scrollTop, clientHeight, scrollHeight } =
          document.documentElement;
        const isDownScroll = scrollTop > this.maxScrollTop;
        this.maxScrollTop = isDownScroll ? scrollTop : this.maxScrollTop;
        if (
          scrollHeight - 100 < clientHeight + scrollTop &&
          !this.loading &&
          isDownScroll &&
          this.nextPage < this.totalPages
        ) {
          this.setNextPage();
          this.getPosts({ sort: this.sort });
        }
      }
    },
  },

  components: {
    PostListItem,
  },
});
</script>

<style scoped>
@import './styles/post-list.css';
</style>
