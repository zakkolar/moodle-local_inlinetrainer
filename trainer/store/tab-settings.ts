import {Action} from "../Action";
import {Category} from "../category";
import {LocalStorage} from "../helpers/local-storage";
export const TabSettings = {
    namespaced:true,
    state:{
      actions:LocalStorage.get('trainer.tabs.actions') || {all:[],recents:[],favorites:[]},
        categories:LocalStorage.get('trainer.tabs.categories') || [],
        tabIndex: LocalStorage.get('trainer.settings.tabIndex') || 0
    },
    mutations:{
        addAction(state, params){
            const action:Action = params.action;
            const tab = params.tab;
            if(state.actions[tab].indexOf(action.identifier)==-1){
                state.actions[tab].push(action.identifier);
            }
            LocalStorage.set('trainer.tabs.actions', state.actions);
        },
        removeAction(state, params){
            const action:Action = params.action;
            const tab = params.tab;
          const index = state.actions[tab].indexOf(action.identifier);

          if(index>-1){
              state.actions[tab].splice(index, 1);
          }
          LocalStorage.set('trainer.tabs.actions', state.actions);
        },
        addCategory(state, category:Category){
            if(state.categories.indexOf(category.identifier())==-1){
                state.categories.push(category.identifier());
            }
            LocalStorage.set('trainer.tabs.categories', state.categories);
        },
        removeCategory(state, category:Category){
            const index = state.categories.indexOf(category.identifier());
            if(index>-1){
                state.categories.splice(index, 1);
            }
            LocalStorage.set('trainer.tabs.categories', state.categories);
        },
        setTabIndex(state, index){
            state.tabIndex = index;
            LocalStorage.set('trainer.settings.tabIndex', index);
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