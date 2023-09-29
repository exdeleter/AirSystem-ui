<script setup lang="ts">
const props = defineProps({
    text: { type: String, required: true },
    modelValue: { type: String }
})
const emit = defineEmits(['update:modelValue'])

function updateModelValue(value) {
    emit("update:modelValue", value)
}
</script>

<template>
    <div class="as-input">
        <p class="as-input__placeholder">{{ text }}</p>
        <input
            class="as-input__input"
            :value="modelValue"
            @input="updateModelValue($event.target.value)"
        />
    </div>
</template>

<style scoped>
@import "src/assets/base.css";

.as-input {
    @apply m-2 p-2 border-2 border-gray-500 rounded-lg;
}

.as-input__placeholder {
    @apply text-gray-400;
}

.as-input__input {
    @apply w-full focus:outline-none;
}

.as-input:focus-within {
    @apply border-blue-700
}

</style>