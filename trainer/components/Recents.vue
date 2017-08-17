<template>
    <div id="zk_inlinetrainer_recents">
        <ul class="list-unstyled">
            <li v-for="recent in recents">
                <action tab="recents" :action="recent" :make-recent="false"></action>
            </li>
            <li v-if="recents.length==0">
                <i>No recent actions yet</i>
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
            recents:function(){
                return this.$store.getters['recents/actions'];
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
    #zk_inlinetrainer_recents{
        padding:5px 10px;
        ul{
            list-style:none;
        }
    }

</style>
