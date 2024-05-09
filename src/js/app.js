// Importing modules from the settings.js file and the Music component
import { select, settings, classNames } from './settings.js';
import Music from './components/Music.js';

// Main application object
const app = {
  // Method for initializing data
  initData: function(){
    const thisApp = this;

    thisApp.data = {};

    // Fetching data about songs and authors from the API
    const urls = {
      songs: settings.db.url + '/' + settings.db.songs,
      authors: settings.db.url + '/' + settings.db.authors,
    };

    Promise.all([
      fetch(urls.songs),
      fetch(urls.authors),
    ])
      .then(function(allResponses){
        const songsResponse = allResponses[0];
        const authorsResponse = allResponses[1];
        return Promise.all([
          songsResponse.json(),
          authorsResponse.json(),
        ]);
      })
      .then(function([songs, authors]){
        thisApp.parseData(songs, authors);
      });
  },

  // Method for parsing the retrieved data
  parseData: function(songs, authors){
    for(let song in songs){

      let songAuthor = songs[song].author;

      // Assigning author names to the corresponding songs
      for(let author in authors){
        const authorName = authors[author].name;
        const authorID = authors[author].id;
        
        if(songAuthor === authorID){
          songs[song].author = authorName;
          break;
        }
      }
    }
  
    new Music(songs);
  },

  // Method for initializing pages
  initPages: function(){
    const thisApp = this;

    // Storing references to all the pages and navigation links
    thisApp.pages = document.querySelector(select.containerOf.pages).children;
    thisApp.navLinks = document.querySelectorAll(select.nav.links);

    // Getting the page ID from the URL hash (if present)
    const idFromHash = window.location.hash.replace('#/', '');

    // Default to the first page if no hash is found
    let pageMatchingHash = thisApp.pages[0].id; 

    // Loop through all pages to find one that matches the URL hash
    for(let page of thisApp.pages){
      if(page.id == idFromHash){
        pageMatchingHash = page.id;
        break;
      }
    }

    // Activate the page that matches the URL hash
    thisApp.activatePage(pageMatchingHash);

    // Add click event listeners to all navigation links
    for(let link of thisApp.navLinks){
      link.addEventListener('click', function(event){
        const clickedElement = this;
        event.preventDefault();

        // Get the ID of the page linked to the clicked navigation link
        const id = clickedElement.getAttribute('href').replace('#', '');

        // Activate the page corresponding to the clicked navigation link
        thisApp.activatePage(id);
        
        // Update the URL hash to reflect the active page
        window.location.hash = '#/' + id;
      });
    }
  },

  // Function to activate a specific page based on the given page ID
  activatePage: function(pageId){
    const thisApp = this;

    // Loop through all pages and toggle the 'active' class based on the page ID
    for(let page of thisApp.pages){
      page.classList.toggle(classNames.pages.active, page.id == pageId);
    }

    // Loop through all navigation links and toggle the 'active' class for the link corresponding to the active page
    for(let link of thisApp.navLinks){
      link.classList.toggle(
        classNames.nav.active,
        link.getAttribute('href') == '#' + pageId
      );
    }
  },

  // activatePage: function (pageId) {
  //   // Optimization with querySelector
  //   const activePage = document.querySelector(`#${pageId}`);
  //   const activeLink = document.querySelector(`[href='#${pageId}']`);
  
  //   // Deactivation of all pages and links
  //   document.querySelectorAll('.' + classNames.pages.active).forEach(page => {
  //     page.classList.remove(classNames.pages.active);
  //   });
  //   document.querySelectorAll('.' + classNames.nav.active).forEach(link => {
  //     link.classList.remove(classNames.nav.active);
  //   });
  
  //   // Activate current page and link
  //   if (activePage) {
  //     activePage.classList.add(classNames.pages.active);
  //   }
  //   if (activeLink) {
  //     activeLink.classList.add(classNames.nav.active);
  //   }
  // },

  // Initialization function for the application
  init: function(){
    const thisApp = this;

    // Initialize an empty object to store application data
    thisApp.data = {};

    // Console logs for debugging purposes, showing the start of the app,and the current state of 'thisApp', 'settings', and 'classNames'
    console.log('*** App starting ***');
    console.log('thisApp:', thisApp);
    console.log('settings:', settings);
    console.log('classNames:', classNames);

    // Call initialization methods for data and pages
    thisApp.initData();
    thisApp.initPages();

    // The following console logs are commented out and can be used for additional debugging
    //console.log('data', thisApp.data);
    //console.log('songs', thisApp.data.songs);
  }
};

// Start the application by calling the init function
app.init();