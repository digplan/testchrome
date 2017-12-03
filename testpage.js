const testpage = url => {return new Promise((r,j)=>{
  const br = cli => {
    cli.once('ready', async ()=>{
      cli.Page.navigate({url: url})
      var o={
        html: async x=>{
          return (await cli.Runtime.evaluate({expression:'window.document.body.outerHTML'})).result.value
        },
        eval: async x=>{
         var r = await cli.Runtime.evaluate({expression:x})
         if(r.result.subtype=='error') throw Error(r.result.description)
         return r.result.value 
        }
      }
      r(o)
    }) 
    cli.Network.enable()
    cli.Page.enable()
  }
  require('chrome-remote-interface')(br)
})}

(async ()=>{

  const page = await testpage('https://google.com')
  const html = await page.html()
  const e = await page.eval('1+1')
  console.log(html,e)

})().catch(console.error)
