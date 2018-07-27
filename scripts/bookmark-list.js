'use strict';
/* global $ item STORE api */

const bookmarkList = (function() {

  function generateBookmarkElement(item) {
    
    return `
      <li class="saved-bookmark js-saved-bookmark-list" data-item-id="${item.id}">
        <span class="bookmark-title">${item.title}</span>
        <span class="bookmark-rating">${item.rating}</span>
      </li>
    `;
  }


  function generateBookmarkString(bookmarkList) {
    console.log('`generateBookmarkString` works'); //this runs

    const items = bookmarkList.map((item) => generateBookmarkElement(item));
    return items.join('');
  }



  function render() {
    // this function will be responsible for rendering the bookmarks in the DOM/page
    console.log('`render` ran');
    const bookmarkString = generateBookmarkString(STORE.bookmarks);
    $('.js-saved-bookmark-list').html(bookmarkString);
  }


  function generateAddBookmarkElement(item) {
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
                <input type="text" name="desc" id="bookmark-description" placeholder="brief description"></input>
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
  }  
  
  
  $.fn.extend({
    serializeJson: function () {
      const formData = new FormData(this[0]);
      const o = {};
      formData.forEach((val, name) => o[name] = val);
      return JSON.stringify(o);
    }
  }); 

  function addButtonToggle() {
    $('.add-button').on('click', (e) => {
      e.preventDefault;
      STORE.addButtonToggle = !STORE.addButtonToggle;
    });
  }  

  function handleNewBookmark() {
    // this function will be responsible for when users add a new bookmark
    console.log('`handleNewBookmark` ran');
    
    $('.add-button').on('click', (e) => {
      e.preventDefault();
      // console.log('Add Button works');
      // add add-a-bookmark form html to section id "js-bookmark-form-section"
      $('#js-bookmark-form-section').html(generateAddBookmarkElement);
      // another event to collect user's input when user presses 'Add'
      $('.js-bookmark-list-container').submit(e => {
        e.preventDefault();
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
  }


  function handleDeleteBookmark() {
    // this function will be responsible for when users want to delete a bookmark 
    // NOTE: only available when STORE.bookmarks.expanded = true
    console.log('`handleDeleteBookmark` ran');
  }


  function handleExpandBookmark() {
    // this function will be responsible for when users want to click and expand the bookmark for additional info
    // NOTE: need to switch STORE.bookmarks.expanded to true
    console.log('`handleExpandBookmark` ran');
  }


  function bindEventListeners() {
    // this function will be the callback function when the page loads
    addButtonToggle();
    handleNewBookmark();
    handleDeleteBookmark();
    handleExpandBookmark();
  }


  return {
    render,
    bindEventListeners
  };
}());