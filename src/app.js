const path=require('path')
const express=require('express')
const app=express()
const hbs=require('hbs')
const forecast=require('./utils/forecast')
const geocode=require('./utils/geocode')
const publicDirectoryPath=path.join(__dirname,'../public')
const viewsPath=path.join(__dirname,'../templates/views')
const partialPath=path.join(__dirname,'../templates/partials')

app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialPath)
app.use(express.static(publicDirectoryPath))
app.get('',(req,res)=>
{
     res.render('index',{
        title:'Welcome!',
        name:'Tammana'
     })
})
app.get('/help',(req,res)=>
{
   res.render('help',{
       title:'Help Page',
       name:'Tammana',
       helpText:'Here is some helpful text!'
   })
})
app.get('/about',(req,res)=>
{
   res.render('about',{
          title:'About Page',
          name:'Tammana'
})
})
app.get('/weather',(req,res)=>
{
   if(!req.query.address)
   {
      return res.send({
         error:'Please provide the address!'})
   }
   const address=req.query.address
   geocode(address,(error,{latitude,longitude,location}={})=>
{
     if(error)
     {
         return res.send({error})
     }
     forecast(latitude,longitude,(error,forecastdata)=>
{
    if(error)
    {
        return res.send({error})
    }
    res.send({
      address:req.query.address,
      location,
      forecastdata
    })
    
})
})

})
app.get('/help/*',(req,res)=>
{
   res.render('404',{
      title:'404',
      name:'Tammana',
      text:'Help Article not found'
   })
   
})
app.get('*',(req,res)=>
{
   res.render('404',{
      title:'404 Page',
      name:'Tammana',
      text:'Page not found'
   })
})
app.listen(3000,()=>
{
    console.log('Server is up on the port 3000!')
})