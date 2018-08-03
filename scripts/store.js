'use strict';
/* global $ cuid*/
/* eslint-disable-next-line no-unused-vars */

const STORE = (function() {

  let addButtonToggle = false;

  const addItem = function(item) {
    this.bookmarks.push(item);
  };

  const findById = function (id) {
    return this.bookmarks.find(item => item.id === id);
  };

  const findAndUpdate = function(id, newData) {
    const currentData = this.findById(id);
    Object.assign(currentData, newData);
  };

  const findAndDelete = function(id) {
    this.bookmarks = this.bookmarks.filter(item => item.id !== id);
  };  


  return {
    bookmarks: [],
    addButtonToggle,
    addItem,
    findById,
    findAndUpdate,
    findAndDelete,
  };

}());
