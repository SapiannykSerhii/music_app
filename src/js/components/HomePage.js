import SongList from './SongList.js';
import {classNames, select} from './../settings.js';
import MusicPlayer from './MusicPlayer.js';
import utils from '../utils.js';

class HomePage {
  constructor(songsData, categories) {
    const thisHomePage = this;

    thisHomePage.data = {};
    thisHomePage.data.songs = songsData;
    // console.log(thisHomePage.data.songs);
    thisHomePage.data.categories = categories;

    thisHomePage.getElements();
    thisHomePage.renderSongs();
    thisHomePage.filterByCategories();
  }

  getElements() {
    const thisHomePage = this;

    thisHomePage.dom = {};
    thisHomePage.dom.wrapper = document.querySelector(select.containerOf.homePage);
    // console.log(thisHomePage.dom.wrapper);
    thisHomePage.dom.categoryList = document.querySelector(select.listOf.categories);
    // console.log(thisHomePage.dom.categoryList);
    thisHomePage.dom.categoryLinks = document.querySelectorAll(select.linksOf.categories);
  }

  renderSongs() {
    const thisHomePage = this;

    for (let songData in thisHomePage.data.songs) {
      new SongList(thisHomePage.data.songs[songData], thisHomePage.dom.wrapper);
    }
    thisHomePage.initWidgets();
  }

  filterByCategories() {
    const thisHomePage = this;

    let activeCategory = '';


    thisHomePage.dom.categoryList.addEventListener('click', function (event) {
      event.preventDefault();

      utils.resetWrapper(thisHomePage.dom.wrapper);

      const category = event.target;


      if(category.classList.contains(classNames.categories.isCategory)) {
        const categoryName = category.getAttribute(select.attributesOf.category);

        if (!category.classList.contains(classNames.categories.active)) {
          thisHomePage.resetCategories();
          category.classList.add(classNames.categories.active);
          activeCategory = categoryName;
          // console.log(activeCategory);

          for (let songData in thisHomePage.data.songs) {
            const songCategories = thisHomePage.data.songs[songData].categories;
            // console.log(songCategories);
          
            if (songCategories.includes(activeCategory)) {
              new SongList(thisHomePage.data.songs[songData], thisHomePage.dom.wrapper);
            }
          }
          thisHomePage.initWidgets();
        } else {
          category.classList.remove(classNames.categories.active);
          activeCategory = '';
          thisHomePage.renderSongs();
        }
      }
    });
  }

  resetCategories() {
    const thisHomePage = this;

    const allCategoryLinks = thisHomePage.dom.categoryLinks;

    for (let categoryLink of allCategoryLinks) {
      categoryLink.classList.remove(classNames.categories.active);
    }
  }

  initWidgets() {
    new MusicPlayer(select.player.homePage);
  }
}

export default HomePage;