<template>
    <div id="zk_inlinetrainer_favorites">
        <ul class="list-unstyled">
            <li v-for="favorite in favorites">
                <action :action="favorite"></action>
            </li>
            <li v-if="favorites.length==0">
                <i>No favorites yet</i>
            </li>
        </ul>
    </div>
</template>

<script lang="ts">
    import Action from './Action.vue';
    export default {
        data() {
            return {

            }
        },
        computed:{
            favorites:function(){
                return this.$store.getters['favorites/actions'];
            }
        },
        components: {
            Action
        },


    }
</script>

<style lang="scss">
    .categories, .categories+li{
        list-style:none;
    }
    .categories {
        margin-left: 15px;
    }
    #zk_inlinetrainer_favorites{
        padding:5px 10px;
        ul{
            list-style:none;
        }
    }

</style>
