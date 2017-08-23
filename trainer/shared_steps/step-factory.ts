export const StepFactory = function(type, params){
    return function(){
        return new type(params);
    }
}