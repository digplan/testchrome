const testchrome = (url) => {
return new Promise(async (r,j)=>{
 try {  
  const CDP = require('chrome-remote-interface')
  const client = await CDP()
  const {Network, Page, Runtime} = client
  await Network.enable()
  await Page.enable()
  await Page.navigate({url: url})
  await Page.loadEventFired()
  var ret = {}
  ret.evaluate = async x => {
      const r = await Runtime.evaluate({expression: x})
      if(r.result.subtype=='error')
       throw Error(r.result.description);
      return r.result.value
  }
  r(ret)
 } catch(e) {
    j(e)
 }
})
}  

require('chrome-remote-interface')().catch(e=>{
  console.log('Chrome not started. Run ./browsercheck in the testchrome dir, to make sure its installed')
  process.exit(1)
})

module.exports = testchrome
