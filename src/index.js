// dependencies
import Promise from 'bluebird';

// @class TextReaderSpeechSynthesis
export default class TextReaderSpeechSynthesis {
  static loadVoices() {
    return new Promise((resolve, reject) => {
      const voices = speechSynthesis.getVoices();
      if (voices.length) {
        return resolve();
      }

      const timeout = setTimeout(() => {
        reject('exceed 1000ms wait for onvoiceschanged');
      }, 1000);
      return speechSynthesis.addEventListener('voiceschanged', () => {
        clearTimeout(timeout);
        resolve();
      });
    });
  }

  /**
  * @constructor
  * @param {string} type - a target token type
  * @param {object} [options={}] - a token default options
  */
  constructor(type = 'text', options = {}) {
    this.name = 'speech-synthesis';
    this.readType = type;
    this.opts = {
      volume: 1,
      pitch: 1,
      speed: 1,
      ...options,
    };

    // https://bugs.chromium.org/p/chromium/issues/detail?id=509488
    this.utterances = [];
  }

  /**
  * @method read
  * @param {token} token - if toke.type is 'text', read as text;
  * @param {object} [options] - itako specify transfomer options(undefined)
  * @returns {object|promise<undefined>} result - if the plugin read the token, it return the Promise
  */
  read(token) {
    if (token.type !== this.readType) {
      return token;
    }

    const opts = { ...this.opts, ...token.options };

    return this.constructor.loadVoices()
    .then(() => new Promise((resolve) => {
      const voices = speechSynthesis.getVoices();
      const utterance = new SpeechSynthesisUtterance(token.value);
      if (opts.lang !== undefined) {
        utterance.lang = opts.lang;
      }
      if (opts.volume !== undefined) {
        utterance.volume = opts.volume;
      }
      if (opts.pitch !== undefined) {
        utterance.pitch = opts.pitch;
      }
      if (opts.speed !== undefined) {
        utterance.rate = opts.speed > 2 ? 2 : opts.speed;
      }
      if (opts.speaker) {
        utterance.voice = voices.filter((voice) => voice.name === opts.speaker)[0];
      }

      utterance.addEventListener('end', () => {
        const index = this.utterances.indexOf(utterance);
        if (index > -1) {
          this.utterances.splice(index, 1);
        }
        resolve();
      });
      this.utterances.push(utterance);

      token.setMeta('utterance', utterance);

      speechSynthesis.speak(utterance);
    }));
  }
}
