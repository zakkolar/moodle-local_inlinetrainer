function findGetParameter(parameterName) {
    var result = null,
        tmp = [];
    location.search
        .substr(1)
        .split("&")
        .forEach(function (item) {
            tmp = item.split("=");
            if (tmp[0] === parameterName) result = decodeURIComponent(tmp[1]);
        });
    return result;
}
export const RouteLoaded=function(route, extras?){
  let routeLoaded = window.location.pathname===route;
  if(extras.parameters && extras.parameters.length>0){
      for(let i = 0; i < extras.parameters.length; i++) {
        const parameter = extras.parameters[i][0];
        const val = extras.parameters[i][1];

        routeLoaded = routeLoaded && findGetParameter(parameter)===val;
      }
  }
  return routeLoaded;
}
