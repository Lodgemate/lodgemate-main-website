let latitude: number;
let longitude:number;

export const getUserLongLang = async(): Promise<{ latitude: number; longitude: number }> =>{
      return new Promise<{ latitude: number; longitude: number }> ((resolve,reject)=>{
        navigator.geolocation.getCurrentPosition((position)=>{
          latitude=position.coords.latitude
          longitude=position.coords.longitude
          resolve({latitude,longitude})
        },(error)=>{
          reject(error)
        })
      })
}
