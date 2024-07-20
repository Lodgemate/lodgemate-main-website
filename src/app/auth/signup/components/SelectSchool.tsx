import React, { useState } from "react";

const universities: string[] = [
  "Harvard University",
  "Stanford University",
  "Massachusetts Institute of Technology",
  "University of Cambridge",
  "University of Oxford",
  "California Institute of Technology",
  "Princeton University",
  "Yale University",
  "University of Chicago",
  "Columbia University",
  "Abubakar Tafawa Balewa University, Bauchi",
  "Ahmadu Bello University, Zaria",
  "Bayero University, Kano",
  "Federal University Gashua, Yobe",
  "Federal University of Agriculture, Abeokuta",
  "Federal University of Petroleum Resources, Effurun",
  "Federal University of Technology, Akure",
  "Federal University of Technology, Minna",
  "Federal University of Technology, Owerri",
  "Federal University, Dutse, Jigawa State",
  "Federal University, Dutsin-Ma, Katsina",
  "Federal University, Kashere, Gombe State",
  "Federal University, Lafia, Nasarawa State",
  "Federal University, Lokoja, Kogi State",
  "Federal University, Ndufu-Alike, Ebonyi State",
  "Federal University, Otuoke, Bayelsa",
  "Federal University, Oye-Ekiti, Ekiti State",
  "Federal University, Wukari, Taraba State",
  "Federal University, Birnin Kebbi",
  "Federal University, Gusau Zamfara",
  "Michael Okpara University of Agricultural Umudike",
  "Modibbo Adama University of Technology, Yola",
  "National Open University of Nigeria, Lagos",
  "Nigeria Police Academy Wudil",
  "Nigerian Defence Academy Kaduna",
  "Nnamdi Azikiwe University, Awka",
  "Obafemi Awolowo University, Ile-Ife",
  "University of Abuja, Gwagwalada",
  "Federal University of Agriculture, Makurdi",
  "University of Benin",
  "University of Calabar",
  "University of Ibadan",
  "University of Ilorin",
  "University of Jos",
  "University of Lagos",
  "University of Maiduguri",
  "University of Nigeria, Nsukka",
  "University of Port-Harcourt",
  "University of Uyo",
  "Usumanu Danfodiyo University",
  "Abia State University, Uturu",
  "Adamawa State University Mubi",
  "Adekunle Ajasin University, Akungba",
  "Akwa Ibom State University of Technology, Uyo",
  "Ambrose Alli University, Ekpoma",
  "Chukwuemeka Odumegwu Ojukwu University, Uli",
  "Bauchi State University, Gadau",
  "Benue State University, Makurdi",
  "Yobe State University, Damaturu",
  "Cross River State University of Technology, Calabar",
  "Delta State University Abraka",
  "Ebonyi State University, Abakaliki",
  "Ekiti State University",
  "Enugu State University of Science and Technology, Enugu",
  "Gombe State Univeristy, Gombe",
  "Ibrahim Badamasi Babangida University, Lapai",
  "Ignatius Ajuru University of Education,Rumuolumeni",
  "Imo State University, Owerri",
  "Sule Lamido University, Kafin Hausa, Jigawa",
  "Kaduna State University, Kaduna",
  "Kano University of Science & Technology, Wudil",
  "Kebbi State University of Science and Technology, Aliero",
  "Kogi State University Anyigba",
  "Kwara State University, Ilorin",
  "Ladoke Akintola University of Technology, Ogbomoso",
  "Ondo State University of Science and Technology Okitipupa",
  "River State University of Science and Technology",
  "Olabisi Onabanjo University, Ago Iwoye",
  "Lagos State University, Ojo",
  "Niger Delta University Yenagoa",
  "Nasarawa State University Keffi",
  "Plateau State University Bokkos",
  "Tai Solarin University of Education Ijebu Ode",
  "Umar Musa Yar' Adua University Katsina",
  "Osun State University Osogbo",
  "Taraba State University, Jalingo",
  "Sokoto State University",
  "Yusuf Maitama Sule University Kano",
  "Oyo State Technical University Ibadan",
  "Ondo State University of Medical Sciences",
  "Edo University Iyamo",
  "Eastern Palm University Ogboko, Imo State",
  "University of Africa Toru Orua, Bayelsa State",
  "Bornu State University, Maiduguri",
  "Moshood Abiola University of Science and Technology Abeokuta",
  "Gombe State University of Science and Technology",
  "Zamfara State University",
];

function SelectSchool() {
  const [inputValue, setInputValue] = useState<string>("");
  const [filteredUniversities, setFilteredUniversities] = useState<string[]>(
    []
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    if (value) {
      const filtered = universities.filter((university) =>
        university.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredUniversities(filtered);
    } else {
      setFilteredUniversities([]);
    }
  };

  const handleSelectUniversity = (university: string) => {
    setInputValue(university);
    setFilteredUniversities([]);
  };

  return (
    <div className="relative flex w-full sm:w-1/2">
      <input
        type="text"
        name="school"
        id="school"
        placeholder="School"
        value={inputValue}
        onChange={handleInputChange}
        className="mt-1 block h-[48px] w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none"
      />
      {filteredUniversities.length > 0 && (
        <ul className="absolute top-12 z-10 mt-1 w-full bg-white h-[200px] overflow-y-auto border border-gray-300 rounded-md shadow-lg">
          {filteredUniversities.map((university) => (
            <li
              key={university}
              onClick={() => handleSelectUniversity(university)}
              className="px-4 py-2 cursor-pointer  hover:bg-gray-200"
            >
              {university}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default SelectSchool;
