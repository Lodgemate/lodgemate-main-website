export interface Service {
  id: number;
  type: string;
  name: string;
  address: string;
  university: string;
  price: number;
  priceMax: number;
  categories: string;
  description: string;
  images: string[];
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

const services: Service[] = [
  {
    id: 1,
    type: "service",
    name: "Handyman Services",
    address: "123 Main Street",
    university: "University 1",
    price: 2000,
    priceMax: 50000,
    categories: "Handyman",
    description: "Skilled handyman services for repairs and maintenance.",
    images: [
      "https://res.cloudinary.com/dcb4ilgmr/image/upload/v1716399836/utilities/LodgeMate_File/Imagee_doweb9.png",
      "https://res.cloudinary.com/dcb4ilgmr/image/upload/v1716222231/utilities/LodgeMate_File/Service2_mqfua9.png",
      "https://res.cloudinary.com/dcb4ilgmr/image/upload/v1716222231/utilities/LodgeMate_File/Service3_mqfua9.png",
      "https://res.cloudinary.com/dcb4ilgmr/image/upload/v1716222231/utilities/LodgeMate_File/Service4_mqfua9.png",
      "https://res.cloudinary.com/dcb4ilgmr/image/upload/v1716222231/utilities/LodgeMate_File/Service5_mqfua9.png",
    ],
    reviews: [
      {
        userName: "John Smith",
        userAvatar:
          "https://res.cloudinary.com/dcb4ilgmr/image/upload/v1716929513/utilities/LodgeMate_File/Ellipse_15_blt6rt.svg",
        date: "2023-05-20",
        text: "Great service! Fixed my plumbing issue quickly.",
        rating: 4,
      },
      {
        userName: "Emma White",
        userAvatar:
          "https://res.cloudinary.com/dcb4ilgmr/image/upload/v1716929513/utilities/LodgeMate_File/Ellipse_15_blt6rt.svg",
        date: "2023-05-18",
        text: "Very professional. Helped with electrical repairs.",
        rating: 5,
      },
    ],
    contactNumber: "+1234567890",
    facebookLink: "https://www.facebook.com/",
    igLink: "https://www.instagram.com/",
    twitterLink: "https://www.x.com/",
    linkedinLink: "https://www.linkedin.com/",
  },
  {
    id: 2,
    type: "service",
    name: "Personal Chef Services",
    address: "456 Elm Street",
    university: "University 2",
    price: 5000,
    priceMax: 100000,
    categories: "Chef",
    description: "Exquisite culinary experiences with personalized menus.",
    images: [
      "https://res.cloudinary.com/dcb4ilgmr/image/upload/v1716399836/utilities/LodgeMate_File/Imagee_doweb9.png",
      "https://res.cloudinary.com/dcb4ilgmr/image/upload/v1716222231/utilities/LodgeMate_File/Service2_mqfua9.png",
      "https://res.cloudinary.com/dcb4ilgmr/image/upload/v1716222231/utilities/LodgeMate_File/Service3_mqfua9.png",
      "https://res.cloudinary.com/dcb4ilgmr/image/upload/v1716222231/utilities/LodgeMate_File/Service4_mqfua9.png",
      "https://res.cloudinary.com/dcb4ilgmr/image/upload/v1716222231/utilities/LodgeMate_File/Service5_mqfua9.png",
    ],
    reviews: [
      {
        userName: "Sophia Johnson",
        userAvatar:
          "https://res.cloudinary.com/dcb4ilgmr/image/upload/v1716929513/utilities/LodgeMate_File/Ellipse_15_blt6rt.svg",
        date: "2023-05-22",
        text: "Amazing meals, very impressed with the service!",
        rating: 5,
      },
      {
        userName: "Daniel Brown",
        userAvatar:
          "https://res.cloudinary.com/dcb4ilgmr/image/upload/v1716929513/utilities/LodgeMate_File/Ellipse_15_blt6rt.svg",
        date: "2023-05-19",
        text: "Delicious food, exceeded expectations!",
        rating: 5,
      },
    ],
    contactNumber: "+2348123456794",
    facebookLink: "https://www.facebook.com/",
    igLink: "https://www.instagram.com/",
    twitterLink: "https://www.x.com/",
    linkedinLink: "https://www.linkedin.com/",
  },
  {
    id: 3,
    type: "service",
    name: "Gardening and Landscaping",
    address: "789 Oak Avenue",
    university: "University 3",
    price: 3000,
    priceMax: 80000,
    categories: "Gardener",
    description: "Expert gardening and landscaping services.",
    images: [
      "https://res.cloudinary.com/dcb4ilgmr/image/upload/v1716399836/utilities/LodgeMate_File/Imagee_doweb9.png",
      "https://res.cloudinary.com/dcb4ilgmr/image/upload/v1716222231/utilities/LodgeMate_File/Service2_mqfua9.png",
      "https://res.cloudinary.com/dcb4ilgmr/image/upload/v1716222231/utilities/LodgeMate_File/Service3_mqfua9.png",
      "https://res.cloudinary.com/dcb4ilgmr/image/upload/v1716222231/utilities/LodgeMate_File/Service4_mqfua9.png",
      "https://res.cloudinary.com/dcb4ilgmr/image/upload/v1716222231/utilities/LodgeMate_File/Service5_mqfua9.png",
    ],
    reviews: [
      {
        userName: "Olivia Wilson",
        userAvatar:
          "https://res.cloudinary.com/dcb4ilgmr/image/upload/v1716929513/utilities/LodgeMate_File/Ellipse_15_blt6rt.svg",
        date: "2023-05-20",
        text: "Transformed my garden beautifully!",
        rating: 4,
      },
      {
        userName: "Liam Martinez",
        userAvatar:
          "https://res.cloudinary.com/dcb4ilgmr/image/upload/v1716929513/utilities/LodgeMate_File/Ellipse_15_blt6rt.svg",
        date: "2023-05-18",
        text: "Great landscaping work, highly recommend!",
        rating: 5,
      },
    ],
    contactNumber: "+1234567891",
    facebookLink: "https://www.facebook.com/",
    igLink: "https://www.instagram.com/",
    twitterLink: "https://www.x.com/",
    linkedinLink: "https://www.linkedin.com/",
  },
  {
    id: 4,
    type: "service",
    name: "Fitness Trainer Services",
    address: "101 Pine Street",
    university: "University 4",
    price: 4000,
    priceMax: 60000,
    categories: "Fitness Trainer",
    description: "Personalized fitness training sessions for all levels.",
    images: [
      "https://res.cloudinary.com/dcb4ilgmr/image/upload/v1716399836/utilities/LodgeMate_File/Imagee_doweb9.png",
      "https://res.cloudinary.com/dcb4ilgmr/image/upload/v1716222231/utilities/LodgeMate_File/Service2_mqfua9.png",
      "https://res.cloudinary.com/dcb4ilgmr/image/upload/v1716222231/utilities/LodgeMate_File/Service3_mqfua9.png",
      "https://res.cloudinary.com/dcb4ilgmr/image/upload/v1716222231/utilities/LodgeMate_File/Service4_mqfua9.png",
      "https://res.cloudinary.com/dcb4ilgmr/image/upload/v1716222231/utilities/LodgeMate_File/Service5_mqfua9.png",
    ],
    reviews: [
      {
        userName: "Sophia Anderson",
        userAvatar:
          "https://res.cloudinary.com/dcb4ilgmr/image/upload/v1716929513/utilities/LodgeMate_File/Ellipse_15_blt6rt.svg",
        date: "2023-05-21",
        text: "Best trainer ever! Very motivating and knowledgeable.",
        rating: 5,
      },
      {
        userName: "James White",
        userAvatar:
          "https://res.cloudinary.com/dcb4ilgmr/image/upload/v1716929513/utilities/LodgeMate_File/Ellipse_15_blt6rt.svg",
        date: "2023-05-18",
        text: "Helped me achieve my fitness goals!",
        rating: 5,
      },
    ],
    contactNumber: "+2348123456795",
    facebookLink: "https://www.facebook.com/",
    igLink: "https://www.instagram.com/",
    twitterLink: "https://www.x.com/",
    linkedinLink: "https://www.linkedin.com/",
  },
  {
    id: 5,
    type: "service",
    name: "IT Support Services",
    address: "456 River Street",
    university: "University 5",
    price: 3000,
    priceMax: 80000,
    categories: "IT Support",
    description: "Expert IT support services for businesses and individuals.",
    images: [
      "https://res.cloudinary.com/dcb4ilgmr/image/upload/v1716399836/utilities/LodgeMate_File/Imagee_doweb9.png",
      "https://res.cloudinary.com/dcb4ilgmr/image/upload/v1716222231/utilities/LodgeMate_File/Service2_mqfua9.png",
      "https://res.cloudinary.com/dcb4ilgmr/image/upload/v1716222231/utilities/LodgeMate_File/Service3_mqfua9.png",
      "https://res.cloudinary.com/dcb4ilgmr/image/upload/v1716222231/utilities/LodgeMate_File/Service4_mqfua9.png",
      "https://res.cloudinary.com/dcb4ilgmr/image/upload/v1716222231/utilities/LodgeMate_File/Service5_mqfua9.png",
    ],
    reviews: [
      {
        userName: "Emma Davis",
        userAvatar:
          "https://res.cloudinary.com/dcb4ilgmr/image/upload/v1716929513/utilities/LodgeMate_File/Ellipse_15_blt6rt.svg",
        date: "2023-05-20",
        text: "Quick response and resolved my tech issues.",
        rating: 4,
      },
      {
        userName: "Michael Harris",
        userAvatar:
          "https://res.cloudinary.com/dcb4ilgmr/image/upload/v1716929513/utilities/LodgeMate_File/Ellipse_15_blt6rt.svg",
        date: "2023-05-18",
        text: "Very knowledgeable. Fixed my computer in no time.",
        rating: 5,
      },
    ],
    contactNumber: "+1234567892",
    facebookLink: "https://www.facebook.com/",
    igLink: "https://www.instagram.com/",
    twitterLink: "https://www.x.com/",
    linkedinLink: "https://www.linkedin.com/",
  },
  {
    id: 6,
    type: "service",
    name: "Event Planning Services",
    address: "789 Oak Avenue",
    university: "University 6",
    price: 5000,
    priceMax: 100000,
    categories: "Event Planner",
    description: "Professional event planning services for all occasions.",
    images: [
      "https://res.cloudinary.com/dcb4ilgmr/image/upload/v1716399836/utilities/LodgeMate_File/Imagee_doweb9.png",
      "https://res.cloudinary.com/dcb4ilgmr/image/upload/v1716222231/utilities/LodgeMate_File/Service2_mqfua9.png",
      "https://res.cloudinary.com/dcb4ilgmr/image/upload/v1716222231/utilities/LodgeMate_File/Service3_mqfua9.png",
      "https://res.cloudinary.com/dcb4ilgmr/image/upload/v1716222231/utilities/LodgeMate_File/Service4_mqfua9.png",
      "https://res.cloudinary.com/dcb4ilgmr/image/upload/v1716222231/utilities/LodgeMate_File/Service5_mqfua9.png",
    ],
    reviews: [
      {
        userName: "Oliver Clark",
        userAvatar:
          "https://res.cloudinary.com/dcb4ilgmr/image/upload/v1716929513/utilities/LodgeMate_File/Ellipse_15_blt6rt.svg",
        date: "2023-05-21",
        text: "Organized a perfect event. Everything went smoothly.",
        rating: 5,
      },
      {
        userName: "Sophie Taylor",
        userAvatar:
          "https://res.cloudinary.com/dcb4ilgmr/image/upload/v1716929513/utilities/LodgeMate_File/Ellipse_15_blt6rt.svg",
        date: "2023-05-18",
        text: "Very creative and accommodating. Highly recommend!",
        rating: 5,
      },
    ],
    contactNumber: "+2348123456796",
    facebookLink: "https://www.facebook.com/",
    igLink: "https://www.instagram.com/",
    twitterLink: "https://www.x.com/",
    linkedinLink: "https://www.linkedin.com/",
  },
];

export default services;
