
export const urlGenerator =(param: any)=>{
 console.log(param)

    let params
    let lat= param.location?.latitude
    let Long= param.location?.longitude
    let priceone;
    let pricetwo;
    let location;
    let price
    let query
    console.log(lat, Long)
    if (lat && Long) {
        location= "?lat=" + lat +"&lng="+Long
    }
    if (priceone && pricetwo) {
        price= "price[gte]=" + priceone+ "&"+"price[lte]="+pricetwo
    }
    if (param.query) {
        query = 'query='+param.query
    }


    return `${price? price+"&":""}${location? location+"&":""}sr=20&${query ? query:""}`
}
// console.log(urlGenerator())