import { select } from './../settings.js';
import SongList from './SongList.js';
import MusicPlayer from './MusicPlayer.js';

class HomePage {
  constructor(songsData, categories) {
    const thisHomePage = this;

    thisHomePage.data = {};
    thisHomePage.data.songs = songsData;
    thisHomePage.data.categories = categories;
    // console.log(thisHomePage.data.categories);
    thisHomePage.getElements();
    thisHomePage.renderSongs();
  }

  getElements() {
    const thisHomePage = this;

    thisHomePage.dom = {};
    thisHomePage.dom.wrapper = document.querySelector(select.containerOf.homePage);
    // console.log(thisHomePage.data.wrapper);
    thisHomePage.dom.categoryList = document.querySelector(select.listOf.categories);
    // console.log(thisHomePage.data.categoryList);
    thisHomePage.dom.categoryLink = document.querySelectorAll(select.linksOf.categories);
    // console.log(thisHomePage.data.categoryLink);
  }

  renderSongs() {
    const thisHomePage = this;

    for (let songData in thisHomePage.data.songs) {
      new SongList(thisHomePage.data.songs[songData], thisHomePage.dom.wrapper);
    }
    thisHomePage.initWidgets();
  }

  initWidgets() {
    new MusicPlayer(select.player.homePage);
  }
}

export default HomePage;