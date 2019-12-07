import { Dictionary } from "express-serve-static-core";

export function createNewTypeOf<T>() : T {
  return {} as T;
}

export function getOrAdd<V>(dictionary: Dictionary<V>, key : string, createFunction? : () => V) : V {
  if (dictionary[key] != undefined)
    return dictionary[key];
    
  return createFunction ? dictionary[key] = createFunction() : createNewTypeOf<V>();
}

export function addOrUpdate<V>(dictionary: Dictionary<V>, key : string, updateFunction : (v : V) => V, createFunction? : () => V) : void {
  if (dictionary[key] == undefined)
    dictionary[key] = createFunction ? dictionary[key] = createFunction() : createNewTypeOf<V>();
  else
    dictionary[key] = updateFunction(dictionary[key]);
}