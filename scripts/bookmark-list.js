'use strict';
/* global $ item STORE api */

const bookmarkList = (function() {

  const generateAddBookmarkElement = function() {
    if (STORE.addButtonToggle === false) { 
      return '';
    } else { 
      return `
        <form class="js-bookmark-list-container">
          <fieldset>
            <legend>Create a Bookmark</legend>
            <div class="input-groups">
              <div class="input-group">
                <input type="text" name="title" id="bookmark-title" placeholder="title">
                </label>
              </div>
              <div class="input-group">
                <input type="text" name="url" id="bookmark-url" placeholder="url">
                </label>
              </div>
              <div class="input-group">
                <input type="text" name="desc" id="bookmark-description" placeholder="(Optional) description"></input>
              </div>

              <form class="input-group">
                <input type="radio" name="rating" id="bookmark-rating" value="5" checked>5 Stars
                <input type="radio" name="rating" id="bookmark-rating" value="4">4 Stars
                <input type="radio" name="rating" id="bookmark-rating" value="3">3 Stars
                <input type="radio" name="rating" id="bookmark-rating" value="2">2 Stars
                <input type="radio" name="rating" id="bookmark-rating" value="1">1 Star
              </form>

              <div class="input-group">
                <input type="submit" value="Add" />
              </div>
            </div>
          </fieldset>
        </form>
      `;
    }
  };
  
  $.fn.extend({
    serializeJson: function () {
      const formData = new FormData(this[0]);
      const o = {};
      formData.forEach((val, name) => o[name] = val);
      return JSON.stringify(o);
    }
  }); 

  const addButtonToggle = function() {
    $('.add-button').on('click', (e) => {
      e.preventDefault;
      STORE.addButtonToggle = !STORE.addButtonToggle;
    });
  };

  const handleNewBookmark = function() {
    // this function will be responsible for when users add a new bookmark
    $('.add-button').on('click', (e) => {
      e.preventDefault();
      // console.log('Add Button works');
      // add add-a-bookmark form html to section id "js-bookmark-form-section"
      $('#js-bookmark-form-section').html(generateAddBookmarkElement);
      // another event to collect user's input when user presses 'Add'
      $('.js-bookmark-list-container').submit(e => {
        e.preventDefault();
        if ($('.input-group #bookmark-title').val() === '') {
          // $('.input-group #bookmark-title').addClass('.error-feedback');
          alert('Please provide a title.');
        }
        if ($('.input-group #bookmark-url').val() === '') {
          // $('.input-group #bookmark-title').addClass('.error-feedback');
          alert('Please provide a URL.');
        }
        const newBookmark = $(e.target).serializeJson();
        // const parsedBookmark = JSON.parse(newBookmark);
        // TO-DO: need to figure out how to clear the inputs after submitting 
        api.createBookmark(newBookmark, (response) => {
          STORE.addButtonToggle = false;
          STORE.addItem(response);
          render();
        });
      });
    });
  };

  const handleFilterRating = function() {
    $('select.star-filter').change(e => {
      e.preventDefault();
      console.log('filter rating button works');
      const ratingSelected = $('.star-filter option:selected').val();
      console.log(ratingSelected);
      if (ratingSelected === '') {
        render();
      }
      const filteredBookmarks = STORE.bookmarks.filter(x => x.rating >= ratingSelected);
      console.log(filteredBookmarks); //works - returns the filtered objects in an array
      const listFilteredBookmark = generateBookmarkString(filteredBookmarks);
      $('.js-saved-bookmark-list').html(listFilteredBookmark);

    });
  };

  const handleVisitSite = function() {
    $('.js-saved-bookmark-list').on('click', '.visit-site', function(e) {
      e.preventDefault();
      console.log('handleVisitSite works');
      const dataItemId = $(e.currentTarget).closest('.saved-bookmark').attr('data-item-id');
      console.log(dataItemId);
      const findItemById = STORE.findById(dataItemId);
      console.log(findItemById);
      const visitSiteLink = findItemById.url;
      window.open(visitSiteLink);
    });
  };

  const handleDeleteBookmark = function() {
    // this function will be responsible for when users want to delete a bookmark 
    // NOTE: only available when STORE.bookmarks.expanded = true
    $('.js-saved-bookmark-list').on('click', '.delete-bookmark', (e) => {
      e.preventDefault();
      console.log('`handleDeleteBookmark` ran');
      const dataItemId = $(e.currentTarget).closest('.saved-bookmark').attr('data-item-id');
      api.deleteBookmark(dataItemId, () => {
        STORE.findAndDelete(dataItemId);
        render();
      });
    });
  };

  const handleExpandToggle = function() {
    $('.js-saved-bookmark-list').on('click', '.expand-button', (e) => {
      e.preventDefault();
      const dataItemId = $(e.currentTarget).closest('.saved-bookmark').attr('data-item-id');
      const findItemById = STORE.findById(dataItemId);
      findItemById.expanded = !findItemById.expanded;
      STORE.findAndUpdate(dataItemId, findItemById);
      render();
    });
  };

  const handleCompressButton = function() {
    $('.js-saved-bookmark-list').on('click', '.compress-bookmark', (e) => {
      e.preventDefault();
      const dataItemId = $(e.currentTarget).closest('.saved-bookmark').attr('data-item-id');
      const findItemById = STORE.findById(dataItemId);
      findItemById.expanded = !findItemById.expanded;
      STORE.findAndUpdate(dataItemId, findItemById);
      render();
    });
  };

  const generateBookmarkElement = function(item) {
    if (item.expanded) {
      return `
        <li class="saved-bookmark js-saved-bookmark-list" data-item-id="${item.id}">
          <span class="bookmark-title">${item.title}</span>
          <span class="bookmark-rating">${item.rating}</span>
          <textarea name="bookmark-description" class="bookmark-description">${item.desc}</textarea>

          <button class="visit-site">Visit Site</button>
          
          <button class="delete-bookmark">Delete</button>
          
          <button class="compress-bookmark">Compress</button>
        </li>
      `;
    } else {
      return `
        <li class="saved-bookmark js-saved-bookmark-list" data-item-id="${item.id}">
          <span class="bookmark-title">${item.title}</span>
          <span class="bookmark-rating">${item.rating}</span>
          <button class="expand-button">Expand</button>
        </li>
      `;
    }
  };

  const generateBookmarkString = function (bookmarkList) {
    const items = bookmarkList.map((item) => generateBookmarkElement(item));
    return items.join('');
  };  

  const render = function () {
    // this function will be responsible for rendering the bookmarks in the DOM/page
    const bookmarkString = generateBookmarkString(STORE.bookmarks);
    $('.js-saved-bookmark-list').html(bookmarkString);
  };

  const bindEventListeners = function() {
    // this function will be the callback function when the page loads
    addButtonToggle();
    handleFilterRating();
    handleExpandToggle();
    handleCompressButton();
    handleNewBookmark();
    handleVisitSite();
    handleDeleteBookmark();

  };


  return {
    render,
    bindEventListeners
  };
}());