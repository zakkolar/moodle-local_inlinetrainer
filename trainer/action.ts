import {Step} from './step/step';

export class Action {
    name: string;
    favorite: boolean;
    steps: Step[];
    shown: boolean;
    help: string;
    currentStep: Step;
    previousStep: Step;
    complete: boolean;
    currentStepSubscription: string;
    previousStepSubscription: string;
    identifier: string;

    constructor(args) {
        this.name = args.name;
        this.favorite = false;
        this.shown = false;
        this.steps = args.steps || [];
        this.help = args.help;
        this.currentStep = null;
        this.currentStepSubscription = null;
        this.previousStepSubscription = null;
        this.complete = false;
        this.identifier = args.identifier;

    }

    importStepCompletion(data) {
        for (const step of this.steps){
            if (data.hasOwnProperty(step.identifier)){
                step.complete = data[step.identifier];
            }
        }
    }

    async exportStepCompletion() {
        const data = {};
        for (const step of this.steps){
            data[step.identifier] = await step.isComplete();
        }
        return data;
    }

    initWatchSteps() {
        const reversedSteps = this.steps.slice().reverse();
        for (const step of reversedSteps){
            step.initWatch();
            step.subscribe(()=>{
                this.determineCurrentStep();
            })
        }
    }

    async determineCurrentStep() {
        const reversedSteps = this.steps.slice().reverse();
        for (const index in reversedSteps){
            let complete = await reversedSteps[index].isComplete();
            if (complete){
                if (parseInt(index) > 0) {
                    this.setCurrentStep(reversedSteps[parseInt(index) - 1]);
                    break;
                }
            }
        }
        if(this.currentStep == null){
            if(this.steps.length > 0){
                this.setCurrentStep(this.steps[0]);
            }
        }
    }

    currentStepIndex(){
        return this.steps.indexOf(this.currentStep);
    }

    setCurrentStep(step: Step){
        const index = this.steps.indexOf(step);
        if (this.currentStepSubscription != null){
            this.currentStep.unsubscribe(this.currentStepSubscription);
        }
        if (this.previousStepSubscription != null){
            this.previousStep.unsubscribe(this.previousStepSubscription);
        }
        if (index >= 0) {
            const action = this;
            this.currentStep = this.steps[index];
            this.currentStepSubscription = this.currentStep.subscribe(function(){
                action.currentStep.isComplete().then(function(complete){
                    if (complete){
                        action.incrementStep();
                    }
                });
            });
            this.currentStep.watchComplete();
        }
        if (index > 0) {
            const action = this;
            this.previousStep = this.steps[index - 1];
            this.previousStepSubscription = this.previousStep.subscribe(function(){
                action.previousStep.isComplete().then(function(complete){
                    if (!complete) {
                        action.decrementStep();
                    }
                });

            });
        } else {
            this.previousStep = null;
            this.previousStepSubscription = null;
        }

    }

    markComplete() {
        this.complete = true;
    }

    markUncomplete(){
        this.complete = false;
    }

    async incrementStep() {
        let nextStepIndex = this.currentStepIndex();
        let complete;
        do{
            nextStepIndex++;
            if(nextStepIndex < this.steps.length){
                complete = await this.steps[nextStepIndex].isComplete();
            }
        }
        while (nextStepIndex < this.steps.length && complete);

        if (nextStepIndex >= this.steps.length) {
            this.markComplete();
        } else {
            this.markUncomplete();
            this.setCurrentStep(this.steps[nextStepIndex]);
        }
    }

    async decrementStep() {
        let previousStepIndex = this.currentStepIndex();
        let complete;
        do{
            previousStepIndex--;
            if(previousStepIndex>=0){
                complete = await this.steps[previousStepIndex].isComplete();
            }
        } while (previousStepIndex>=0 && !complete);

        previousStepIndex++;

        if(previousStepIndex<this.steps.length){
            this.setCurrentStep(this.steps[previousStepIndex]);
        }


    }

    initSteps() {
        this.initWatchSteps();
        this.determineCurrentStep();

    }

    resetSteps() {
        const reversedSteps = this.steps.slice().reverse();
        for (const step of reversedSteps){
            step.complete = false;
        }
        this.setCurrentStep(this.steps[0]);
    }

}
