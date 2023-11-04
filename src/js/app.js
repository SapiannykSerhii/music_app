import { select, settings, classNames } from './settings.js';

import Music from './components/Music.js';

const app = {
  initData: function () {
    const thisApp = this;

    thisApp.data = {};

    const urls = {
      songs: `${settings.db.url}/${settings.db.songs}`,
      authors: `${settings.db.url}/${settings.db.authors}`
    };

    Promise.all([
      fetch(urls.songs),
      fetch(urls.authors),
    ])
      .then(function (allResponses) {
        const songsResponse = allResponses[0];
        const authorsResponse = allResponses[1];
        return Promise.all([
          songsResponse.json(),
          authorsResponse.json(),
        ]);
      })
      .then(function ([songs, authors]) {
        thisApp.parseData(songs, authors);
      });
  },

  parseData: function (songs, authors) {
    for (let song in songs) {
      
      let songAuthor = songs[song].author;
      // console.log(songAuthor);

      for (let author in authors) {
        const authorName = authors[author].name;
        // console.log(authorName);
        const authorId = authors[author].id;

        if (songAuthor === authorId) {
          songs[song].author = authorName;
          break;
        }
      }
    }

    new Music(songs);
  },

  initPages: function () {
    const thisApp = this;

    thisApp.pages = document.querySelector(select.containerOf.pages).children;
    thisApp.navLinks = document.querySelectorAll(select.nav.links);

    const idFromHash = window.location.hash.replace('#/', '');

    let pageMatchingHash = thisApp.pages[0].id;

    for (let page in thisApp.pages) {
      // console.log(page);
      if (page.id === idFromHash) {
        pageMatchingHash === page.id;
        break;
      }
    }

    thisApp.activePage(pageMatchingHash);

    for (let link of thisApp.navLinks) {
      link.addEventListener('click', function (event) {
        const clickedElement = this;
        event.preventDefault();

        const id = clickedElement.getAttribute('href').replace('#', '');

        thisApp.activePage(id);

        window.location.hash = '#/' + id;
      });
    }
  },

  activePage: function (pageId) {
    const thisPage = this;

    for (let page of thisPage.pages) {
      page.classList.toggle(
        classNames.pages.active,
        page.id === pageId
      );
    }

    for (let link of thisPage.navLinks) {
      link.classList.toggle(
        classNames.nav.active,
        link.getAttribute('href') == '#' + pageId
      );
    }
  },

  init: function () {
    const thisApp = this;

    thisApp.data = {};
    console.log('*** App starting ***');
    console.log('thisApp:', thisApp);
    console.log('settings', settings);
    console.log('className', classNames);

    thisApp.initData();
    thisApp.initPages();
  }
  
};

app.init();