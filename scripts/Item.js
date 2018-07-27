'use strict';
/* global $ cuid*/

const Item = (function() {
  const validateLink = function(link) {
    if(!link) throw new TypeError('Please provide a link');
  };

  const create = function(title, url, desc, rating) {
    return {
      id: cuid(),
      title, 
      url,
      desc,
      rating,
      expanded: false,
    };
  };

  return {
    validateLink,
    create
  };

}());