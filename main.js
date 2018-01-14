const testchrome = url =>new Promise(r=>{
  require('chrome-remote-interface')(cli=>{
    cli.once('ready', async ()=>{
      cli.Page.navigate({url: url})
      r({
        get: async url=>{
          var f = await require('node-fetch')(url)
          var j = await f.json()
          return j
        },
        evaluate: async x=>{
         var r = await cli.Runtime.evaluate({expression:x})
         if(r.result.subtype=='error') throw Error(r.result.description)
         return r.result.value 
        }
      })
    }) 
    cli.Network.enable()
    cli.Page.enable()
  })
})

require('chrome-remote-interface')().catch(e=>{
  console.log('Chrome not started. # chrome --remote-debugging-port=9222 --headless')
  process.exit(1)
})
module.exports = testchrome
