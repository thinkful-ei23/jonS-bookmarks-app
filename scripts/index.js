'use strict';
/* global $ api bookmarkList STORE */


$(document).ready(function() {
  bookmarkList.bindEventListeners();
  api.getBookmark(items => {
    items.forEach(item => STORE.addItem(item));
    bookmarkList.render();
  });
});
