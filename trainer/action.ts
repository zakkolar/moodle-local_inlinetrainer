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

    exportStepCompletion() {
        const data = {};
        for (const step of this.steps){
            data[step.identifier] = step.complete;
        }
        return data;
    }

    initWatchSteps() {
        const reversedSteps = this.steps.slice().reverse();
        for (const step of reversedSteps){
            step.initWatch();
        }
    }

    initCurrentStep() {
        const reversedSteps = this.steps.slice().reverse();
        for (const index in reversedSteps){
            if (reversedSteps[index].complete){
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
                if (action.currentStep.complete){
                    action.incrementStep();
                }
            });
            this.currentStep.watchComplete();
        }
        if (index > 0) {
            const action = this;
            this.previousStep = this.steps[index - 1];
            this.previousStepSubscription = this.previousStep.subscribe(function(){
                if (!action.previousStep.complete) {
                    action.decrementStep();
                }
            });
        } else {
            this.previousStep = null;
            this.previousStepSubscription = null;
        }

    }

    markComplete() {
        this.complete = true;
        this.currentStep = null;
        if (this.currentStepSubscription != null) {
            this.currentStep.unsubscribe(this.currentStepSubscription);
        }
    }

    incrementStep() {
        let nextStepIndex = this.currentStepIndex() + 1;
        while (nextStepIndex < this.steps.length && this.steps[nextStepIndex].complete) {
            nextStepIndex++;
        }
        if (nextStepIndex > this.steps.length) {
            this.markComplete();
        } else {
            this.setCurrentStep(this.steps[nextStepIndex]);
        }
    }

    decrementStep() {
        const previousStepIndex = this.currentStepIndex() - 1;
        if (previousStepIndex >= 0) {
            this.setCurrentStep(this.steps[previousStepIndex]);
        }

    }

    initSteps() {
        this.initWatchSteps();
        this.initCurrentStep();

    }

    resetSteps() {
        const reversedSteps = this.steps.slice().reverse();
        for (const step of reversedSteps){
            step.complete = false;
        }
        this.setCurrentStep(this.steps[0]);
    }

}
