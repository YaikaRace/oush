<template>
  <article
    class="border-2 border-zinc-700 rounded-lg p-4 w-full max-w-xs mx-auto bg-zinc-900"
  >
    <header class="text-3xl flex items-center justify-center">
      <h1>
        <a
          target="_blank"
          :href="getBaseUrl + '/r/' + shortId"
          class="short inline-block overflow-hidden overflow-ellipsis max-w-full"
          >{{ shortId }}</a
        >
      </h1>
      <button @click="copyUrl(getBaseUrl + '/r/' + shortId)">
        <i
          class="fa-solid fa-copy ml-3 text-zinc-300 hover:text-matte-light-blue"
        ></i>
      </button>
    </header>
    <section class="mt-4 text-zinc-400">
      <h2 class="underline flex items-center">
        <a
          target="_blank"
          :href="longUrl"
          class="inline-block overflow-hidden overflow-ellipsis max-w-full"
          >{{ longUrl }}
        </a>
        <a target="_blank" :href="longUrl"
          ><i class="fa-solid fa-arrow-up-right-from-square ml-2"></i
        ></a>
      </h2>
    </section>
    <footer class="mt-4">
      <button
        :disabled="loading"
        class="bg-matte-light-blue text-zinc-200 p-2 min-w-16 rounded-lg hover:bg-zinc-200 hover:text-matte-light-blue disabled:bg-matte-medium-blue disabled:text-zinc-500 disabled:cursor-not-allowed"
        @click="modal = true"
      >
        <i class="fa-solid fa-pen mr-2"></i>
        Edit
      </button>
      <UpdateUrl
        v-if="modal"
        :short-id="shortId"
        :long-url="longUrl"
        @cancel="modal = false"
        @updated="
          (v) => {
            $emit('update', v)
            modal = false
          }
        "
      />
      <button
        :disabled="loading"
        class="text-zinc-200 p-2 min-w-16 rounded-lg ml-4 hover:text-red-300 hover:underline disabled:text-zinc-500 disabled:cursor-not-allowed"
        @click.prevent="$emit('delete')"
      >
        <i class="fa-solid fa-trash-can mr-2"></i>Delete
      </button>
    </footer>
  </article>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import UpdateUrl from './UpdateUrl.vue'

export default defineComponent({
  name: 'UrlCard',
  props: {
    shortId: String,
    longUrl: String,
    loading: Boolean
  },
  emits: ['delete', 'update'],
  components: {
    UpdateUrl
  },
  data() {
    return {
      modal: false
    }
  },
  computed: {
    getBaseUrl() {
      return window.location.origin
    }
  },
  methods: {
    copyUrl(url: string) {
      navigator.clipboard.writeText(url)
    }
  }
})
</script>

<style lang="postcss" scoped>
.short {
  @apply text-matte-light-blue py-4;
}
</style>
