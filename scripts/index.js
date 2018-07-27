'use strict';
/* global $ api bookmarkList store */


$(document).ready(function() {
  api.getBookmark(items => {
    items.forEach(item => store.addItem(item));
    bookmarkList.render();
    bookmarkList.bindEventListeners();  
  });
});
