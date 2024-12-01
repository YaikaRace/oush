<template>
  <div
    class="fixed top-0 left-0 w-full h-dvh bg-zinc-950 z-10 bg-opacity-60 flex justify-center items-center"
  >
    <article class="bg-zinc-900 text-zinc-300 p-4 rounded-2xl">
      <form @submit.prevent="$emit('updated', { shortId, short, url })">
        <label for="short">Short URL ID</label>
        <input
          id="short"
          type="text"
          placeholder="MyAwesomeURL"
          v-model="short"
        />
        <label for="url">Redirected URL</label>
        <input
          id="url"
          type="text"
          placeholder="https://yaika.site"
          v-model="url"
        />
        <div class="mt-4">
          <button
            type="submit"
            class="bg-matte-light-blue text-zinc-300 p-2 min-w-24 rounded-xl hover:bg-zinc-300 hover:text-matte-light-blue"
          >
            Update
          </button>
          <button
            type="reset"
            class="p-2 min-w-24 text-red-300 hover:underline hover:underline-offset-4"
            @click="$emit('cancel')"
          >
            Cancel
          </button>
        </div>
      </form>
    </article>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'UpdateUrl',
  emits: ['updated', 'cancel'],
  props: {
    shortId: String,
    longUrl: String
  },
  data() {
    return {
      short: '',
      url: ''
    }
  },
  mounted() {
    this.short = this.shortId ?? ''
    this.url = this.longUrl ?? ''
  }
})
</script>

<style lang="postcss" scoped>
label {
  @apply block mt-2 ml-2;
}
input {
  @apply block py-2 px-3 bg-zinc-900 border-2 border-zinc-700 rounded-xl outline-none placeholder:text-zinc-600;
}
</style>
