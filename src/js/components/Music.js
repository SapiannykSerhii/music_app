// Importing necessary modules and components
import { select, templates } from '.././settings.js';
import utils from '.././utils.js';
import HomePage from './HomePage.js';
import SearchPage from './SearchPage.js';
import DiscoverPage from './DiscoverPage.js';

// Music class definition
class Music {
  // Constructor that initializes the Music class with a list of songs
  constructor(songs){
    const thisMusic = this;

    // Initializing data properties for storing songs, categories, and pages
    thisMusic.data = {};
    thisMusic.data.songs = songs;
    thisMusic.data.categories = [];
    thisMusic.pages = {};

    // Method calls to set up the music application
    thisMusic.getElements();
    thisMusic.generateCategories(); // zostawiamy
    thisMusic.renderCategories();

    // Creating page instances with relevant data
    thisMusic.pages.HomePage = new HomePage(thisMusic.data.songs, thisMusic.data.categories);
    thisMusic.pages.SearchPage = new SearchPage(thisMusic.data.songs);
    thisMusic.pages.DiscoverPage = new DiscoverPage(thisMusic.data.songs, thisMusic.data.categories);
  }

  // Method to get DOM elements related to categories
  getElements(){
    const thisMusic = this;

    // Object to store references to DOM elements
    thisMusic.dom = {};

    // Getting DOM elements for category list and select dropdown
    thisMusic.dom.categoryList = document.querySelector(select.listOf.categories);
    thisMusic.dom.categorySelect = document.querySelector(select.formOf.categoriesSelect);
  } 

  // Method to generate categories based on the songs data
  generateCategories(){
    const thisMusic = this;

    // Looping through each song to extract categories
    for(let song of thisMusic.data.songs){
      const songCategories = song.categories; /* Getting categories of the song */

      // Adding unique categories to the data.categories array
      for(let item of songCategories){
        if(!thisMusic.data.categories.includes(item)){
          thisMusic.data.categories.push(item);
        }
      }
    }
  }

  // Method to render categories to the DOM
  renderCategories(){
    const thisMusic = this;

    // Looping through each category to create and append HTML elements
    for(let category of thisMusic.data.categories){
      const linkHtmlData = {name: category};
      const categoriesListHTML = templates.categoryTemplate(linkHtmlData);
      const categoriesSelectsHTML = templates.categorySelectTemplate(linkHtmlData);

      // Creating DOM elements from the HTML strings
      const categoryListDOM = utils.createDOMFromHTML(categoriesListHTML);
      const categorySelectDOM = utils.createDOMFromHTML(categoriesSelectsHTML);

      // Appending the created DOM elements to the respective parent elements
      thisMusic.dom.categoryList.appendChild(categoryListDOM);
      thisMusic.dom.categorySelect.appendChild(categorySelectDOM);
    }
  }
}

// Exporting the Music class for use in other parts of the application
export default Music;