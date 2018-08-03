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
                <label>Title:<br></label><input type="text" name="title" id="bookmark-title" placeholder="Title" required aria-required="true"/>
                
              </div>
              <div class="input-group">
                <label>URL:<br></label><input type="url" name="url" id="bookmark-url" placeholder="http(s)://example.com" required aria-required="true"/>
                
              </div>
              <div class="input-group">
                <label>Description:<br></label><textarea type="text" name="desc" id="bookmark-description" placeholder="Brief description" rows="5"
                cols="30" aria-multiline="true" aria-required="false"></textarea>
              </div>

              <form class="input-group" role="radiogroup">
                Rating:<br>
                <input type="radio" name="rating" role="radio" tabindex="0" id="bookmark-rating" value="5" checked>5 Stars
                <input type="radio" name="rating" role="radio" tabindex="-1" id="bookmark-rating" value="4">4 Stars
                <input type="radio" name="rating" role="radio" tabindex="-1" id="bookmark-rating" value="3">3 Stars
                <input type="radio" name="rating" role="radio" tabindex="-1" id="bookmark-rating" value="2">2 Stars
                <input type="radio" name="rating" role="radio" tabindex="-1" id="bookmark-rating" value="1">1 Star
              </form>

              <div class="error-display">
              </div>

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
    $('.add-button').on('click', (e) => {
      e.preventDefault();
      $('#js-bookmark-form-section').html(generateAddBookmarkElement);
      $('.js-bookmark-list-container').submit(e => {
        e.preventDefault();
        if ($('.input-group #bookmark-title').val() === '') {
          $('.error-display').html('<p>Title Required</p>').addClass('error-red');
        }
        if ($('.input-group #bookmark-url').val() === '') {
          $('.error-display').html('<p>URL Required</p>').addClass('error-red');
        }

        const newBookmark = $(e.target).serializeJson();
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
      const ratingSelected = $('.star-filter option:selected').val();
      if (ratingSelected === '') {
        render();
      }
      const filteredBookmarks = STORE.bookmarks.filter(x => x.rating >= ratingSelected);
      const listFilteredBookmark = generateBookmarkString(filteredBookmarks);
      $('.js-saved-bookmark-list').html(listFilteredBookmark);

    });
  };

  const handleVisitSite = function() {
    $('.js-saved-bookmark-list').on('click', '.visit-site', function(e) {
      e.preventDefault();
      const dataItemId = $(e.currentTarget).closest('.saved-bookmark').attr('data-item-id');
      const findItemById = STORE.findById(dataItemId);
      const visitSiteLink = findItemById.url;
      window.open(visitSiteLink);
    });
  };

  const handleDeleteBookmark = function() {
    $('.js-saved-bookmark-list').on('click', '.delete-bookmark', (e) => {
      e.preventDefault();
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
        <li class="saved-bookmark js-saved-bookmark-list grid halves" data-item-id="${item.id}">
          <span class="bookmark-title grid column">${item.title}</span>
          <span class="bookmark-rating column">Rating: ${item.rating}</span>
          <textarea name="bookmark-description" class="bookmark-description grid column" rows="5"
          cols="30" readonly>${item.desc}</textarea>

          <button class="visit-site expanded-button">Visit Site</button>
          <button class="delete-bookmark expanded-button">Delete</button>
          <button class="compress-bookmark expanded-button">Compress</button>
        </li>
      `;
    } else {
      return `
        <li class="saved-bookmark js-saved-bookmark-list grid halves" data-item-id="${item.id}">
          <span class="bookmark-title grid column">${item.title}</span>
          <span class="bookmark-rating column">Rating: ${item.rating}</span>
          <button class="expand-button column">Expand </button>
        </li>
      `;
    }
  };

  const generateBookmarkString = function (bookmarkList) {
    const items = bookmarkList.map((item) => generateBookmarkElement(item));
    return items.join('');
  };  

  const render = function () {
    const bookmarkString = generateBookmarkString(STORE.bookmarks);
    $('.js-saved-bookmark-list').html(bookmarkString);

    $('.input-group #bookmark-title').val('');
    $('.input-group #bookmark-url').val('');
    $('.input-group #bookmark-description').val('');
  };

  const bindEventListeners = function() {
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