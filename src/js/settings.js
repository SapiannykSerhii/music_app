export const select = {
  templateOf: {
    songs: '#template-song',
    categories: '#template-category',
    categoriesSelect: '#template-category-select',
  },
  containerOf: {
    pages: '#pages',
    homePage: '.songs-home',
    searchPage: '.song-search',
    discoverPage: '.songs-discover',
    joinPage: '.join-now',
  },
  listOf: {
    categories: '.categories',
  },
  player: {
    homePage: 'homepage-wrapper .player',
    searchPage: '.search-wrapper .player',
    discoverPage: '.discover-wrapper .player',
  },
  searchElement: {
    button: '.search-button',
    input: '.searchInputName',
    text: '.search_success',
  },
  attributesOf: {
    category: 'data-id',
  },
  linksOf: {
    categories: '.category__link'
  },
  formOf: {
    categoriesSelect: '#categories__select'
  },
  nav: {
    links: 'main-nav a, .join-button a'
  },
  
};

export const classNames = {
  nav: {
    active: 'active',
  },
  pages: {
    active: 'active'
  },
  categories: {
    active: 'active',
    isCategories: 'category__link'
  }
};

export const settings = {
  db: {
    // url: '//localhost:3131',
    url: '//' + window.location.hostname + (window.location.hostname == 'localhost' ? ':3131' : ''),
    songs: 'songs',
    authors: 'authors',
  },
};

export const templates = {
  songTemplate: Handlebars.compile(document.querySelector(select.templateOf.songs).innerHTML),
  categoryTemplate: Handlebars.compile(document.querySelector(select.templateOf.categories).innerHTML),
  categorySelectTemplate: Handlebars.compile(document.querySelector(select.templateOf.categoriesSelect).innerHTML),
};