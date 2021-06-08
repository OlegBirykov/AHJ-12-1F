import { getHash } from './tools';

const reader = new FileReader();

reader.addEventListener('load', (evt) => {
  try {
    self.postMessage(getHash(evt.target.result, self.algoritm));
  } catch (e) {
    self.postMessage(`Error: ${e.message}`);
  }
});

reader.addEventListener('error', (evt) => {
  self.postMessage(`Error: ${evt.target.error.message}`);
});

self.addEventListener('message', (evt) => {
  self.algoritm = evt.data.algoritm;
  reader.readAsArrayBuffer(evt.data.file);
});

self.addEventListener('error', (evt) => {
  self.postMessage(`Error: ${evt.message}`);
});
