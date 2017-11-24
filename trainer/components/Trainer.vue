<template>

        <div>
            <div v-show="open" class="card" id="zk_inlinetrainer" class="zk_inlinetrainer">
                <div class="card-header h6 card-inverse card-primary title">
                    Inline Trainer


                    <i @click="open = !open" class="fa fa-minus minimize pull-right" aria-hidden="true"></i>
                    <b-popover v-if="helpText" placement="bottom" triggers="click" class="pull-right" :content="helpText">
                        <i class="fa fa-question-circle trainer-help" aria-hidden="true"></i>
                    </b-popover>


                </div>
                <div class="card-block" style="height: calc(100% - 65px);">
                    <b-tabs ref="tabs" v-model="tabIndex" v-show="!ask">
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
                    <consent v-show="ask"></consent>
                </div>
            </div>
            <button id="zk_inlinetrainer_button" v-if="!open" @click="open = !open"><i class="fa fa-plus" aria-hidden="true"></i> Inline Trainer</button>
        </div>


</template>

<script lang="ts">
    import {CATEGORIES} from '../categories';
    import AllActions from './AllActions.vue';
    import Favorites from './Favorites.vue';
    import Recents from './Recents.vue';
    import Consent from './Consent.vue';
    import {SyncAction, RetrieveAction} from '../helpers/sync-action';
    import {LocalStorage} from "../helpers/local-storage";
    import {LogActivity} from "../activity/log-activity";
    import {PAGE_LOAD, TRAINER_CLOSE, TRAINER_MOVE, TRAINER_OPEN} from "../activity/activity-type";
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
          },
          open:{
              get: function(){
                  return this.$store.getters['userSettings/open'];
              },
              set: function(val){
                  this.$store.dispatch('userSettings/setOpen', val);
                  LogActivity(val? TRAINER_OPEN : TRAINER_CLOSE, {});
              }
          },
            helpText:function(){
                return this.$store.getters['trainerSettings/helpText']
            },

        ask() {
              return this.$store.getters['userSettings/ask'];
          }
        },
        components:{
            AllActions,
            Favorites,
            Recents,
            Consent
        },
        created:function() {
            LogActivity(PAGE_LOAD, {
                url: window.location.href
            });
            for (const category of this.categories) {
                for (const subcategory of category.subCategories) {
                    for (const action of subcategory.actions) {
                        action.importStepCompletion(RetrieveAction(action));
                        action.initSteps();
                        SyncAction(action);
                    }
                }
            }

            const $ = require('jquery');
            require('jquery-ui/ui/widgets/draggable');
            let position = {};
            if(LocalStorage.get('trainer.position.left')){
                position['left'] = LocalStorage.get('trainer.position.left');
            }
            if(LocalStorage.get('trainer.position.top')){
                position['top'] = LocalStorage.get('trainer.position.top');
            }

            $(function(){
                $('#zk_inlinetrainer').css(position).draggable({
                    containment:'window',
                    scroll:false,
                    stop:function(){
                        LocalStorage.set('trainer.position.top', $(this).css('top'));
                        LocalStorage.set('trainer.position.left', $(this).css('left'));
                        LogActivity(TRAINER_MOVE, {
                           top:$(this).css('top'),
                           left:$(this).css('left')
                        });
                    }
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
        box-shadow: 5px 5px 15px rgba(0,0,0,0.2);
        .minimize{
            padding:5px 10px;
            cursor:pointer;
            border-style:solid;
            border-width:1px;
            border-color:rgba(0,0,0,0.1);
        }
        .trainer-help{
            padding:5px 10px;
            cursor:pointer;
        }
        .title{
            cursor: move;
        }
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

    #zk_inlinetrainer_button{
        position:fixed;
        z-index:10000;
        top:50px;
        right:0;
        background: #0275d8;
        color:white;
        text-shadow:inherit;
        border-width:1px;
        border-color:darken(#0275d8, 10%);
        margin:0;
        padding: 4px 12px;
        border-radius:4px;
    }

</style>
