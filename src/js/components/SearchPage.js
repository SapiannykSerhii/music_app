// Importing the necessary classes and objects from other modules
import SongList from './SongList.js';
import { select } from './../settings.js';
import utils from '../utils.js';
import MusicPlayer from './MusicPlayer.js';

// Defining the SearchPage class
class SearchPage {
  // Constructor to set up the SearchPage with the provided songs data
  constructor(songsData) {
    const thisSearchPage = this;

    // Storing the songs data in the object
    thisSearchPage.data = {};
    thisSearchPage.data.songs = songsData;

    // Initializing the page by getting elements, rendering songs, and initializing widgets
    thisSearchPage.getElements();
    thisSearchPage.renderSongs();
    thisSearchPage.initWidgets();
  }

  // Method to get the main DOM elements used in the SearchPage
  getElements() {
    const thisSearchPage = this;

    // Storing the main wrapper element for the search page
    thisSearchPage.dom = {};
    thisSearchPage.dom.wrapper = document.querySelector(select.containerOf.searchPage);
  }

  // Method to handle the rendering of songs based on search criteria
  renderSongs() {
    const thisSearchPage = this;

    // Getting the search button, input, and message elements from the DOM
    const button = document.querySelector(select.searchElements.button);
    const input = document.getElementById(select.searchElements.input);
    const searchMessage = document.querySelector(select.searchElements.text);

    // Variables to store the number of matched songs and the array of matched songs
    let numberOfSongs = 0;
    let matchedSongs = [];

    // Getting the category select element
    const categoriesSelect = document.getElementById('categories__select');

    // Adding an event listener to the search button
    button.addEventListener('click', function () {
      // Resetting the wrapper and search message
      utils.resetWrapper(thisSearchPage.dom.wrapper);
      searchMessage.innerHTML = '';

      // Resetting the number of songs and matched songs array
      numberOfSongs = 0;
      matchedSongs = [];

      // Getting the selected category from the select element
      let selectedCategory = categoriesSelect.value;

      // If no input and the 'first' category is selected, add all songs to matchedSongs
      if(input.value === '' && selectedCategory === 'first'){
        for (let songData in thisSearchPage.data.songs){
          matchedSongs.push(thisSearchPage.data.songs[songData]);
        } 
      } else {
        // If there is input, find songs that match the input value
        if(input.value !== ''){
          for (let songData in thisSearchPage.data.songs){
            if (thisSearchPage.data.songs[songData].filename.toString().toUpperCase().includes(input.value.toUpperCase())) {
              matchedSongs.push(thisSearchPage.data.songs[songData]);
            } 
          }
        }
        
        // Find songs that match the selected category
        for (let songData in thisSearchPage.data.songs){
          const songCategories = thisSearchPage.data.songs[songData].categories;
          if (songCategories.includes(selectedCategory)){
            if(!matchedSongs.includes(thisSearchPage.data.songs[songData])){
              matchedSongs.push(thisSearchPage.data.songs[songData]);
            }
          }
        }
      }

      // For each matched song, create a new SongList instance and add it to the page
      for (let song of matchedSongs){
        new SongList(song, thisSearchPage.dom.wrapper);
      }
      
      // Re-initialize widgets after rendering songs
      thisSearchPage.initWidgets();

      // Update the number of songs found and display the appropriate message
      numberOfSongs = matchedSongs.length;
      numberOfSongs == 1 ? searchMessage.innerHTML = `We found ${numberOfSongs} song...` : searchMessage.innerHTML = `We found ${numberOfSongs} songs...`;
    });
  }

  // Method to initialize widgets, such as the music player
  initWidgets() {
    new MusicPlayer(select.player.searchPage) ;
  }
}
// Exporting the SearchPage class for use in other parts of the application
export default SearchPage;





    