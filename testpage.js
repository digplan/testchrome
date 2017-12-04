const testpage = url =>new Promise(r=>{
  require('chrome-remote-interface')(cli=>{
    cli.once('ready', async ()=>{
      cli.Page.navigate({url: url})
      r({
        get: async url=>{
          var f = await require('node-fetch')(url)
          var j = await f.json()
          return j
        },
        html: async x=>{
          var el = 'window.document.documentElement.innerHTML'
          return (await cli.Runtime.evaluate({expression: el})).result.value
        },
        eval: async x=>{
         var r = await cli.Runtime.evaluate({expression:x})
         if(r.result.subtype=='error') throw Error(r.result.description)
         return r.result.value 
        },
        exists: async sel=>new Promise(async (r,j)=>{
          var el = await cli.Runtime.evaluate({expression: `document.querySelector("${sel}")`})
          r(el.result.subtype!=='null')
        }),
        click: async sel=>new Promise(async r=>{
          var el = await cli.Runtime.evaluate({expression: `document.querySelector("${sel}").click()`})
          r(JSON.stringify(el))
        })
      })
    }) 
    cli.Network.enable()
    cli.Page.enable()
  })
})

require('chrome-remote-interface')().catch(e=>{
  console.log('Chrome not started. # chrome --remote-debugging-port=9222 --headless')
  process.exit()
})
module.exports = testpage
