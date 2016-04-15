Itako Text Reader Speech Synthesis
---

<p align="right">
  <a href="https://npmjs.org/package/itako-text-reader-speech-synthesis">
    <img src="https://img.shields.io/npm/v/itako-text-reader-speech-synthesis.svg?style=flat-square">
  </a>
  <a href="https://ci.appveyor.com/project/itakojs/itako-text-reader-speech-synthesis">
    <img src="https://img.shields.io/appveyor/ci/itakojs/itako-text-reader-speech-synthesis.svg?style=flat-square">
  </a>
  <a href="https://codeclimate.com/github/itakojs/itako-text-reader-speech-synthesis/coverage">
    <img src="https://img.shields.io/codeclimate/github/itakojs/itako-text-reader-speech-synthesis.svg?style=flat-square">
  </a>
  <a href="https://codeclimate.com/github/itakojs/itako-text-reader-speech-synthesis">
    <img src="https://img.shields.io/codeclimate/coverage/github/itakojs/itako-text-reader-speech-synthesis.svg?style=flat-square">
  </a>
  <a href="https://gemnasium.com/itakojs/itako-text-reader-speech-synthesis">
    <img src="https://img.shields.io/gemnasium/itakojs/itako-text-reader-speech-synthesis.svg?style=flat-square">
  </a>
</p>

Installation
---
```bash
npm install itako-text-reader-speech-synthesis --save
```

Usage
---

## `ItakoTextReaderSpeechSynthesis(type, options)` -> `reader`

specify instance as first argument of the [Itako constructor](https://github.com/itakojs/itako#usage) as the value of the array.

```html
<script src="https://npmcdn.com/itako"></script>
<script src="https://npmcdn.com/itako-text-reader-speech-synthesis"></script>
<script>
var reader = new ItakoTextReaderSpeechSynthesis('text', {
  // default token volume (1~0)
  volume: 1,

  // default token pitch (2~0)
  pitch: 1,

  // default token reading speed (rate) (2~0.1)
  speed: 2,

  // default reading language (en,ja-JP,etc...)
  lang: 'en',

  // if specify SpeechSynthesisVoice.name, it use instance
  // see also: `speechSynthesis.getVoices().map((voice)=> voice.name)`
  speaker: 'Victoria',
});
var itako = new Itako([reader]);

// read the first argument
itako.read('greeting');
</script>
```

See also
---
- [itako - a pluggable text reader](https://github.com/itakojs/itako)

Development
---
Requirement global
* NodeJS v5.10.0
* Npm v3.7.1
* Chrome Launcher 49.0.2623 (Mac OS X 10.11.4)

```bash
git clone https://github.com/itakojs/itako-text-reader-speech-synthesis
cd itako-text-reader-speech-synthesis
npm install

npm test
```

License
---
[MIT](http://59naga.mit-license.org/)
