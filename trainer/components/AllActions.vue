<template>
    <div>
        <category v-for = "category in categories" :category="category"></category>
    </div>
</template>

<script lang="ts">
    import {CATEGORIES} from '../categories';
    import Category from './Category.vue';
    export default {
        selector:'all-actions',
        data() {
            return {
                categories: CATEGORIES
            }
        },
        components: {
            Category
        },


    }
</script>

<style lang="scss">
    .categories, .categories+li{
        list-style:none;
    }
    .categories{
        margin-left:15px;
    }


</style>
