const testpage = url => {return new Promise((r,j)=>{
  if(typeof window !== 'undefined){
    const o = {
      html: async x=>document.documentElement.innerHTML,
      eval: async s=>eval(s)
    }
    return r(o)
  }
  const br = cli => {
    cli.once('ready', async ()=>{
      cli.Page.navigate({url: url})
      var o={
        html: async x=>{
          var el = 'window.document.documentElement.innerHTML'
          return (await cli.Runtime.evaluate({expression: el})).result.value
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

if(typeof window==='undefined') 
  module.exports = testpage;
else
  window.testpage = testpage;
