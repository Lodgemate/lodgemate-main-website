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
interface Ratings {
    totalRatings: number;
    userCount: number;
  }
  
  interface Location {
    type: string;
    coordinates: [number, number];
  }