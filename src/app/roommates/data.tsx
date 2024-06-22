export interface Roommate {
  id: number;
  type: string;
  name: string;
  address: string;
  university: string;
  sex: string;
  houseType: string;
  availableSpace: number;
  hobbies: string[];
  lookingFor: string;
  images: string;
  facebookLink: string;
  igLink: string;
  twitterLink: string;
  linkedinLink: string;
}

const roommates: Roommate[] = [
  {
    id: 1,
    type: "roommate",
    name: "Jude Onyeka",
    address: "Service Address 5",
    university: "University 5",
    sex: "male",
    houseType: "Self contain",
    availableSpace: 1,
    hobbies: ["Musician", "Artist", "Football addict", "Gamer", "Volunteering"],
    lookingFor:
      "Lörem ipsum radiotopi triplastisk att radioitet medelvalens, polimeter. Neometer konitet, cynosmos termometer entotal. Heterotropi androtes. Desso primatos postcism. Operafaktisk perform tritet. Hypertyp fotoform terrafili. Cynos Jamal ksjfkg ksjfgks mos bitiv fast biokrati primamatisk.",
    images:
      "https://res.cloudinary.com/dcb4ilgmr/image/upload/v1716397590/utilities/LodgeMate_File/Imageertyu_oqeuut.png",
    facebookLink:
      "https://www.facebook.com/profile.php?id=61557941962670&mibextid=ZbWKwL",
    igLink:
      "https://www.instagram.com/profile.php?id=61557941962670&mibextid=ZbWKwL",
    twitterLink:
      "https://www.x.com/profile.php?id=61557941962670&mibextid=ZbWKwL",
    linkedinLink:
      "https://www.linkedin.com/profile.php?id=61557941962670&mibextid=ZbWKwL",
  },
  {
    id: 2,
    type: "roommate",
    name: "Anna Smith",
    address: "123 Oak Street",
    university: "University 1",
    sex: "female",
    houseType: "Apartment",
    availableSpace: 2,
    hobbies: ["Book warm", "Dancer", "Foodie"],
    lookingFor: "Looking for a clean and responsible roommate who loves pets.",
    images:
      "https://res.cloudinary.com/dcb4ilgmr/image/upload/v1716397589/utilities/LodgeMate_File/Imagegjhk_rtnogl.png",
    facebookLink: "https://www.facebook.com/profile.php?id=123456789",
    igLink: "https://www.instagram.com/profile.php?id=123456789",
    twitterLink: "https://www.x.com/profile.php?id=123456789",
    linkedinLink: "https://www.linkedin.com/profile.php?id=123456789",
  },
  {
    id: 3,
    type: "roommate",
    name: "Michael Johnson",
    address: "456 Maple Avenue",
    university: "University 2",
    sex: "male",
    houseType: "Shared House",
    availableSpace: 1,
    hobbies: ["Techy", "Photography", "Fitness"],
    lookingFor:
      "Looking for a friendly and sociable roommate who enjoys outdoor activities.",
    images:
      "https://res.cloudinary.com/dcb4ilgmr/image/upload/v1716397589/utilities/LodgeMate_File/Imagewerty_teprzd.png",
    facebookLink: "https://www.facebook.com/profile.php?id=987654321",
    igLink: "https://www.instagram.com/profile.php?id=987654321",
    twitterLink: "https://www.x.com/profile.php?id=987654321",
    linkedinLink: "https://www.linkedin.com/profile.php?id=987654321",
  },
  {
    id: 4,
    type: "roommate",
    name: "Emily Davis",
    address: "789 Birch Road",
    university: "University 3",
    sex: "female",
    houseType: "Condo",
    availableSpace: 1,
    hobbies: ["Artist", "Dancer", "Writer"],
    lookingFor: "Looking for a creative and easy-going roommate.",
    images:
      "https://res.cloudinary.com/dcb4ilgmr/image/upload/v1716397588/utilities/LodgeMate_File/Imagesfdghjk_ofiz6j.png",
    facebookLink: "https://www.facebook.com/profile.php?id=654321987",
    igLink: "https://www.instagram.com/profile.php?id=654321987",
    twitterLink: "https://www.x.com/profile.php?id=654321987",
    linkedinLink: "https://www.linkedin.com/profile.php?id=654321987",
  },
  {
    id: 5,
    type: "roommate",
    name: "David Wilson",
    address: "101 Cedar Lane",
    university: "University 4",
    sex: "male",
    houseType: "Townhouse",
    availableSpace: 1,
    hobbies: ["Foodie", "Evangelism", "Photography"],
    lookingFor: "Looking for a respectful and tidy roommate.",
    images:
      "https://res.cloudinary.com/dcb4ilgmr/image/upload/v1716397589/utilities/LodgeMate_File/Imagehk_sqx2p6.png",
    facebookLink: "https://www.facebook.com/profile.php?id=456789123",
    igLink: "https://www.instagram.com/profile.php?id=456789123",
    twitterLink: "https://www.x.com/profile.php?id=456789123",
    linkedinLink: "https://www.linkedin.com/profile.php?id=456789123",
  },
  {
    id: 6,
    type: "roommate",
    name: "Olivia Brown",
    address: "202 Pine Street",
    university: "University 5",
    sex: "female",
    houseType: "Loft",
    availableSpace: 1,
    hobbies: ["Neat", "Fashionista", "Volunteering"],
    lookingFor: "Looking for a calm and organized roommate.",
    images:
      "https://res.cloudinary.com/dcb4ilgmr/image/upload/v1716397590/utilities/LodgeMate_File/Imageertyu_oqeuut.png",
    facebookLink: "https://www.facebook.com/profile.php?id=321654987",
    igLink: "https://www.instagram.com/profile.php?id=321654987",
    twitterLink: "https://www.x.com/profile.php?id=321654987",
    linkedinLink: "https://www.linkedin.com/profile.php?id=321654987",
  },
  {
    id: 7,
    type: "roommate",
    name: "Liam Martinez",
    address: "303 Elm Avenue",
    university: "University 6",
    sex: "male",
    houseType: "Bungalow",
    availableSpace: 2,
    hobbies: ["Gamer", "Techy", "Musician"],
    lookingFor: "Looking for a tech-savvy roommate who enjoys gaming.",
    images:
      "https://res.cloudinary.com/dcb4ilgmr/image/upload/v1716397589/utilities/LodgeMate_File/Imagehk_sqx2p6.png",
    facebookLink: "https://www.facebook.com/profile.php?id=654987321",
    igLink: "https://www.instagram.com/profile.php?id=654987321",
    twitterLink: "https://www.x.com/profile.php?id=654987321",
    linkedinLink: "https://www.linkedin.com/profile.php?id=654987321",
  },
  {
    id: 8,
    type: "roommate",
    name: "Sophia Anderson",
    address: "404 Oak Lane",
    university: "University 7",
    sex: "female",
    houseType: "Duplex",
    availableSpace: 1,
    hobbies: ["Foodie", "Yoga", "Fitness"],
    lookingFor: "Looking for a clean and quiet roommate.",
    images:
      "https://res.cloudinary.com/dcb4ilgmr/image/upload/v1716397589/utilities/LodgeMate_File/Imagehk_sqx2p6.png",
    facebookLink: "https://www.facebook.com/profile.php?id=789123456",
    igLink: "https://www.instagram.com/profile.php?id=789123456",
    twitterLink: "https://www.x.com/profile.php?id=789123456",
    linkedinLink: "https://www.linkedin.com/profile.php?id=789123456",
  },
  {
    id: 9,
    type: "roommate",
    name: "James White",
    address: "505 Birch Street",
    university: "University 8",
    sex: "male",
    houseType: "Shared House",
    availableSpace: 2,
    hobbies: ["Photography", "Writer", "Party freak"],
    lookingFor: "Looking for a creative and open-minded roommate.",
    images:
      "https://res.cloudinary.com/dcb4ilgmr/image/upload/v1716397589/utilities/LodgeMate_File/Imagehk_sqx2p6.png",
    facebookLink: "https://www.facebook.com/profile.php?id=123789456",
    igLink: "https://www.instagram.com/profile.php?id=123789456",
    twitterLink: "https://www.x.com/profile.php?id=123789456",
    linkedinLink: "https://www.linkedin.com/profile.php?id=123789456",
  },
  {
    id: 10,
    type: "roommate",
    name: "Mia Harris",
    address: "606 Pine Avenue",
    university: "University 9",
    sex: "female",
    houseType: "Studio",
    availableSpace: 1,
    hobbies: ["Artist", "Dancer", "Cooking"],
    lookingFor: "Looking for an artistic and friendly roommate.",
    images:
      "https://res.cloudinary.com/dcb4ilgmr/image/upload/v1716397589/utilities/LodgeMate_File/Imagehk_sqx2p6.png",
    facebookLink: "https://www.facebook.com/profile.php?id=456123789",
    igLink: "https://www.instagram.com/profile.php?id=456123789",
    twitterLink: "https://www.x.com/profile.php?id=456123789",
    linkedinLink: "https://www.linkedin.com/profile.php?id=456123789",
  },
];
export default roommates;
