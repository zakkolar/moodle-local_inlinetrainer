import {Step} from './step';

import {OnRouteLoad, OffRouteLoad} from '../helpers/on-route-load';
import {OnRouteUnload, OffRouteUnload} from '../helpers/on-route-unload';
import {RouteLoaded} from '../helpers/route-loaded';
/**
 * RouteStep is a Step that is completed by a particular route being loaded.
 */
export class RouteStep extends Step {
    constructor(params) {
        const routeParams = {
            watchComplete: function(callback){
                OnRouteLoad(params.route, this.id(), callback);
            },
            watchUncomplete: function(callback){
                OnRouteUnload(params.route, this.id(), callback);
            },
            unwatchComplete: function(){
                OffRouteLoad(this.id());
            },
            unwatchUncomplete: function(){
                OffRouteUnload(this.id());
            },
            checkComplete: function(){
                return RouteLoaded(params.route, params.routeExtras || {});
            },
        };
        const allParams = Object.assign(params, routeParams);
        super(allParams);
    }
}
