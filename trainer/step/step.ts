import {GUID} from '../helpers/guid';
const locks = require('locks');
/**
 * @class
 * @property {string} text The human-readable text of the step.
 * @property {boolean} _complete The internal flag that keeps track of the status of the step. Should never be set manually.
 */
export class Step {
    text: string;
    private _complete: boolean;
    private _watchCompleteFunction: Function;
    private _watchUncompleteFunction: Function;
    private _unwatchCompleteFunction: Function;
    private _unwatchUncompleteFunction: Function;
    private _checkCompleteFunction;
    help: Function;
    optional: boolean;
    private _prerequisites: Step[];
    private _postrequisites: Step[];
    private _subscriptions: Map<string, Function>;
    private _id: string;
    private _postrequisiteSubscriptions: Map<string, Step>;
    private _prerequisiteSubscriptions: Map<string, Step>;
    private _skipPrerequisitesOnInit: boolean;
    identifier: string;
    persistent: boolean;
    manualComplete: boolean;
    completeMessage: string;
    private _completeLock;

    constructor(params){
        this.text = params.text || null;
        this._complete = false;
        this._watchCompleteFunction = params.watchComplete || function(callback){};
        this._watchUncompleteFunction = params.watchUncomplete || function(callback){};
        this._unwatchCompleteFunction = params.unwatchComplete || function(){};
        this._unwatchUncompleteFunction = params.unwatchUncomplete || function(){};
        this.help = params.help || null;
        this.optional = params.optional || false;
        this._prerequisites = params.prerequisites || new Array<Step>();
        this._postrequisites = params.postrequisites || new Array<Step>();
        this._subscriptions = new Map<string, Function>();
        this._id = GUID();
        this._postrequisiteSubscriptions = new Map<string, Step>();
        this._prerequisiteSubscriptions = new Map<string, Step>();
        this._checkCompleteFunction = params.checkComplete || function(resolve){resolve(false)};
        this.identifier = params.identifier;
        this.persistent = params.persistent || false;
        this._skipPrerequisitesOnInit = params.skipPrerequisitesOnInit || false;
        this._completeLock = locks.createReadWriteLock();
        this.manualComplete = params.manualComplete || false;
        this.completeMessage = params.completeMessage || null;

    }

    /**
     * Get the ID of the step
     * @returns {string} ID of the step
     */
    id(){
        return this._id;
    }

    /**
     * Adds a postrequisite to the step
     * @param step Step to add as a postrequisite
     */
    addPostrequisite(step: Step) {
        this._postrequisites.push(step);
    }

    async postrequisitesComplete(){
        let step = this;
        for(const postrequisite of step._postrequisites){
            if(await postrequisite.isComplete()){
                return true;
            }
        }
        return false;
    }

    async prerequisitesComplete(){
        let step = this;
        for(let prerequisite of step._prerequisites){
            if(!await prerequisite.isComplete()){
                return false;
            }
        }
        return true;
    }

    checkComplete(init:boolean=true){
        let step = this;

            let checkComplete = new Promise(step._checkCompleteFunction);
            checkComplete.then(async (complete)=>{
                let prerequisitesComplete = await step.prerequisitesComplete();

                let postrequisitesComplete = await step.postrequisitesComplete();

                this._completeLock.writeLock(()=>{

                if(!prerequisitesComplete && (!init || (init && !step._skipPrerequisitesOnInit))){
                    step.complete = false;
                }
                else if(complete || postrequisitesComplete){
                    step.complete=true;
                }
                step._completeLock.unlock();
            });
        });
    }

    watchPostrequisites(){
        let step = this;
        for(let postrequisite of step._postrequisites){
            postrequisite.subscribe(function(){
                step.checkComplete();
            });
        }
    }

    watchPrerequisites(){
        const step = this;
        for(const prerequisite of step._prerequisites){
            prerequisite.subscribe(function(){
                step.checkComplete();
            });
        }
    }

    watchComplete(){
        const step = this;
        step._watchCompleteFunction(function(){
            step.checkComplete();
        });

    }

    watchUncomplete() {
        let step = this;
        step._watchUncompleteFunction(async function(){
            if(! await step.postrequisitesComplete()){
                step.complete = false;
            }
        })
    }

    initWatch(){
        let step = this;
        step.watchPostrequisites();
        step.watchPrerequisites();
        step.watchComplete();
        step.checkComplete(true);
    }

    isComplete(){
        let step = this;
        return new Promise(function(resolve){
            step._completeLock.readLock(function(){
                resolve(step.complete);
                step._completeLock.unlock();
            })
        });
    }

    get complete(){
        return this._complete;
    }

    set complete(complete: boolean){
        let step=this;
        let old = this._complete;
        this._complete = complete;
        if(old!=complete){
            if(complete){
                this._unwatchCompleteFunction();
                this.watchUncomplete();
            }
            else{
                this._unwatchUncompleteFunction();
                this.watchComplete();
            }

            this._subscriptions.forEach((subscription: Function, key: string)=>{
                subscription(step);
            });
        }
    }

    subscribe(subscription: Function): string{
        let key: string;
        do{
            key = GUID();
        }
        while(this._subscriptions.has(key));
        this._subscriptions.set(key,subscription);
        return key;
    }

    unsubscribe(key){
        this._subscriptions.delete(key);
    }
}
