<template>
  <article class="px-4 pt-8">
    <section>
      <div v-for="(url, index) in urls" :key="index">
        <UrlCard
          :short-id="url.short"
          :long-url="url.url"
          :loading="loading"
          @delete="deleteUrl(url.short)"
        />
      </div>
    </section>
    <button class="btn" @click.prevent="reload" :disabled="loading">
      Reload
    </button>
  </article>
</template>

<script lang="ts">
import UrlCard from '@/components/UrlCard.vue'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'UserDashboard',
  components: {
    UrlCard
  },
  data() {
    return {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      urls: [] as any[],
      loading: false
    }
  },
  methods: {
    async reload() {
      this.loading = true
      await this.getUrls()
      this.loading = false
    },
    async getUrls() {
      try {
        const baseUrl = process.env.VUE_APP_API_URL
        if (!baseUrl) return
        const result = await fetch(`${baseUrl}/user/info/urls`, {
          credentials: 'include'
        })
        const json = await result.json()
        if (json.success) {
          this.urls = json.data
          window.sessionStorage.setItem('urls', JSON.stringify(json.data))
          return
        }
        window.sessionStorage.setItem('urls', '[]')
      } catch {
        this.urls = []
      }
    },
    async deleteUrl(shortId: string) {
      try {
        const baseUrl = process.env.VUE_APP_API_URL
        if (!baseUrl) return
        const result = await fetch(`${baseUrl}/url/delete/${shortId}`, {
          method: 'DELETE',
          credentials: 'include'
        })
        const json = await result.json()
        if (json.success) {
          this.reload()
        }
      } catch {}
    }
  },
  async created() {
    const data = window.sessionStorage.getItem('urls')
    if (data) {
      this.urls = JSON.parse(data)
      return
    }
    await this.getUrls()
  }
})
</script>

<style lang="postcss" scoped>
.btn {
  @apply bg-matte-light-blue p-2 rounded-lg text-zinc-200 my-10 disabled:bg-matte-medium-blue disabled:text-zinc-500 disabled:cursor-not-allowed;
}
</style>
