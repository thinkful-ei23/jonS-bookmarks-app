'use strict';
/* global $ cuid*/
/* eslint-disable-next-line no-unused-vars */

const STORE = (function() {

  let addButtonToggle = false;
  // bookmark examples to test - DELETE when done testing
  // const bookmarks = [{
  //   id: cuid(),
  //   title: 'Article on jQuery',
  //   url: 'www.jQuery.com',
  //   desc: 'helpful doc on jQuery',
  //   rating: 5,
  //   expanded: false
  // }];

  const addItem = function(item) {
    console.log(`Adding the following Bookmark: ${item.title}`);
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
    // expandedView: {expanded: false},
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