'use strict';
/* global $ cuid*/
/* eslint-disable-next-line no-unused-vars */

const STORE = (function() {

  const findById = function (id) {
    return this.items.find(item => item.id === id);
  };

  const addItem = function(item) {
    this.items.push(item);
  };

  const findAndUpdate = function(id, newData) {
    const currentData = this.findById(id);
    Object.assign(currentData, newData);
  };

  const findAndDelete = function(id) {
    this.items = this.items.filter(item => item.id !== id);
  };


  return {
    bookmarks:[],
    findById,
    addItem,
    findAndUpdate,
    findAndDelete
  };

}());



// const addItems = [{
//   id: cuid(),
//   title: 'Article on jQuery',
//   url: 'www.jquery.com',
//   desc: 'Lorem ipsum dolor sit amet',
//   rating: 5,
//   expanded: true,
// }];

// const adding = false;
// const error = false;