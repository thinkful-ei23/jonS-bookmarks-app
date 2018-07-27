'use strict';
/* global $ */

const api = (function() {

  const BASE_URL = 'https://thinkful-list-api.herokuapp.com';

  const getBookmark = function(callback) {
    $.getJSON(`${BASE_URL}/jon/bookmarks`, callback);
  };


  const createBookmark = function(addData, callback) {
    const query = {
      url: `${BASE_URL}/jon/bookmarks`,
      method: 'POST',
      contentType: 'application/json',
      data: addData,
      success: callback,
    };
    $.ajax(query);
  };

  // -- UPDATING is not required for the project--
  // const updateBookmark = function(id, updateData, callback) {
  //   const query = {
  //     url: `${BASE_URL}/jon/bookmarks/${id}`,
  //     method: 'PATCH',
  //     contentType: 'application/json',
  //     data: JSON.stringify(updateData),
  //     success: callback
  //   };
  //   $.ajax(query);
  // };

  const deleteBookmark = function(id, callback) {
    const query = {
      url: `${BASE_URL}/jon/bookmarks/${id}`,
      method: 'DELETE',
      contentType: 'application/json',
      success: callback
    };
    $.ajax(query);
  };

  return {
    getBookmark,
    createBookmark,
    // updateBookmark,
    deleteBookmark
  };

}());