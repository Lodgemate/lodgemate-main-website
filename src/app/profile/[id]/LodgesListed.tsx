
import ProductCard from "@/components/Lodges/profileLodges";
import Link from "next/link";
import React, { useMemo, useState } from "react";
import { useAppSelector } from '@/lib/hooks';
import { selectAllUsersdata } from '@/lib/features/Users/usersSlice';
import { LodgesApiResponse } from '@/lib/Types';
import GallerySkeleton from '@/components/Skeletons/cardsSkeleton';
import EditLodgeModal from "./modals/EditLodgeModal";
interface LodgeListedProps{
  data: LodgesApiResponse | null
}


const LodgeListed: React.FC<LodgeListedProps> = React.memo(({data}) => {
  const [allData, setAllData] = useState(data)
 if (!data) {
  <>Loading.....</>
 }
  const MappedLodges=()=>{
    return(
        <>
        {allData?.status === 'success' && allData?.data.lodges.slice(0, 9).map((product) => (
          <ProductCard
          product ={product}
            key={product._id}
            id={product._id }
            type={product.type}
            name={product.lodgeName}
            address={product.address_text}
            // university={product.university}
            images={product.photos}
            price={product.price}
            imageUrl={product.coverphoto}
            location={product.administrativeArea}
            // nearbyUniversity={product.nearbyUniversity}
          />
        ))}

        </>
    )
  }
  return (

    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {!data?<>Loading.....</>:
          <MappedLodges/>
        }
      </div>

    </div>
  );
});

export default LodgeListed;
