'use strict';
/* global $ cuid*/
/* eslint-disable-next-line no-unused-vars */

const STORE = (function() {

  const bookmarks = [{
    id: cuid(),
    title: 'Article on jQuery',
    description: 'Lorem ipsum dolor sit amet',
    rating: 5, 
    expanded: true,
  }];

  const adding= false;
  const error= false;

  return {
    bookmarks,
    adding,
    error
  };

}());