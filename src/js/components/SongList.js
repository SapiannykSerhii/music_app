// Importing necessary modules from settings and utilities
import { templates } from '../settings.js';
import utils from '../utils.js';

// Defining the SongList class
class SongList {
  // Constructor for creating a new instance of SongList with a song and its wrapper element
  constructor(song, wrapper) {
    const thisSongList = this;

    // Initializing the data object within the instance to store the song data
    thisSongList.data = {};
    thisSongList.data.song = song;

    // Calling methods to get DOM elements and render the song on the page
    thisSongList.getElements(wrapper);
    thisSongList.render();
  }

  // Method to get the necessary DOM elements and store them in the instance
  getElements(wrapper) {
    const thisSongList = this;

    // Creating an object to keep references to DOM elements
    thisSongList.dom = {};
    // Storing the wrapper element that will contain the song list
    thisSongList.dom.wrapper = wrapper;
  }

  // Method to render the song list on the page
  render() {
    const thisSongList = this;
    
    // Generating HTML based on the song data using a predefined template
    const generatedHTML = templates.songTemplate(thisSongList.data.song);
    // Creating DOM elements from the generated HTML string
    const songDOM = utils.createDOMFromHTML(generatedHTML);
    // Appending the song DOM to the wrapper element to display it on the page
    thisSongList.dom.wrapper.appendChild(songDOM);
  }
}

// Exporting the SongList class to be used in other parts of the application
export default SongList;