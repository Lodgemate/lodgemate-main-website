export const urlGenerator =(paeam)=>{
    let params
    let latLong;
    let Long;
    let priceone;
    let pricetwo;
    let location;
    let price
    let query
    if (latLong && Long) {
        location= "?lat=" + latLong +"&lng="+Long
    }
    if (priceone && pricetwo) {
        price= "price[gte]=" + priceone+ "&"+"price[lte]="+pricetwo
    }
    if (paeam) {
        query = 'query='+paeam
    }


    return `${price? price+"&":""}${location? location+"&":""}sr=20&${query && query}`
}
// console.log(urlGenerator())