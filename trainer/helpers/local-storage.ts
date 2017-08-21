import {CACHE_EXPIRATION, CACHE_PREFIX} from "../settings";

const lscache = require('lscache');

export const LocalStorage = {
  set(key, val){
      lscache.setBucket(CACHE_PREFIX+".");
      lscache.set(key, val, CACHE_EXPIRATION);
  },
  get(key){
      lscache.setBucket(CACHE_PREFIX+".");
      return lscache.get(key);
  }
};