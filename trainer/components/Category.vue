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
            <a v-if="category.video" href="#" @click="showVideo"  title="Watch a video overview of the actions in this category"><i class="fa fa-film" aria-hidden="true"></i> Video overview</a>
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
    import {CATEGORY_CLOSE, CATEGORY_OPEN, VIDEO_CLICK} from "../activity/activity-type";
    import {LogActivity} from "../activity/log-activity";
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

                LogActivity(this.open? CATEGORY_OPEN : CATEGORY_CLOSE, {
                    category:this.category.identifier(),
                });
            },
            showVideo:function(e:Event){
                e.preventDefault();
                LogActivity(VIDEO_CLICK,{
                    category: this.category.identifier()
                });
                window.open(this.category.video, '_blank');

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

    #zk_inlinetrainer{
        .card{
            padding:0;
            margin:0;
        }
    }


</style>
