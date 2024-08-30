// Define the Ratings export interface for the lodgeRatings and serviceRatings
export interface Ratings {
    totalRatings: number;
    userCount: number;
  }
  
  // Define the Location export interface for the location property
  export interface Location {
    type: 'Point';
    coordinates: [number, number];
  }
  
  // Define the Participant export interface for the participants array
  export interface Participant {
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
    ratings: {
      lodgeRatings: Ratings;
      serviceRatings: Ratings;
    };
    signupMethod: string;
    location: Location;
    address_text: string;
    latitude: number;
    longitude: number;
    country: string;
    administrativeArea: string;
    subAdministrativeArea: string;
    __v: number;
    bio?: string; // bio is optional as it is not present in both participants
  }
  
  // Define the LatestMessage export interface for the latestMessage property
  export interface LatestMessage {
    _id: string;
    roomId: string;
    participants: Participant[];
    productType: string;
    sentBy: string;
    delivered: boolean;
    read: boolean;
    message: string;
    dateCreated: string; // ISO 8601 date string
    __v: number;
  }
  
  // Define the MainObject export interface for the main object structure
  export interface MainObject {
    _id: string;
    latestMessage: LatestMessage;
  }
  