<script lang="ts" setup>
import { useToast } from 'vue-toastification'

const emit = defineEmits<{
    (e: 'addItem'): void
}>()

const itemValue = ref('')
const handleAddItem = async () => {
    if (itemValue.value === '') {
        return useToast().error('Field is required.')
    }
    await useFetch('/api/v1/item/add', {
        method: 'POST',
        body: { item: itemValue.value },
        onResponse(context) {
            const { statusCode, statusMessage } = context.response._data
            if (statusCode === 200) {
                useToast().success('New item has been added.')
                itemValue.value = ''
            } else {
                useToast().error(statusMessage)
                throw createError({ statusCode, statusMessage, fatal: true })
            }
        }
    })
    emit('addItem')
}
</script>
<template>
    <div>
        <form
            class="flex gap-2"
            @submit.prevent="handleAddItem"
        >
            <input
                type="text"
                v-model="itemValue"
                placeholder="Type something...."
                class="outline outline-1 outline-slate-300 rounded min-h-[40px] w-full text-sm pl-2 focus:outline-slate-500"
            />
            <button
                type="submit"
                class="min-w-fit bg-blue-700 text-white px-6 py-2 rounded text-sm font-bold uppercase"
            >Add Item</button>
        </form>
    </div>
</template>
<style scoped lang="css"></style>