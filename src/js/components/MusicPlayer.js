// MusicPlayer class definition
class MusicPlayer {
  // Constructor that takes a selector for the music player
  constructor(selector) {
    // Reference to the current instance of MusicPlayer
    const thisMusicPlayer = this;

    // Initialization of the music player with the provided selector
    thisMusicPlayer.initPlayer(selector);
  }

  // Method to initialize the music player
  initPlayer(selector) {
    // Initialization of GreenAudioPlayer with the given selector and configuration
    // eslint-disable-next-line no-undef
    GreenAudioPlayer.init({
      selector: selector, /* The CSS selector for the player element */
      stopOthersOnPlay: true /* Option to stop other players when this one plays */
    });
  }
}

// Export the MusicPlayer class to be used in other modules
export default MusicPlayer;