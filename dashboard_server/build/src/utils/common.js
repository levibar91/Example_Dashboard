"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function createNewTypeOf() {
    return {};
}
exports.createNewTypeOf = createNewTypeOf;
function getOrAdd(dictionary, key, createFunction) {
    if (dictionary[key] != undefined)
        return dictionary[key];
    return createFunction ? dictionary[key] = createFunction() : createNewTypeOf();
}
exports.getOrAdd = getOrAdd;
function addOrUpdate(dictionary, key, updateFunction, createFunction) {
    if (dictionary[key] == undefined)
        dictionary[key] = createFunction ? dictionary[key] = createFunction() : createNewTypeOf();
    else
        dictionary[key] = updateFunction(dictionary[key]);
}
exports.addOrUpdate = addOrUpdate;
