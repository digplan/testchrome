const isBrowser = typeof window !== 'undefined'
const platform = isBrowser ? navigator.userAgent : `${require('os').platform} ${process.version}`
console.log(`Browser?${isBrowser}`, platform)
;

(async ()=>{
  console.log(`
     .html()
     .eval(code)
     .exists(selector) [true|false]
     .get(url) [object]
     .click(selector)
  `)
  console.log(`Attempting a simple test`)

  if(isBrowser){
   document.write('<script src=http://rawgit.com/digplan/testpage/master/testpage.js >')
  } else {
    try {
      var testpage = require('./testpage')
    } catch(e) {
      var testpage = require('testpage')
    }
  }
  console.log(`loaded testpage ${typeof testpage} - ok`)

  const page = await testpage('https://google.com')
  const html = await page.html()
  const e = await page.eval('1+1')
  const head = html.substring(0, 6)
  console.log(e==2 ? `1 + 1 = ${e} - ok`:`Error cannot eval JS`)
  console.log(head ? `doc: ${head} - ok`:`Error cannot read document`)

  const el = await page.exists('html')
  console.log(`Element exists ${el} - ok`)
  const nonel = await page.exists('somefakeelement')
  console.log(`Element not exists ${nonel} - ok`)

//  const elc = await page.click('#hpt1 > a:nth-child(1)')
//  console.log(elc)

  const getdata = await page.get('https://restbin-iwgv042975uv.runkit.sh/api')
  console.log(`get(url) - ${getdata.date} ${getdata.time} - ok`)

  process.exit(0) 
})()
