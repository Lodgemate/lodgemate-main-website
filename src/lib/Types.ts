export interface ApiResponse {
    status: string;
    message?:string;
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
      profilePicture: any;
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
      contact: {
        linkedin: string | undefined,
        whatsapp: string | undefined,
        instagram: string | undefined,
        facebook: string | undefined,
      },
      __v: number;
      id: string;
      bio: string;
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

  interface ServiceDataVendor {
    ratings: Ratings;
    location: Location;
    flags: number;
    _id: string;
    firstName: string;
    lastName: string;
    verifiedUser: boolean;
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
    profileLink: string;
    id: string;
  }
 export interface Service {
    location: Coordinates;
    ratings: Ratings;
    _id: string;
    verifiedService: boolean;
    vendor:ServiceDataVendor ;
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
    phoneNumber:any
  }
  
 export interface ServiceData {
    services: Service[];
  }
  
 /**
  * Interface representing the structure of a service API response.
  */
 export interface ServiceApiResponse {
    status: string;
    results: number;
    data: ServiceData;
  }

  /**
   * Represents the interface for a roommate who posted a listing.
   */
  export interface RoommatePostedBy {
    _id: string;
    firstName: string;
    lastName: string;
    gender: "male" | "female" | "other"; // Adjust the values based on your requirements
  }
  
  // Define the structure of a single roommate object
export interface Roommate {
  location: Location;
  _id: string;
  postedBy: PostedBy;
  status: "pending" | "approved" | "rejected"; // Adjust the values based on your requirements
  address_text: string;
  latitude: number;
  longitude: number;
  country: string;
  contact: {
    linkedin: string | undefined,
    whatsapp: string | undefined,
    instagram: string | undefined,
    facebook: string | undefined,
  },
  administrativeArea: string;
  subAdministrativeArea: string;
  preferredRoommateDescription: string;
  hobbiesAndTraits: string[];
  alreadyHasAccomodation: boolean;
  preferredAccomodationTypes: string[];
  otherAccomodationTypes: string[];
  preferredLivingArrangement: "separate" | "shared"; // Adjust the values based on your requirements
}

// Define the structure of the response data
export interface RoommatesResponse {
  status: "success" | "error"; // Adjust the values based on your requirements
  data: {
    roommates: Roommate[];
  };
}