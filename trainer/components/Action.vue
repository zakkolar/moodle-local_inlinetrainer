<template>
    <div class="action">
        <a href="#" @click="toggleOpen">
            <chevron :open="open"></chevron>
            {{action.name}}
        </a>
        <div class='pull-right icons'>
            <a class='star pull-right' @click="removeFavorite" href="#" v-if="favorite"><i class="fa fa-star star" aria-hidden="true"></i></a>
            <a class='star pull-right' @click="addFavorite" href="#"  v-if="!favorite"><i class="fa fa-star-o star" aria-hidden="true"></i></a>
            <a :href='action.help' v-if="action.help" target='_blank' class='pull-right'><span class="sr-only">More information about this action</span><i class='fa fa-info' aria-hidden="true"></i></a>
        </div>
        <ol v-if="open">
            <li v-for =  "step in action.steps" v-bind:class="{'optional':step.optional,'complete':step.complete, 'futureStep':!step.complete && step!==action.currentStep}">
                <span v-if="step.optional">Optional: </span>
                <a v-if="step.help!=null && step===action.currentStep && !step.complete" href='#' title="Show me how to complete this step" @click="runHelp($event,step)"><i class="fa fa-window-restore" aria-hidden="true"></i></a>
                {{step.text}}
            </li>
            <li class='resetSteps' v-if="action.steps[0]!==action.currentStep">
                <a href @click="resetSteps" class='text-danger'>Start over</a>
            </li>
        </ol>
    </div>
</template>

<script lang="ts">
    import {Action} from "../action";
    import {Step} from "../step/step";
    import Chevron from "./Chevron.vue";
    import {mapActions} from 'vuex';
    import {LogActivity} from "../activity/log-activity";
    import {ACTION_CLOSE, ACTION_OPEN, FAVORITE_ADD, FAVORITE_REMOVE, STEP_HELP} from "../activity/activity-type";

    export default {
        selector:'action',
        components:{
           Chevron
        },
        data() {
            return {

            }
        },
        methods:{
            toggleOpen:function(e: Event){
              e.preventDefault();
                if(this.open){
                    this.$store.dispatch('tabSettings/removeAction', {tab:this.tab, action:this.action});
                }
                else{
                    this.$store.dispatch('tabSettings/addAction', {tab:this.tab, action:this.action});
                }

              if(this.open && this.makeRecent){
                  this.$store.dispatch('recents/add', this.action);
              }
            LogActivity(this.open? ACTION_OPEN : ACTION_CLOSE, {
                action:this.action.identifier,
                tab: this.tab
            });
            },
            addFavorite:function(e: Event){
                e.preventDefault();
                this.$store.dispatch('favorites/add',this.action);
                LogActivity(FAVORITE_ADD, {
                    action: this.action.identifier
                });
            },
            removeFavorite:function(e: Event){
                e.preventDefault();
                this.$store.dispatch('favorites/remove',this.action);
                LogActivity(FAVORITE_REMOVE, {
                    action: this.action.identifier
                });
            },
            runHelp:function(e: Event, step:Step){
                e.preventDefault();
                if(step.help!=null){
                    step.help();
                    LogActivity(STEP_HELP, {
                       'action':this.action.identifier,
                       'step':step.identifier,
                        'tab':this.tab,
                    });
                }
            },
            resetSteps:function(e: Event){
                e.preventDefault();
                this.action.resetSteps();
            }

        },
        computed:{
          favorite:function(){
              return this.$store.getters['favorites/actions'].indexOf(this.action)>-1;
          },
            open:function(){
                return this.$store.getters['tabSettings/actions'][this.tab].indexOf(this.action.identifier)>-1;
            }
        },
        props:{
            action: Action,
            "make-recent":{
                type: Boolean,
                default: true
            },
            tab: String,
        }

    }
</script>

<style lang="scss">
    .icons a{
        padding-left:5px;
    }
    .star{
        color:goldenrod;
    }
    .optional{
        font-style:italic;
    }

    .complete{
        text-decoration: line-through;
    }
    .futureStep{
        color:#999;
    }
    .resetSteps{
        list-style:none;
    }

</style>
