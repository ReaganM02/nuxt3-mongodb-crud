<script lang="ts" setup>
import { Types } from 'mongoose'
import { useToast } from 'vue-toastification'
import { ITodo } from '~/types'

const props = defineProps<{
    item: ITodo
}>()
const emit = defineEmits<{
    (e: 'delete'): void,
    (e: 'update'): void
}>()

const itemRef = ref<HTMLElement | null>(null)

const handleDelete = async (id: Types.ObjectId): Promise<void> => {
    const { error } = await useFetch(`/api/v1/item/${id}`, {
        method: 'DELETE',
        onResponse(context) {
            const { statusCode, statusMessage } = context.response._data
            if (statusCode === 200) {
                useToast().success(statusMessage)
            }
        }
    })
    emit('delete')
    if (error.value) {
        alert(error.value.statusMessage)
    }
}

const removeEditActiveClasses = (): void => {
    const lists = Array.from(document.querySelectorAll('.list'))
    lists.forEach((el) => el.classList.remove('edit-active'))
}

const handleEdit = (): void => {
    removeEditActiveClasses()
    itemRef.value?.classList.add('edit-active')
}

const handleCancel = (): void => {
    removeEditActiveClasses()
    const formInput = itemRef.value?.querySelector('input')
    formInput!.value = props.item.item
}

const handleSaveEdit = async (id: Types.ObjectId): Promise<void> => {
    const formInput = itemRef.value?.querySelector('input')
    await useFetch(`/api/v1/item/${id}`, {
        method: 'PUT',
        body: { item: formInput!.value }
    })
    emit('update')
    removeEditActiveClasses()
}

</script>
<template>
    <li
        ref="itemRef"
        :id="item._id.toString()"
        class="list p-2 hover:bg-slate-100 flex gap-2"
    >
        <div class="w-full text-sm text-slate-600">
            <div class="item">
                {{ item.item }}
            </div>
            <div>
                <form class="form-edit flex gap-2">
                    <input
                        type="text"
                        :value="item.item"
                        class="outline outline-slate-200 outline-1 bg-white text-sm pl-2 py-1 rounded w-full"
                    />
                    <!-- Save -->
                    <button
                        class="bg-blue-700 text-white rounded text-xs px-2 uppercase"
                        @click.prevent="handleSaveEdit(item._id)"
                    >Save</button>
                    <!-- Cancel -->
                    <button
                        class="bg-slate-300 text-slate-500 rounded text-xs px-2 uppercase"
                        @click.prevent="handleCancel"
                    >Cancel</button>
                </form>
            </div>
        </div>
        <div class="w-min-fit flex gap-4 actions">
            <div>
                <EditIcon
                    class="w-4 h-4 cursor-pointer text-slate-500"
                    @click="handleEdit"
                />
            </div>
            <div>
                <DeleteIcon
                    class="w-4 h-4 text-rose-400 cursor-pointer"
                    @click="handleDelete(item._id)"
                />
            </div>
        </div>
    </li>
</template>
<style scoped lang="css">
.form-edit {
    display: none;
}

.edit-active .form-edit {
    display: flex;
}

.edit-active .item {
    display: none;
}

.edit-active .actions {
    display: none;
}
</style>