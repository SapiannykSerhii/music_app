import SongList from './SongList.js';
import { select} from './../settings.js';
import MusicPlayer from './MusicPlayer.js';

class HomePage {
  constructor(songsData, categories) {
    const thisHomePage = this;

    thisHomePage.data = {};
    thisHomePage.data.songs = songsData;
    thisHomePage.data.categories = categories;

    thisHomePage.getElements();
    thisHomePage.renderSongs();
    // thisHomePage.filterByCategories();
  }

  getElements() {
    const thisHomePage = this;

    thisHomePage.dom = {};
    thisHomePage.dom.wrapper = document.querySelector(select.containerOf.homePage);
    thisHomePage.dom.categoryList = document.querySelector(select.listOf.categories);
    thisHomePage.dom.categoryLinks = document.querySelectorAll(select.linksOf.categories);
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