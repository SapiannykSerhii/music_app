// Importing necessary modules and classes
import SongList from './SongList.js';
import { select } from './../settings.js';
import utils from '../utils.js';
import MusicPlayer from './MusicPlayer.js';

// DiscoverPage class definition
class DiscoverPage {
  // Constructor that initializes the DiscoverPage class with songs data and categories
  constructor(songsData, categories) {
    // Reference to the current instance of DiscoverPage
    const thisDiscoverPage = this;

    // Initializing data properties for storing songs, categories, and favorite categories
    thisDiscoverPage.data = {};
    // Storing the provided songs data
    thisDiscoverPage.data.songs = songsData;
    // Storing the provided categories
    thisDiscoverPage.data.categories = categories;
    // Object to store favorite categories
    thisDiscoverPage.data.favoriteCategories = {};

    // Method calls to set up the discover page
    thisDiscoverPage.getElements();
    thisDiscoverPage.updateFavoriteCategories();
    thisDiscoverPage.renderSongs();
  }

  // Method to get DOM elements related to the discover page
  getElements() {
    // Reference to the current instance of DiscoverPage
    const thisDiscoverPage = this;

    // Object to store references to DOM elements
    thisDiscoverPage.dom = {};
    // The wrapper element for the discover page
    thisDiscoverPage.dom.wrapper = document.querySelector(select.containerOf.discoverPage);
  }

  // Method to update favorite categories based on songs listened to completion
  updateFavoriteCategories() {
    // Reference to the current instance of DiscoverPage
    const thisDiscoverPage = this;

    // Initialize favorite categories count to 0
    for (let category of thisDiscoverPage.data.categories){
      thisDiscoverPage.data.favoriteCategories[category] = 0;
    }

    // Select all audio elements on the page
    const audioFiles = document.querySelectorAll('audio');

    // Add 'ended' event listeners to audio files to update favorite categories
    for(let audioFile of audioFiles){
      audioFile.addEventListener('ended', function(){

        // Get the source element and its 'src' attribute
        const source = audioFile.querySelector('source');
        const sourceName = source.getAttribute('src');
        // Extract the filename from the source path
        const fileName = sourceName.replace('assets/songs/', '');

        // Loop through the songs data to find the song that matches the filename
        for (let songData in thisDiscoverPage.data.songs){
          const song = thisDiscoverPage.data.songs[songData];

          // If the song's filename matches, increment the count for its categories
          if(song.filename === fileName){
            for (let category of song.categories){
              thisDiscoverPage.data.favoriteCategories[category] +=1;
            }
          }
        }
        // Re-render songs after updating favorite categories
        thisDiscoverPage.renderSongs();
      });
    }
  }

  // Method to render songs based on favorite categories or randomly
  renderSongs() {
    // Reference to the current instance of DiscoverPage
    const thisDiscoverPage = this;

    // Reset the wrapper content before rendering new songs
    utils.resetWrapper(thisDiscoverPage.dom.wrapper);

    // Calculate the maximum value among favorite categories
    const favoriteCategoryMax = utils.calculateMaxValue(thisDiscoverPage.data.favoriteCategories);

    // Check if there is a favorite category with a count greater than 0
    if (favoriteCategoryMax > 0) {
      // Array to store user's favorite categories
      const userFavoriteCategories = [];
      // Array to store songs of favorite categories
      const songsOfFavoriteCategories = [];

      // Find categories with the maximum count and add them to userFavoriteCategories
      for (let category in thisDiscoverPage.data.favoriteCategories){
        if(thisDiscoverPage.data.favoriteCategories[category] === favoriteCategoryMax){
          userFavoriteCategories.push(category);
        }
      }

      // Randomly select one of the user's favorite categories
      const discoverCategory = userFavoriteCategories[utils.randomize(userFavoriteCategories)];

      // Find songs that include the selected favorite category
      for (let song of thisDiscoverPage.data.songs){
        if(song.categories.includes(discoverCategory)){
          songsOfFavoriteCategories.push(song);
        }
      }
      // Render a random song from the favorite category
      new SongList(songsOfFavoriteCategories[utils.randomize(songsOfFavoriteCategories)], thisDiscoverPage.dom.wrapper);
    } else {
      // If there are no favorite categories, render a random song from all songs
      new SongList(thisDiscoverPage.data.songs[utils.randomize(thisDiscoverPage.data.songs)], thisDiscoverPage.dom.wrapper);
    }
    // Initialize widgets after rendering songs
    thisDiscoverPage.initWidgets();
  }

  // Method to initialize widgets on the discover page
  initWidgets() {
    // Create a new MusicPlayer instance for the discover page
    new MusicPlayer(select.player.discoverPage) ;
  }
}

// Exporting the DiscoverPage class for use in other parts of the application
export default DiscoverPage;