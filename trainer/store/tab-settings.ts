import {Action} from "../Action";
import {Category} from "../category";

let lscache = require('lscache');
lscache.setBucket('zk_inline_trainer.tabs');
const expiration = 20;
export const TabSettings = {
    namespaced:true,
    state:{
      actions:lscache.get('actions') || [],
        categories:lscache.get('categories') || [],
        tabIndex: lscache.get('tabIndex') || 0

    },
    mutations:{
        addAction(state, action:Action){
            if(state.actions.indexOf(action.identifier)==-1){
                state.actions.push(action.identifier);
            }
            lscache.set('actions', state.actions, expiration);
        },
        removeAction(state, action:Action){
          const index = state.actions.indexOf(action.identifier);

          if(index>-1){
              state.actions.splice(index, 1);
          }
          lscache.set('actions', state.actions, expiration);
        },
        addCategory(state, category:Category){
            if(state.categories.indexOf(category.identifier())==-1){
                state.categories.push(category.identifier());
            }
            lscache.set('categories', state.categories, expiration);
        },
        removeCategory(state, category:Category){
            const index = state.categories.indexOf(category.identifier());
            if(index>-1){
                state.categories.splice(index, 1);
            }
            lscache.set('categories', state.categories, expiration);
        },
        setTabIndex(state, index){
            state.tabIndex = index;
            lscache.set('tabIndex', index);
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
        }
    }
};