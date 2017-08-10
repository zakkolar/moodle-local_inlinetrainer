<template>


        <div class="card" id="zk_inlinetrainer" class="zk_inlinetrainer">
            <div class="card-header h6 card-inverse card-primary">
                Inline Trainer
            </div>
            <div class="card-block" style="height: calc(100% - 65px);">
                <b-tabs ref="tabs" v-model="tabIndex">
                    <b-tab title="All">
                        <all-actions></all-actions>
                    </b-tab>
                    <b-tab title="Favorites">
                        <favorites></favorites>
                    </b-tab>
                    <b-tab title="Recents">
                        <recents></recents>
                    </b-tab>
                </b-tabs>
            </div>
        </div>

</template>

<script lang="ts">
    import {CATEGORIES} from '../categories';
    import AllActions from './AllActions.vue';
    import Favorites from './Favorites.vue';
    import Recents from './Recents.vue';
    import {SyncAction, RetrieveAction} from '../helpers/sync-action';
    export default {
        data() {
            return {
                categories: CATEGORIES
            }
        },
        computed:{
          tabIndex:{
              get: function(){
                  return this.$store.getters['tabSettings/tabIndex'];
              },
              set: function(val){
                  this.$store.dispatch('tabSettings/setTabIndex',val);
              }
          }
        },
        components:{
            AllActions,
            Favorites,
            Recents
        },
        created:function(){
            for(const category of this.categories){
                for(const subcategory of category.subCategories){
                    for(const action of subcategory.actions){
                        action.importStepCompletion(RetrieveAction(action));
                        action.initSteps();
                        SyncAction(action, 120);
                    }
                }
            }

            const $ = require('jquery');
            require('jquery-ui/ui/widgets/draggable');
            $(function(){
                $('#zk_inlinetrainer').draggable({
                    containment:'window',
                    scroll:false
                });
            });
        }
    }
</script>

<style lang="scss">
    @import "../bootstrap-custom";

    #zk_inlinetrainer{
        z-index:10001;
        width:320px;
        position:fixed;
        right:5%;
        top:5%;
        height:90%;
        overflow:hidden;
        background-color:white;
        border-color:#EEEEEE;
        border-style:solid;
        border-width:1px;
    }

    .tabs{
        height: calc(100% - 36px);
    }

    .tab-content{
        overflow: auto;
        height:100%;
    }

    .popover{
        z-index:10002;
    }

    .local_inlinetrainer_overlay {
        position: absolute;
        background-color: #000;
        filter:alpha(opacity=50);
        -moz-opacity:0.5;
        -khtml-opacity: 0.5;
        opacity: 0.5;
        z-index: 10000;
    }

</style>
