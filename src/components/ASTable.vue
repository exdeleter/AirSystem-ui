<style lang="postcss">
@import "src/assets/base.css";
.table {
    @apply p-2 bg-white text-black w-full rounded-lg;
    overflow-y: auto
}

.table-columns__col {
    @apply p-2 m-2 border-r-2  border-black text-left;
}

.table-columns__row {
    @apply p-2 m-2 border-b-2;
}

.table-columns__row:nth-child(even) {
    @apply p-2 m-2 border-b-2 back-gray-100;
}

.table-columns__cell {
    @apply p-2 m-2;
}

.sticky-header {
    @apply rounded-lg back-gray;
    position: sticky;
    top: 0;
    z-index: 1; /* Ensure header appears above scrolling content */
}
</style>

<template>
    <div class="as-table">
        <div class="as-table">
            <table class="table">
                <thead class="sticky-header ">
                <tr>
                    <th class="table-columns__col" v-bind:class = "column.size" v-for="column in columns">{{ column.text }}</th>
                </tr>
                </thead>
                <tbody>
                <tr
                    class="table-columns__row"
                    v-for="record in records"
                    :key="record.id">
                    <td class="table-columns__cell"
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
