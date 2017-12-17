Simple web testing

##Install & Self-test

````
npm install testchrome

(async ()=>{
  var page = require('testchrome')('https://google.com')
  await page.evaluate('1+1')
  await page.get('https://...') // returns JSON
})()
