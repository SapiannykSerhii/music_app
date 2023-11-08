import { select,templates } from '.././settings.js';
import utils from '.././utils.js';
import DiscoverPage from './DiscoverPage.js';
import HomePage from './HomePage.js';
import SearchPage from './SearchPage.js';

class Music {
  constructor(songs) {
    const thisMusic = this;

    thisMusic.data = {};
    // console.log(thisMusic.data);
    thisMusic.data.songs = songs;
    // console.log(thisMusic.data.songs);
    thisMusic.data.categories = [];
    thisMusic.pages = {};

    thisMusic.getElements();
    thisMusic.generateCategories();
    thisMusic.renderCategories();

    thisMusic.pages.HomePage = new HomePage(thisMusic.data.songs, thisMusic.data.categories);
    thisMusic.pages.SearchPage = new SearchPage(thisMusic.data.songs);
    thisMusic.pages.DiscoverPage = new DiscoverPage(thisMusic.data.songs, thisMusic.data.categories);
  }

  getElements() {
    const thisMusic = this;

    thisMusic.dom = {};

    thisMusic.dom.categoryList = document.querySelector(select.listOf.categories);
    thisMusic.dom.categorySelect = document.querySelector(select.formOf.categoriesSelect);

  }

  generateCategories() {
    const thisMusic = this;

    for (let song of thisMusic.data.songs) {

      const songCategories = song.categories;
      // console.log(songCategories);
      for (let item of songCategories) {
        // console.log(item);
        if (!thisMusic.data.categories.includes(item)) {
          thisMusic.data.categories.push(item);
        }
      }
    }
  }

  renderCategories() {
    const thisMusic = this;

    for (let category of thisMusic.data.categories) {
      // console.log(category);
      const linkHtmlData = { name: category };
      const categoriesListHTML = templates.categoryTemplate(linkHtmlData);
      const categoriesSelectsHTML = templates.categorySelectTemplate(linkHtmlData);

      const categoryListDOM = utils.createDOMFromHTML(categoriesListHTML);
      const categorySelectDOM = utils.createDOMFromHTML(categoriesSelectsHTML);

      thisMusic.dom.categoryList.appendChild(categoryListDOM);
      thisMusic.dom.categorySelect.appendChild(categorySelectDOM);
    }
  }

}
export default Music;