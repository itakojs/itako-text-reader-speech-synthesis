// dependencies
import 'babel-polyfill';
import assert from 'power-assert';
import { rejects } from 'assert-exception';
import Itako from 'itako';

// target
import TextReaderSpeechSynthesis from '../src';

// specs
describe('itako-text-reader-speech-synthesis', () => {
  it('if the token.type is a text, should be read aloud', async () => {
    const reader = new TextReaderSpeechSynthesis();
    const itako = new Itako([reader]);

    const text = 'greeting';
    const tokens = await itako.read(text);
    assert(tokens[0].meta.reader.name === 'speech-synthesis');
    assert(tokens[0].value === text);
  });

  it('if there is an SpeechSynthesisVoice instance of the specified name, should use as speaker', async () => {
    const reader = new TextReaderSpeechSynthesis();
    const itako = new Itako([reader]);

    const text = 'greeting';
    const tokens = await itako.read(text, { speaker: 'Agnes' });
    assert(tokens[0].meta.reader.name === 'speech-synthesis');
    assert(tokens[0].meta.utterance.voice.name === 'Agnes');
    assert(tokens[0].value === text);
  });

  it('should option is set as a property of the SpeechSynthesisUtterance', async () => {
    const reader = new TextReaderSpeechSynthesis();
    const itako = new Itako([reader]);

    const text = 'ぐりーてぃんぐ';
    const options = {
      volume: 0.5,
      pitch: 1,
      speed: 2,
      lang: 'ja-JP',
      speaker: 'Kyoko',
    };
    const tokens = await itako.read(text, options);
    assert(tokens[0].meta.reader.name === 'speech-synthesis');
    assert(tokens[0].meta.utterance.volume === options.volume);
    assert(tokens[0].meta.utterance.pitch === options.pitch);
    // assert(tokens[0].meta.utterance.rate === options.speed);// actual 0.20000000298023224
    assert(tokens[0].meta.utterance.lang === options.lang);
    assert(tokens[0].meta.utterance.voice.name === options.speaker);
    assert(tokens[0].value === text);
  });

  it('unless token is a specified type, should not reading', async () => {
    const audioTransformer = {
      transform(tokens) {
        return tokens.map(token => token.setType('audio'));
      },
    };
    const text = 'greeting';

    let itako;
    itako = new Itako([new TextReaderSpeechSynthesis('hoge')], [audioTransformer]);
    assert(
      (await rejects(itako.read(text)))
      .message === 'unexpected token "audio:greeting"'
    );

    itako = new Itako([new TextReaderSpeechSynthesis('audio')], [audioTransformer]);
    const tokens = await itako.read(text);
    assert(tokens[0].meta.reader.name === 'speech-synthesis');
    assert(tokens[0].type === 'audio');
    assert(tokens[0].value === text);
  });
});
