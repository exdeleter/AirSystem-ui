<style lang="postcss">
@import "src/assets/base.css";

.as-table {
    @apply p-4 bg-gray-50 rounded-2xl overflow-y-auto;
    height: 100%;
}
.table {
    @apply p-2 bg-gray-50 text-black w-full rounded-lg;
    overflow-y: auto
}

.as-table__header {
    @apply rounded-lg back-gray;
    position: sticky;
    top: 0;
    z-index: 1; /* Ensure header appears above scrolling content */
}

.as-table__header__row__col {
    @apply p-2 m-2 border-r-2  border-black text-left;
}

.as-table__body__row {
    @apply p-2 m-2 border-b-2;
}

.as-table__body__row:nth-child(even) {
    @apply p-2 m-2 border-b-2 back-gray-100;
}

.as-table__body__row__cell {
    @apply p-2 m-2;
}

</style>

<template>
    <div class="as-table">
        <table class="table">
            <thead class="as-table__header">
                <tr class="as-table__header__row">
                    <th class="as-table__header__row__col"
                        v-bind:class = "column.size"
                        v-for="column in columns">
                        {{ column.text }}
                    </th>
                </tr>
            </thead>
            <tbody class="as-table__body">
                <tr
                    class="as-table__body__row"
                    v-for="record in records"
                    :key="record.id">
                    <td class="as-table__body__row__cell"
                        v-for="column in columns"
                        :key="column.value">
                        <slot
                            :name="`${column.value}`"
                            :id="record.id"
                        >
                            {{ record[column.value] }}
                        </slot>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script lang="ts">

export default {
    props: {
        columns: {
            required: true,
            type: Array<object>
        },
        records: {
            required: true,
            type: Array<object>
        }
    },
    setup() {
        return {
        }
    }
}
</script>
