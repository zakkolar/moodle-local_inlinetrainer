export const Timestamp = function(){
    return Math.round((new Date()).getTime() / 1000);
};