(async ()=>{
  console.log(`Attempting a simple test`)
  
  var page = require('./testchrome.js')('https://google.com')
  const e = await page.eval('1+1')
  console.log(e==2 ? `1 + 1 = ${e} - ok`:`Error cannot eval JS`)
 
  const getdata = await page.get('https://restbin-iwgv042975uv.runkit.sh/api')
  console.log(`get(url) - ${getdata.date} ${getdata.time} - ok`)

  process.exit(0) 
})()
