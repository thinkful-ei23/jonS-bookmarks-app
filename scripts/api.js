'use strict';
/* global $ */

const api = (function() {

  const BASE_URL = 'https://thinkful-list-api.herokuapp.com';

  const getBookmark = function(callback) {
    $.getJSON(`${BASE_URL}/jon/bookmarks`, callback);
  };

  const createBookmark = function(newAdd, callback) {
    const query = {
      url: `${BASE_URL}/jon/bookmarks`,
      method: 'POST',
      contentType: 'application/json',
      data: newAdd,
      success: callback,
    };
    $.ajax(query);
  };

  const updateBookmark = function(id, updateData, callback) {
    const query = {
      url: `${BASE_URL}/jon/bookmarks/${id}`,
      method: 'PATCH',
      contentType: 'application/json',
      data: JSON.stringify(updateData),
      success: callback
    };
    $.ajax(query);
  };

  const deleteBookmark = function(id, deleteData, callback) {
    const query = {
      url: `${BASE_URL}/jon/bookmarks/${id}`,
      method: 'DELETE',
      contentType: 'application/json',
      data: JSON.stringify(deleteData),
      success: callback
    };
    $.ajax(query);
  };

  return {
    getBookmark,
    createBookmark,
    updateBookmark,
    deleteBookmark
  };

}());