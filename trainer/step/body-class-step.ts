import {Step} from './step';

import {OnRouteLoad, OffRouteLoad} from '../helpers/on-route-load';
import {OnRouteUnload, OffRouteUnload} from '../helpers/on-route-unload';
import {RouteLoaded} from '../helpers/route-loaded';
import {CheckHasClass} from "../helpers/check-has-class";
/**
 * RouteStep is a Step that is completed by a particular route being loaded.
 */
export class BodyClassStep extends Step {
    constructor(params) {
        const routeParams = {
            watchComplete: function(callback){

            },
            watchUncomplete: function(callback){

            },
            unwatchComplete: function(){

            },
            unwatchUncomplete: function(){

            },
            checkComplete: function(resolve){
                resolve(CheckHasClass('body',params.className));
            },
        };
        const allParams = Object.assign(params, routeParams);
        super(allParams);
    }
}
