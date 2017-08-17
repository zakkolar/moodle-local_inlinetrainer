import {Action} from "../Action";
import {Category} from "../category";

let lscache = require('lscache');
const expiration = 20;

function setBucket(){
    lscache.setBucket('zk_inline_trainer.tabs');
}
setBucket();

export const TabSettings = {
    namespaced:true,
    state:{
      actions:lscache.get('actions') || {all:[],recents:[],favorites:[]},
        categories:lscache.get('categories') || [],
        tabIndex: lscache.get('tabIndex') || 0,
        open: lscache.get('open')!=null ? lscache.get('open') : true


    },
    mutations:{
        addAction(state, params){
            const action:Action = params.action;
            const tab = params.tab;
            if(state.actions[tab].indexOf(action.identifier)==-1){
                state.actions[tab].push(action.identifier);
            }
            setBucket();
            lscache.set('actions', state.actions, expiration);
        },
        removeAction(state, params){
            const action:Action = params.action;
            const tab = params.tab;
          const index = state.actions[tab].indexOf(action.identifier);

          if(index>-1){
              state.actions[tab].splice(index, 1);
          }
            setBucket();
          lscache.set('actions', state.actions, expiration);
        },
        addCategory(state, category:Category){
            if(state.categories.indexOf(category.identifier())==-1){
                state.categories.push(category.identifier());
            }
            setBucket();
            lscache.set('categories', state.categories, expiration);
        },
        removeCategory(state, category:Category){
            const index = state.categories.indexOf(category.identifier());
            if(index>-1){
                state.categories.splice(index, 1);
            }
            setBucket();
            lscache.set('categories', state.categories, expiration);
        },
        setTabIndex(state, index){
            state.tabIndex = index;
            setBucket();
            lscache.set('tabIndex', index);
        },
        setOpen(state, open){
            state.open = open;
            setBucket();
            lscache.set('open', open, expiration);
        }

    },
    actions:{
        addAction(context, action:Action) {
            context.commit('addAction', action);
        },
        removeAction(context, action:Action){
            context.commit('removeAction',action);
        },
        addCategory(context, category:Category) {
            context.commit('addCategory', category);
        },
        removeCategory(context, category:Category){
            context.commit('removeCategory',category);
        },
        setTabIndex(context, index){
            context.commit('setTabIndex', index);
        },
        setOpen(context, open){
            context.commit('setOpen', open);
        }
    },
    getters:{
        actions(state){
            return state.actions;
        },
        categories(state){
            return state.categories;
        },
        tabIndex(state){
            return state.tabIndex;
        },
        open(state){
            return state.open;
        }
    }
};