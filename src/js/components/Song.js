import { templates } from '.././settings.js';
import utils from '.././utils.js';

class Song {
  constructor(id, data, wrapper) {
    const thisSong = this;

    thisSong.id = id;
    thisSong.data = data;
    thisSong.wrapper = wrapper;
    console.log(thisSong.data);

    thisSong.render();
  }

  render() {
    const thisSong = this;

    const generatedHTML = templates.songList(thisSong.data);

    const songDOM = utils.createDOMFromHTML(generatedHTML);
    console.log(songDOM);
    thisSong.wrapper.appendChild(songDOM);
  }
}

export default Song;