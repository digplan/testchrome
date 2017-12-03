const isBrowser = typeof window !== 'undefined'
const platform = isBrowser ? navigator.userAgent : `${require('os').platform} ${process.version}`
console.log(`Browser?${isBrowser}`, platform)
;

(async ()=>{
  console.log(`Attempting a simple test`)
  const page = await require('./testpage.js')('https://google.com')
  const html = await page.html()
  const e = await page.eval('1+1')

  const head = html.substring(0, 6)
  console.log(e==2 ? `1 + 1 = ${e} - ok`:`Error cannot eval JS`)
  console.log(head ? `doc: ${head} - ok`:`Error cannot read document`)
  process.exit(0) 
})()
