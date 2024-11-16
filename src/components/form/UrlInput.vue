<template>
  <div class="relative">
    <input
      :value="modelValue"
      @input="(e) => $emit('update:modelValue', (e.target as HTMLInputElement).value)"
      type="url"
      placeholder="URL"
      class="form-input"
      :disabled="disabled"
      required
    />
    <button
      type="submit"
      :disabled="disabled"
      class="text-white bg-matte-blue h-full px-4 rounded-2xl absolute right-0 disabled:bg-matte-dark-blue disabled:text-zinc-400 hover:bg-white hover:text-matte-light-blue"
    >
      <i class="fa-solid fa-paper-plane"></i>
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'UrlInput',
  emits: ['update:modelValue'],
  props: {
    modelValue: String,
    disabled: {
      type: Boolean,
      default: false
    }
  }
})
</script>

<style lang="postcss" scoped>
.form-input {
  @apply bg-transparent border-2 border-zinc-600 rounded-2xl text-white caret-white
  outline-none px-2 py-1 focus:border-matte-blue transition-all duration-200
  disabled:text-zinc-700 bg-zinc-900;
}
.form-input::placeholder {
  @apply transition-all duration-200 text-zinc-700 focus:opacity-0;
}
</style>
