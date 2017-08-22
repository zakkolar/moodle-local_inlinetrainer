<template>
    <div>
        <a href="#" @click="toggleOpen">
            <chevron v-bind:open="open"></chevron>
            {{subcategory.name}}
        </a>
        <ul class="subcategories" v-if="open">
            <li v-for = "action in subcategory.actions">
                <action tab="all" v-bind:action="action"></action>
            </li>
        </ul>
    </div>
</template>

<script lang="ts">
    import Action from './Action.vue';
    import Chevron from './Chevron.vue';
    import {Category} from "../category";
    import {SUBCATEGORY_CLOSE, SUBCATEGORY_OPEN} from "../activity/activity-type";
    import {LogActivity} from "../activity/log-activity";
    export default {
        selector:'subcategory',
        data() {
            return {

            }

        },
        props:['subcategory'],
        components: {
            Action,
            Chevron
        },
        methods:{
            toggleOpen:function(e: Event){
                e.preventDefault();

                if(this.open){
                    this.$store.dispatch('tabSettings/removeCategory',this.subcategory);
                }
                else{
                    this.$store.dispatch('tabSettings/addCategory',this.subcategory);
                }

                LogActivity(this.open? SUBCATEGORY_OPEN : SUBCATEGORY_CLOSE, {
                    subcategory:this.subcategory.identifier(),
                });
            }
        },
        computed:{
            open:function(){
                return this.$store.getters['tabSettings/categories'].indexOf(this.subcategory.identifier())>-1;
            }
        }

    }
</script>

<style lang="scss">
    .subcategories, .subcategories+li{
        list-style:none;
    }

    .subcategories{
        margin-left:15px;
    }
</style>
