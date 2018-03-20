<template>
    <div class="action">
        <div class="clearfix">
            <div class="float-left" style="width:75%">
                <a href="#" @click="toggleOpen">
                    <span class="float-left">
                        <chevron :open="open"></chevron>
                    </span>
                    <b-popover class="zk_inlinetrainer" placement="left" triggers="hover" :content="action.description">
                        <span class="action-name float-left">{{action.name}}</span>
                    </b-popover>
                </a>
            </div>
            <div class='float-right icons' style="width:25%">
                <a class='star float-right' @click="removeFavorite" href="#" v-if="favorite"><i class="fa fa-star star" aria-hidden="true"></i></a>
                <a class='star float-right' @click="addFavorite" href="#"  v-if="!favorite"><i class="fa fa-star-o star" aria-hidden="true"></i></a>
                <a :href='action.help' v-if="action.help" target='_blank' class='pull-right'><span class="sr-only">More information about this action</span><i class='fa fa-info' aria-hidden="true"></i></a>
                <a href="#" @click="showVideo" v-if="action.video" class='pull-right'><span class="sr-only">Watch a video about this action</span><i class="fa fa-film" aria-hidden="true"></i></a>
            </div>
        </div>
        <ol v-if="open">
            <span class='resetSteps' v-if="action.steps[0]!==action.currentStep && action.complete">
                <a href @click="resetSteps" class='text-danger'>(Click to start over)</a>
            </span>
            <li v-for =  "step in action.steps" v-bind:class="{'optional':step.optional,'complete':step.complete, 'futureStep':!step.complete && step!==action.currentStep}">
                <span v-if="step.optional">Optional: </span>
                <a v-if="step.help!=null && step===action.currentStep && !step.complete" href='#' title="Show me how to complete this step" @click="runHelp($event,step)"><i class="fa fa-window-restore" aria-hidden="true"></i></a>
                {{step.text}}
                <p v-if="step.optional && step===action.currentStep  && !step.complete"> <a href="#" @click="skipStep($event, step)">(skip step)</a></p>
                <p v-if="step.manualComplete && step===action.currentStep && !step.complete"><a href="#" @click="skipStep($event, step)">(click to mark step complete)</a></p>
                <p v-if="step.noTrainer && step===action.currentStep && !step.complete">
                    The trainer is unable to display on the page for the next step.
                    <span v-if="step.popupContent || step.popupVideo"><br><a href="#" @click="openStepWindow($event,step)">Click to open a new window with information about the next step.</a></span>
                </p>
                <p class="no-strike" v-if="step.completeMessage && step.complete">{{step.completeMessage}}</p>
            </li>
            <li class='resetSteps' v-if="action.steps[0]!==action.currentStep">
                <a href @click="resetSteps" class='text-danger'>(Click to start over)</a>
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
    import {
        ACTION_CLOSE,
        ACTION_OPEN,
        FAVORITE_ADD,
        FAVORITE_REMOVE, POPUP_TRAINER_CLOSE, POPUP_TRAINER_OPEN,
        STEP_HELP, VIDEO_CLOSE,
        VIDEO_OPEN
    } from "../activity/activity-type";
    import {ActionActivityWatcher} from "../activity/action-activity";
    import {ShowVideo} from "../helpers/show-video";
    import {LaunchNewTrainer} from "../helpers/launch-new-trainer";
    import {GUID} from "../helpers/guid";

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
                this.updateActivityWatcher();
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
            skipStep:function(e: Event, step:Step){
              e.preventDefault();
              step.complete = true;
            },
            resetSteps:function(e: Event){
                e.preventDefault();
                this.action.resetSteps();
            },
            updateActivityWatcher(){
                if(this.open){
                    ActionActivityWatcher.watchAction(this.action, this.tab);
                }
                else{
                    ActionActivityWatcher.unwatchAction(this.action, this.tab);
                }
            },
            showVideo:function(e:Event){
                e.preventDefault();
                LogActivity(VIDEO_OPEN,{
                    action: this.action.identifier
                });
                ShowVideo(this.action.video, {
                    afterClose:()=>{
                        LogActivity(VIDEO_CLOSE,{
                            action: this.action.identifier
                        });
                    }
                });

            },
            openStepWindow(e:Event, step:Step){
                e.preventDefault();
                const windowID = GUID();
                const window = LaunchNewTrainer(this.action.name,{
                    text: step.popupContent,
                    video: step.popupVideo
                });

                LogActivity(POPUP_TRAINER_OPEN,{
                   action: this.action.identifier,
                   step:step.identifier,
                   window: windowID
                });


                //watch the window and log when it closes
                const checkWindow = ()=>{
                    if(window.closed){
                        LogActivity(POPUP_TRAINER_CLOSE,{
                            action: this.action.identifier,
                            step:step.identifier,
                            window: windowID
                        });
                        clearInterval(timer);
                    }
                }

                const timer = setInterval(checkWindow, 100);


            }

        },
        created(){
            this.updateActivityWatcher();
            ActionActivityWatcher.checkLogActionActivity(this.action);
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
        .no-strike{
            text-decoration:none;
            display:inline-block;
        }
    }
    .futureStep{
        color:#999;
    }
    .resetSteps{
        list-style:none;
    }
    .action-name{
        max-width:80%;
    }

</style>
