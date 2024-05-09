// Importing necessary modules and classes
import SongList from './SongList.js';
import {classNames, select} from './../settings.js';
import MusicPlayer from './MusicPlayer.js';
import utils from '../utils.js';

// HomePage class definition
class HomePage {
  // Constructor that initializes the HomePage class with songs data and categories
  constructor(songsData, categories) {
    const thisHomePage = this;

    // Initializing data properties for storing songs and categories
    thisHomePage.data = {};
    thisHomePage.data.songs = songsData; /* Storing the provided songs data */
    // console.log(thisHomePage.data.songs);
    thisHomePage.data.categories = categories; /* Storing the provided categories */

    // Method calls to set up the home page
    thisHomePage.getElements();
    thisHomePage.renderSongs();
    thisHomePage.filterByCategories();
  }

  // Method to get DOM elements related to the home page
  getElements() {
    const thisHomePage = this;

    // Object to store references to DOM elements
    thisHomePage.dom = {};
    thisHomePage.dom.wrapper = document.querySelector(select.containerOf.homePage);
    // console.log(thisHomePage.dom.wrapper);
    thisHomePage.dom.categoryList = document.querySelector(select.listOf.categories);
    // console.log(thisHomePage.dom.categoryList);
    thisHomePage.dom.categoryLinks = document.querySelectorAll(select.linksOf.categories);
  }

  // Method to render songs on the home page
  renderSongs() {
    const thisHomePage = this;

    // Looping through the songs data and creating SongList instances
    for (let songData in thisHomePage.data.songs) {
      new SongList(thisHomePage.data.songs[songData], thisHomePage.dom.wrapper);
    }
    thisHomePage.initWidgets();/* Initialize widgets after rendering songs */
  }

  // Method to filter songs by categories
  filterByCategories() {
    const thisHomePage = this;

    // Variable to store the active category
    let activeCategory = '';

    // Adding click event listener to the category list
    thisHomePage.dom.categoryList.addEventListener('click', function (event) {
      event.preventDefault();

      // Reset the wrapper content
      utils.resetWrapper(thisHomePage.dom.wrapper);

      const category = event.target;

      if(category.classList.contains(classNames.categories.isCategory)) {
        const categoryName = category.getAttribute(select.attributesOf.category);

        // Check if the clicked category is not already active
        if (!category.classList.contains(classNames.categories.active)) {
          thisHomePage.resetCategories();
          category.classList.add(classNames.categories.active);
          activeCategory = categoryName;
          // console.log(activeCategory);

          // Loop through the songs data and render songs that match the active category
          for (let songData in thisHomePage.data.songs) {
            const songCategories = thisHomePage.data.songs[songData].categories;
            // console.log(songCategories);
          
            if (songCategories.includes(activeCategory)) {
              new SongList(thisHomePage.data.songs[songData], thisHomePage.dom.wrapper);
            }
          }
          // Initialize widgets after filtering
          thisHomePage.initWidgets();
        } else {
          // If the category is already active, remove the active class and reset the view
          category.classList.remove(classNames.categories.active);
          activeCategory = '';
          thisHomePage.renderSongs(); /* Render all songs again */
        }
      }
    });
  }

  // Method to reset all category links to inactive
  resetCategories() {
    const thisHomePage = this;

    // All category link elements
    const allCategoryLinks = thisHomePage.dom.categoryLinks;

    // Loop through each category link and remove the active class
    for (let categoryLink of allCategoryLinks) {
      categoryLink.classList.remove(classNames.categories.active);
    }
  }

  // Method to initialize widgets on the home page
  initWidgets() {
    // Create a new MusicPlayer instance for the home page
    new MusicPlayer(select.player.homePage);
  }
}

export default HomePage;