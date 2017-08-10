<template>
    <i class="fa chevron" v-bind:class="{'fa-chevron-right':!open, 'fa-chevron-down':open}" aria-hidden="true"></i>
</template>

<script lang="ts">
    export default {
        selector:'chevron',

        data() {
            return {

            }
        },
        props:['open']

    }
</script>

<style lang="scss">
    .chevron{
        width:13px;
    }

</style>
