export interface Product {
  id: number;
  type: string;
  name: string;
  address: string;
  university: string;
  averageReview: number;
  reviewCount: number;
  price: number;
  negotiable: boolean;
  description: string;
  images: string[];
  features: { name: string }[];
  accommodationType: string;
  numberOfRooms: number;
  reviews: {
    userName: string;
    userAvatar: string;
    date: string;
    text: string;
    rating: number;
  }[];
  contactNumber: string;
  facebookLink: string;
  igLink: string;
  twitterLink: string;
  linkedinLink: string;
}

const products: Product[] = [
  {
    id: 1,
    type: "lodge",
    name: "Cozy Mountain Lodge",
    address: "123 Mountain Rd, Colorado Springs, CO",
    university: "University 2",
    averageReview: 4.5,
    reviewCount: 30,
    price: 50000,
    negotiable: true,
    description:
      "A beautiful and cozy lodge located in the heart of the mountains. Perfect for a weekend getaway.",
    images: [
      "https://res.cloudinary.com/dcb4ilgmr/image/upload/v1716821887/utilities/LodgeMate_File/adsas_hbwgl2.png",
      "https://res.cloudinary.com/dcb4ilgmr/image/upload/v1716821883/utilities/LodgeMate_File/sd_v2047z.png",
      "https://res.cloudinary.com/dcb4ilgmr/image/upload/v1716821887/utilities/LodgeMate_File/adsas_hbwgl2.png",
      "https://res.cloudinary.com/dcb4ilgmr/image/upload/v1716821887/utilities/LodgeMate_File/adsas_hbwgl2.png",
    ],
    features: [
      { name: "WiFi" },
      { name: "Water heater" },
      { name: "Electricity" },
      { name: "Security" },
      { name: "Recreation center" },
      { name: "Parking space" },
    ],
    accommodationType: "Self Con House",
    numberOfRooms: 4,
    reviews: [
      {
        userName: "John Doe",
        userAvatar:
          "https://res.cloudinary.com/dcb4ilgmr/image/upload/v1716929513/utilities/LodgeMate_File/Ellipse_15_blt6rt.svg",
        date: "2023-05-21",
        text: "Amazing place, the games, the love its just so amazing, with friesnds and trees. had a great time!",
        rating: 5,
      },
      {
        userName: "Jane Smith",
        userAvatar:
          "https://res.cloudinary.com/dcb4ilgmr/image/upload/v1716929513/utilities/LodgeMate_File/Ellipse_15_blt6rt.svg",
        date: "2023-05-18",
        text: "Beautiful views and cozy atmosphere.",
        rating: 4,
      },
    ],
    contactNumber: "+234814823903",
    facebookLink: "https://www.facebook.com/",
    igLink: "https://www.instagram.com/",
    twitterLink: "https://www.x.com/",
    linkedinLink: "https://www.linkedin.com/",
  },
  {
    id: 2,
    type: "lodge",
    name: "Sunny Riverside Lodge",
    address: "456 River St, Austin, TX",
    university: "University 2",
    averageReview: 4.0,
    reviewCount: 20,
    price: 120000,
    negotiable: false,
    description: "A comfortable self-contained lodge near University 2.",
    images: [
      "https://res.cloudinary.com/dcb4ilgmr/image/upload/v1716821883/utilities/LodgeMate_File/sd_v2047z.png",
      "https://res.cloudinary.com/dcb4ilgmr/image/upload/v1716821887/utilities/LodgeMate_File/adsas_hbwgl2.png",
      "https://res.cloudinary.com/dcb4ilgmr/image/upload/v1716821887/utilities/LodgeMate_File/adsas_hbwgl2.png",
      "https://res.cloudinary.com/dcb4ilgmr/image/upload/v1716821887/utilities/LodgeMate_File/adsas_hbwgl2.png",
    ],
    features: [
      { name: "Water" },
      { name: "Electricity" },
      { name: "Security" },
    ],
    accommodationType: "Self-Contained",
    numberOfRooms: 1,
    reviews: [
      {
        userName: "Alice Johnson",
        userAvatar:
          "https://res.cloudinary.com/dcb4ilgmr/image/upload/v1716929513/utilities/LodgeMate_File/Ellipse_15_blt6rt.svg",
        date: "2023-05-21",
        text: "Convenient and affordable place to stay.",
        rating: 4,
      },
      {
        userName: "Bob Lee",
        userAvatar:
          "https://res.cloudinary.com/dcb4ilgmr/image/upload/v1716929513/utilities/LodgeMate_File/Ellipse_15_blt6rt.svg",
        date: "2023-05-18",
        text: "Close to the university with basic amenities.",
        rating: 4,
      },
    ],
    contactNumber: "+2348123456789",
    facebookLink: "https://www.facebook.com/",
    igLink: "https://www.instagram.com/",
    twitterLink: "https://www.x.com/",
    linkedinLink: "https://www.linkedin.com/",
  },
  {
    id: 3,
    type: "lodge",
    name: "Green Valley Lodge",
    address: "789 Valley Rd, San Francisco, CA",
    university: "University 1",
    averageReview: 4.3,
    reviewCount: 15,
    price: 200000000,
    negotiable: false,
    description:
      "A spacious flat with modern amenities, close to University 1.",
    images: [
      "https://res.cloudinary.com/dcb4ilgmr/image/upload/v1716821887/utilities/LodgeMate_File/adsas_hbwgl2.png",
      "https://res.cloudinary.com/dcb4ilgmr/image/upload/v1716821887/utilities/LodgeMate_File/adsas_hbwgl2.png",
      "https://res.cloudinary.com/dcb4ilgmr/image/upload/v1716821883/utilities/LodgeMate_File/sd_v2047z.png",
      "https://res.cloudinary.com/dcb4ilgmr/image/upload/v1716821887/utilities/LodgeMate_File/adsas_hbwgl2.png",
    ],
    features: [
      { name: "Water" },
      { name: "Water Heater" },
      { name: "WiFi" },
      { name: "Proximity to School" },
      { name: "Electricity" },
      { name: "Security" },
    ],
    accommodationType: "Flat",
    numberOfRooms: 3,
    reviews: [
      {
        userName: "Charlie Brown",
        userAvatar:
          "https://res.cloudinary.com/dcb4ilgmr/image/upload/v1716929513/utilities/LodgeMate_File/Ellipse_15_blt6rt.svg",
        date: "2023-04-15",
        text: "Spacious and well-maintained flat.",
        rating: 5,
      },
      {
        userName: "Dana White",
        userAvatar:
          "https://res.cloudinary.com/dcb4ilgmr/image/upload/v1716929513/utilities/LodgeMate_File/Ellipse_15_blt6rt.svg",
        date: "2023-04-10",
        text: "Great amenities and close to campus.",
        rating: 4,
      },
    ],
    contactNumber: "+2348123456790",
    facebookLink: "https://www.facebook.com/",
    igLink: "https://www.instagram.com/",
    twitterLink: "https://www.x.com/",
    linkedinLink: "https://www.linkedin.com/",
  },
  {
    id: 4,
    type: "lodge",
    name: "Blue Sky Lodge",
    address: "321 Sky Ln, Denver, CO",
    university: "University 2",
    averageReview: 4.2,
    reviewCount: 10,
    price: 300000,
    negotiable: false,
    description: "A single room with basic amenities near University 2.",
    images: [
      "https://res.cloudinary.com/dcb4ilgmr/image/upload/v1716821887/utilities/LodgeMate_File/adsas_hbwgl2.png",
      "https://res.cloudinary.com/dcb4ilgmr/image/upload/v1716821883/utilities/LodgeMate_File/sd_v2047z.png",
      "https://res.cloudinary.com/dcb4ilgmr/image/upload/v1716821887/utilities/LodgeMate_File/adsas_hbwgl2.png",
      "https://res.cloudinary.com/dcb4ilgmr/image/upload/v1716821887/utilities/LodgeMate_File/adsas_hbwgl2.png",
    ],
    features: [
      { name: "Water" },
      { name: "WiFi" },
      { name: "Security" },
      { name: "Parking Space" },
    ],
    accommodationType: "Single Room",
    numberOfRooms: 1,
    reviews: [
      {
        userName: "Eve Adams",
        userAvatar:
          "https://res.cloudinary.com/dcb4ilgmr/image/upload/v1716929513/utilities/LodgeMate_File/Ellipse_15_blt6rt.svg",
        date: "2023-03-21",
        text: "Nice place for a student.",
        rating: 4,
      },
      {
        userName: "Frank Green",
        userAvatar:
          "https://res.cloudinary.com/dcb4ilgmr/image/upload/v1716929513/utilities/LodgeMate_File/Ellipse_15_blt6rt.svg",
        date: "2023-03-18",
        text: "Affordable and convenient.",
        rating: 4,
      },
    ],
    contactNumber: "+2348123456791",
    facebookLink: "https://www.facebook.com/",
    igLink: "https://www.instagram.com/",
    twitterLink: "https://www.x.com/",
    linkedinLink: "https://www.linkedin.com/",
  },
  {
    id: 5,
    type: "lodge",
    name: "Golden Sun Lodge",
    address: "654 Golden Ave, Miami, FL",
    university: "University 3",
    averageReview: 4.7,
    reviewCount: 50,
    price: 356000,
    negotiable: true,
    description: "A luxury lodge with top-notch amenities near University 3.",
    images: [
      "https://res.cloudinary.com/dcb4ilgmr/image/upload/v1716821883/utilities/LodgeMate_File/sd_v2047z.png",
      "https://res.cloudinary.com/dcb4ilgmr/image/upload/v1716821887/utilities/LodgeMate_File/adsas_hbwgl2.png",
      "https://res.cloudinary.com/dcb4ilgmr/image/upload/v1716821887/utilities/LodgeMate_File/adsas_hbwgl2.png",
      "https://res.cloudinary.com/dcb4ilgmr/image/upload/v1716821887/utilities/LodgeMate_File/adsas_hbwgl2.png",
    ],
    features: [
      { name: "Water" },
      { name: "Water Heater" },
      { name: "WiFi" },
      { name: "Electricity" },
      { name: "Security" },
      { name: "Parking Space" },
      { name: "Recreation Center" },
    ],
    accommodationType: "Luxury Lodge",
    numberOfRooms: 5,
    reviews: [
      {
        userName: "Grace Hopper",
        userAvatar:
          "https://res.cloudinary.com/dcb4ilgmr/image/upload/v1716929513/utilities/LodgeMate_File/Ellipse_15_blt6rt.svg",
        date: "2023-02-21",
        text: "Amazing place with great facilities.",
        rating: 5,
      },
      {
        userName: "Henry Ford",
        userAvatar:
          "https://res.cloudinary.com/dcb4ilgmr/image/upload/v1716929513/utilities/LodgeMate_File/Ellipse_15_blt6rt.svg",
        date: "2023-02-18",
        text: "Luxurious and comfortable stay.",
        rating: 5,
      },
    ],
    contactNumber: "+2348123456792",
    facebookLink: "https://www.facebook.com/",
    igLink: "https://www.instagram.com/",
    twitterLink: "https://www.x.com/",
    linkedinLink: "https://www.linkedin.com/",
  },
  {
    id: 6,
    type: "lodge",
    name: "Serene Woods Lodge",
    address: "789 Woods Rd, Portland, OR",
    university: "University 4",
    averageReview: 3.8,
    reviewCount: 8,
    price: 150000,
    negotiable: false,
    description: "A basic lodge with essential amenities near University 4.",
    images: [
      "https://res.cloudinary.com/dcb4ilgmr/image/upload/v1716821883/utilities/LodgeMate_File/sd_v2047z.png",
      "https://res.cloudinary.com/dcb4ilgmr/image/upload/v1716821887/utilities/LodgeMate_File/adsas_hbwgl2.png",
      "https://res.cloudinary.com/dcb4ilgmr/image/upload/v1716821887/utilities/LodgeMate_File/adsas_hbwgl2.png",
      "https://res.cloudinary.com/dcb4ilgmr/image/upload/v1716821887/utilities/LodgeMate_File/adsas_hbwgl2.png",
    ],
    features: [
      { name: "Water" },
      { name: "WiFi" },
      { name: "Electricity" },
      { name: "Security" },
    ],
    accommodationType: "Basic Lodge",
    numberOfRooms: 2,
    reviews: [
      {
        userName: "Ivan Pavlov",
        userAvatar:
          "https://res.cloudinary.com/dcb4ilgmr/image/upload/v1716929513/utilities/LodgeMate_File/Ellipse_15_blt6rt.svg",
        date: "2023-01-21",
        text: "Good for the price.",
        rating: 4,
      },
      {
        userName: "Joan of Arc",
        userAvatar:
          "https://res.cloudinary.com/dcb4ilgmr/image/upload/v1716929513/utilities/LodgeMate_File/Ellipse_15_blt6rt.svg",
        date: "2023-01-18",
        text: "Basic but sufficient.",
        rating: 3,
      },
    ],
    contactNumber: "+2348123456793",
    facebookLink: "https://www.facebook.com/",
    igLink: "https://www.instagram.com/",
    twitterLink: "https://www.x.com/",
    linkedinLink: "https://www.linkedin.com/",
  },
  {
    id: 7,
    type: "lodge",
    name: "Crystal Lake Lodge",
    address: "654 Crystal Ln, Seattle, WA",
    university: "University 5",
    averageReview: 4.0,
    reviewCount: 25,
    price: 500000,
    negotiable: true,
    description: "A modern lodge with great facilities near University 5.",
    images: [
      "https://res.cloudinary.com/dcb4ilgmr/image/upload/v1716821883/utilities/LodgeMate_File/sd_v2047z.png",
      "https://res.cloudinary.com/dcb4ilgmr/image/upload/v1716821887/utilities/LodgeMate_File/adsas_hbwgl2.png",
      "https://res.cloudinary.com/dcb4ilgmr/image/upload/v1716821887/utilities/LodgeMate_File/adsas_hbwgl2.png",
      "https://res.cloudinary.com/dcb4ilgmr/image/upload/v1716821887/utilities/LodgeMate_File/adsas_hbwgl2.png",
    ],
    features: [
      { name: "Water" },
      { name: "WiFi" },
      { name: "Electricity" },
      { name: "Security" },
      { name: "Parking Space" },
    ],
    accommodationType: "Modern Lodge",
    numberOfRooms: 3,
    reviews: [
      {
        userName: "Katherine Johnson",
        userAvatar:
          "https://res.cloudinary.com/dcb4ilgmr/image/upload/v1716929513/utilities/LodgeMate_File/Ellipse_15_blt6rt.svg",
        date: "2023-01-15",
        text: "Great facilities and comfortable stay.",
        rating: 4,
      },
      {
        userName: "Leonardo da Vinci",
        userAvatar:
          "https://res.cloudinary.com/dcb4ilgmr/image/upload/v1716929513/utilities/LodgeMate_File/Ellipse_15_blt6rt.svg",
        date: "2023-01-10",
        text: "Modern and well-equipped.",
        rating: 4,
      },
    ],
    contactNumber: "+2348123456794",
    facebookLink: "https://www.facebook.com/",
    igLink: "https://www.instagram.com/",
    twitterLink: "https://www.x.com/",
    linkedinLink: "https://www.linkedin.com/",
  },
  {
    id: 8,
    type: "lodge",
    name: "Sunset Retreat Lodge",
    address: "101 Sunset Blvd, Malibu, CA",
    university: "University 3",
    averageReview: 4.6,
    reviewCount: 25,
    price: 340000,
    negotiable: true,
    description:
      "A serene retreat with stunning sunset views, perfect for relaxation and study.",
    images: [
      "https://res.cloudinary.com/dcb4ilgmr/image/upload/v1716821883/utilities/LodgeMate_File/sd_v2047z.png",
      "https://res.cloudinary.com/dcb4ilgmr/image/upload/v1716821887/utilities/LodgeMate_File/adsas_hbwgl2.png",
      "https://res.cloudinary.com/dcb4ilgmr/image/upload/v1716821887/utilities/LodgeMate_File/adsas_hbwgl2.png",
      "https://res.cloudinary.com/dcb4ilgmr/image/upload/v1716821883/utilities/LodgeMate_File/sd_v2047z.png",
    ],
    features: [
      { name: "WiFi" },
      { name: "Water Heater" },
      { name: "Electricity" },
      { name: "Security" },
      { name: "Recreation Center" },
      { name: "Parking Space" },
    ],
    accommodationType: "Self Con House",
    numberOfRooms: 4,
    reviews: [
      {
        userName: "David Green",
        userAvatar:
          "https://res.cloudinary.com/dcb4ilgmr/image/upload/v1716929513/utilities/LodgeMate_File/Ellipse_15_blt6rt.svg",
        date: "2023-05-21",
        text: "Amazing place with great views. Loved the peaceful environment!",
        rating: 5,
      },
      {
        userName: "Emma White",
        userAvatar:
          "https://res.cloudinary.com/dcb4ilgmr/image/upload/v1716929513/utilities/LodgeMate_File/Ellipse_15_blt6rt.svg",
        date: "2023-05-18",
        text: "Very comfortable and well-maintained lodge.",
        rating: 4,
      },
    ],
    contactNumber: "+2348123456789",
    facebookLink: "https://www.facebook.com/",
    igLink: "https://www.instagram.com/",
    twitterLink: "https://www.x.com/",
    linkedinLink: "https://www.linkedin.com/",
  },
  {
    id: 9,
    type: "lodge",
    name: "Ocean Breeze Lodge",
    address: "202 Ocean Dr, Miami Beach, FL",
    university: "University 4",
    averageReview: 4.7,
    reviewCount: 18,
    price: 210000,
    negotiable: false,
    description:
      "Experience the tranquility of the ocean while being close to the university.",
    images: [
      "https://res.cloudinary.com/dcb4ilgmr/image/upload/v1716821887/utilities/LodgeMate_File/adsas_hbwgl2.png",
      "https://res.cloudinary.com/dcb4ilgmr/image/upload/v1716821883/utilities/LodgeMate_File/sd_v2047z.png",
      "https://res.cloudinary.com/dcb4ilgmr/image/upload/v1716821887/utilities/LodgeMate_File/adsas_hbwgl2.png",
      "https://res.cloudinary.com/dcb4ilgmr/image/upload/v1716821887/utilities/LodgeMate_File/adsas_hbwgl2.png",
    ],
    features: [
      { name: "Water" },
      { name: "Electricity" },
      { name: "Security" },
      { name: "WiFi" },
    ],
    accommodationType: "Flat",
    numberOfRooms: 3,
    reviews: [
      {
        userName: "Grace Wilson",
        userAvatar:
          "https://res.cloudinary.com/dcb4ilgmr/image/upload/v1716929513/utilities/LodgeMate_File/Ellipse_15_blt6rt.svg",
        date: "2023-05-21",
        text: "Lovely lodge with a refreshing breeze from the ocean.",
        rating: 5,
      },
      {
        userName: "Henry Taylor",
        userAvatar:
          "https://res.cloudinary.com/dcb4ilgmr/image/upload/v1716929513/utilities/LodgeMate_File/Ellipse_15_blt6rt.svg",
        date: "2023-05-18",
        text: "Great place to stay, very relaxing and close to the beach.",
        rating: 4,
      },
    ],
    contactNumber: "+2348123456790",
    facebookLink: "https://www.facebook.com/",
    igLink: "https://www.instagram.com/",
    twitterLink: "https://www.x.com/",
    linkedinLink: "https://www.linkedin.com/",
  },
  {
    id: 10,
    type: "lodge",
    name: "Mountain View Lodge",
    address: "303 Hilltop Ave, Denver, CO",
    university: "University 5",
    averageReview: 4.8,
    reviewCount: 35,
    price: 200000,
    negotiable: true,
    description:
      "A lodge with breathtaking mountain views, ideal for students seeking tranquility.",
    images: [
      "https://res.cloudinary.com/dcb4ilgmr/image/upload/v1716821883/utilities/LodgeMate_File/sd_v2047z.png",
      "https://res.cloudinary.com/dcb4ilgmr/image/upload/v1716821887/utilities/LodgeMate_File/adsas_hbwgl2.png",
      "https://res.cloudinary.com/dcb4ilgmr/image/upload/v1716821887/utilities/LodgeMate_File/adsas_hbwgl2.png",
      "https://res.cloudinary.com/dcb4ilgmr/image/upload/v1716821887/utilities/LodgeMate_File/adsas_hbwgl2.png",
    ],
    features: [
      { name: "Water" },
      { name: "Electricity" },
      { name: "Security" },
      { name: "Parking Space" },
    ],
    accommodationType: "Self-Contained",
    numberOfRooms: 2,
    reviews: [
      {
        userName: "Ivy Martin",
        userAvatar:
          "https://res.cloudinary.com/dcb4ilgmr/image/upload/v1716929513/utilities/LodgeMate_File/Ellipse_15_blt6rt.svg",
        date: "2023-05-21",
        text: "Absolutely loved the views and the peaceful environment.",
        rating: 5,
      },
      {
        userName: "Jack Robinson",
        userAvatar:
          "https://res.cloudinary.com/dcb4ilgmr/image/upload/v1716929513/utilities/LodgeMate_File/Ellipse_15_blt6rt.svg",
        date: "2023-05-18",
        text: "Great place for students who love nature and quiet surroundings.",
        rating: 5,
      },
    ],
    contactNumber: "+2348123456791",
    facebookLink: "https://www.facebook.com/",
    igLink: "https://www.instagram.com/",
    twitterLink: "https://www.x.com/",
    linkedinLink: "https://www.linkedin.com/",
  },

  {
    id: 11,
    type: "lodge",
    name: "Forest Haven Lodge",
    address: "404 Woodland Rd, Asheville, NC",
    university: "University 6",
    averageReview: 4.9,
    reviewCount: 30,
    price: 220000,
    negotiable: true,
    description:
      "A tranquil lodge nestled in the forest, offering peace and serenity for students.",
    images: [
      "https://res.cloudinary.com/dcb4ilgmr/image/upload/v1716821883/utilities/LodgeMate_File/sd_v2047z.png",
      "https://res.cloudinary.com/dcb4ilgmr/image/upload/v1716821887/utilities/LodgeMate_File/adsas_hbwgl2.png",
      "https://res.cloudinary.com/dcb4ilgmr/image/upload/v1716821883/utilities/LodgeMate_File/sd_v2047z.png",
      "https://res.cloudinary.com/dcb4ilgmr/image/upload/v1716821887/utilities/LodgeMate_File/adsas_hbwgl2.png",
    ],
    features: [
      { name: "WiFi" },
      { name: "Water" },
      { name: "Electricity" },
      { name: "Security" },
      { name: "Garden" },
    ],
    accommodationType: "Self-Contained",
    numberOfRooms: 3,
    reviews: [
      {
        userName: "Katherine Lee",
        userAvatar:
          "https://res.cloudinary.com/dcb4ilgmr/image/upload/v1716929513/utilities/LodgeMate_File/Ellipse_15_blt6rt.svg",
        date: "2023-05-21",
        text: "Beautiful lodge with a great connection to nature.",
        rating: 5,
      },
      {
        userName: "Liam Harris",
        userAvatar:
          "https://res.cloudinary.com/dcb4ilgmr/image/upload/v1716929513/utilities/LodgeMate_File/Ellipse_15_blt6rt.svg",
        date: "2023-05-18",
        text: "Perfect place for a peaceful and productive study environment.",
        rating: 5,
      },
    ],
    contactNumber: "+2348123456792",
    facebookLink: "https://www.facebook.com/",
    igLink: "https://www.instagram.com/",
    twitterLink: "https://www.x.com/",
    linkedinLink: "https://www.linkedin.com/",
  },
  {
    id: 12,
    type: "lodge",
    name: "Urban Nest Lodge",
    address: "505 City Park, New York, NY",
    university: "University 7",
    averageReview: 4.8,
    reviewCount: 28,
    price: 360000,
    negotiable: false,
    description:
      "A modern lodge in the heart of the city, providing comfort and convenience for students.",
    images: [
      "https://res.cloudinary.com/dcb4ilgmr/image/upload/v1716821887/utilities/LodgeMate_File/adsas_hbwgl2.png",
      "https://res.cloudinary.com/dcb4ilgmr/image/upload/v1716821883/utilities/LodgeMate_File/sd_v2047z.png",
      "https://res.cloudinary.com/dcb4ilgmr/image/upload/v1716821887/utilities/LodgeMate_File/adsas_hbwgl2.png",
      "https://res.cloudinary.com/dcb4ilgmr/image/upload/v1716821887/utilities/LodgeMate_File/adsas_hbwgl2.png",
    ],
    features: [
      { name: "WiFi" },
      { name: "Water" },
      { name: "Electricity" },
      { name: "Security" },
      { name: "Gym" },
    ],
    accommodationType: "Flat",
    numberOfRooms: 4,
    reviews: [
      {
        userName: "Mia Brown",
        userAvatar:
          "https://res.cloudinary.com/dcb4ilgmr/image/upload/v1716929513/utilities/LodgeMate_File/Ellipse_15_blt6rt.svg",
        date: "2023-05-21",
        text: "Fantastic lodge with great amenities and location.",
        rating: 5,
      },
      {
        userName: "Noah Johnson",
        userAvatar:
          "https://res.cloudinary.com/dcb4ilgmr/image/upload/v1716929513/utilities/LodgeMate_File/Ellipse_15_blt6rt.svg",
        date: "2023-05-18",
        text: "Loved the modern feel and proximity to everything I need.",
        rating: 5,
      },
    ],
    contactNumber: "+2348123456793",
    facebookLink: "https://www.facebook.com/",
    igLink: "https://www.instagram.com/",
    twitterLink: "https://www.x.com/",
    linkedinLink: "https://www.linkedin.com/",
  },
];

export default products;
