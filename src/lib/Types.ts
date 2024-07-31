export interface ApiResponse {
    status: string;
    token?: string;
    data: {
      user: user;
    };
  }

export interface user {
    ratings: {
        lodgeRatings: Ratings;
        serviceRatings: Ratings;
      };
      location: Location;
      verifiedUser: boolean;
      _id: string;
      firstName: string;
      lastName: string;
      email: string;
      emailVerified: boolean;
      profilePicture: string;
      phoneNumber: string;
      gender: string;
      role: string;
      lookingForRoomate: boolean;
      totalLodges: number;
      totalServices: number;
      signupMethod: string;
      address_text: string;
      latitude: number;
      longitude: number;
      country: string;
      administrativeArea: string;
      subAdministrativeArea: string;
      lastChangedPassword: string;
      __v: number;
      id: string;
}
export interface Ratings {
    totalRatings: number;
    userCount: number;
    avgRatings:number;
  }
  
  export interface Location {
    type: string;
    coordinates: [number, number];
  }
  export interface Coordinates {
    type: string;
    coordinates: [number, number];
  }
  
  // export Interface for ratings
  export interface Ratings {
    totalRatings: number;
    userCount: number;
    avgRating?: number; // optional, since it's not always present
  }
  
  // export Interface for the postedBy object
  export interface PostedBy {
    ratings: {
      lodgeRatings: Ratings;
      serviceRatings: Ratings;
    };
    location: Coordinates;
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    emailVerified: boolean;
    profilePicture: string;
    phoneNumber: string;
    gender: string;
    role: string;
    lookingForRoomate: boolean;
    totalLodges: number;
    totalServices: number;
    signupMethod: string;
    address_text: string;
    latitude: number;
    longitude: number;
    country: string;
    administrativeArea: string;
    subAdministrativeArea: string;
    verifiedUser: boolean;
    id: string;
  }
  
  // export Interface for each lodge
  export interface Lodge {
    location: Coordinates;
    ratings: Ratings;
    _id: string;
    postedBy: PostedBy;
    status: string;
    lodgeName: string;
    type: string;
    address_text: string;
    latitude: number;
    longitude: number;
    country: string;
    administrativeArea: string;
    subAdministrativeArea: string;
    numberOfRooms: number;
    lodgeFeatures: string[];
    coverphoto: string;
    photos: string[];
    lodgeLocation: string;
    lodgeDescription: string;
    price: number;
    negotiable: boolean;
    reviews: any[]; // Assuming reviews can be any type or can be an empty array
    dateCreated: string;
    id: string;
  }
  
  // export Interface for the data object
  export interface Data {
    lodges: Lodge[];
  }
  
  // export Interface for the main API response
  export interface LodgesApiResponse {
    status: string;
    results: number;
    data: Data;
  }
  export interface LodgesApiResponse {
    status: string;
    results: number;
    data: Data;
  }

 export interface Service {
    location: Coordinates;
    ratings: Ratings;
    _id: string;
    verifiedService: boolean;
    vendor: string;
    coverphoto: string;
    photos: string[];
    serviceName: string;
    serviceCategories: string[];
    otherServiceCategories: string[];
    address_text: string;
    latitude: number;
    longitude: number;
    country: string;
    administrativeArea: string;
    subAdministrativeArea: string;
    minPrice: number;
    maxPrice: number;
    contactForPrice: boolean;
    description: string;
    dateCreated: string;
    id: string;
  }
  
 export interface ServiceData {
    services: Service[];
  }
  
 export interface ServiceApiResponse {
    status: string;
    results: number;
    data: ServiceData;
  }