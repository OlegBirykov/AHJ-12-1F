self.addEventListener('message', (/* evt */) => {
//  console.log(evt);
  self.postMessage('ответ');
});
