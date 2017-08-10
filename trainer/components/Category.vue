<template>
    <div class="card">
        <div class="card-header">
            <b-popover class="zk_inlinetrainer" placement="left" triggers="hover" :content="category.description">
                <a href="#" @click="toggleOpen">
                    <chevron v-bind:open="open"></chevron>
                    {{category.name}}
                </a>
            </b-popover>

        </div>
        <div v-if="open" class="card-block">
            <ul class="categories">
                <li v-for="subcategory in category.subCategories">
                    <subcategory v-bind:subcategory="subcategory"></subcategory>
                </li>
            </ul>
        </div>

    </div>
</template>

<script lang="ts">
    import Chevron from './Chevron.vue';
    import Subcategory from './Subcategory.vue';
    import {Category} from "../category";
    export default {
        selector:'category',
        data() {
            return {

            }

        },
        props:['category'],
        components: {
            Subcategory,
            Chevron
        },
        methods:{
            toggleOpen:function(e: Event){
                e.preventDefault();

                if(this.open){
                    this.$store.dispatch('tabSettings/removeCategory',this.category);
                }
                else{
                    this.$store.dispatch('tabSettings/addCategory',this.category);
                }
            }
        },
        computed:{
            open:function(){

                return this.$store.getters['tabSettings/categories'].indexOf(this.category.identifier())>-1;
            }
        }

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
