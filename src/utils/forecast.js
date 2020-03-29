const request=require('request')
const forecast=(latitude,longitude,callback)=>
{
    const url='https://api.darksky.net/forecast/fda209e790e2ec3a2e0a4ba67528a366/'+latitude+','+longitude
    request({url,json:true},(error,{body})=>
{
    if(error)
    {
        callback('Unable to connect to the server!',undefined)
    }
    else if(body.error)
    {
        callback('Unable to find the location',undefined)
    }
    else{
    const data=body

   callback(undefined,data.daily.data[0].summary+"It is currently "+data.currently.temperature+" degrees out.There is a "+data.currently.precipProbability+"% chance of rain.")
}
})
}

module.exports=forecast