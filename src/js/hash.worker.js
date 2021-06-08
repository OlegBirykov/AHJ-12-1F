import { getHash } from './tools';

const reader = new FileReader();

reader.addEventListener('load', (evt) => {
  self.postMessage(getHash(evt.target.result, self.algoritm));
});

self.addEventListener('message', (evt) => {
  self.algoritm = evt.data.algoritm;
  reader.readAsArrayBuffer(evt.data.file);
});
