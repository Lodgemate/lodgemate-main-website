// ShouldHide.tsx
import React, { useEffect, useState } from "react";
import { useAppSelector } from "@/lib/hooks";
import { selectAllUsersdata } from "@/lib/features/Users/usersSlice";
import { FetchApi } from "@/utils/Fetchdata";
import { Endpoints } from "@/services/Api/endpoints";
import { useParams } from "next/navigation";

interface ShouldHideProps {
  children: React.ReactNode;
}

const ShouldHide: React.FC<ShouldHideProps> = ({ children }) => {
  const data = useAppSelector(selectAllUsersdata);
  const [currentUserData, setcurrentUserData] = useState<any>(null);
  const params = useParams();
  const { id } = params || {};

  // Fetch mainUser from the global state
  const mainUser = data?.data.user._id;

  // Fetch currentUserData from the API
  useEffect(() => {
    const url = `${Endpoints.getUserById}${id}`;
    const body = {
      headers: {
        "content-type": "Application-json",
      },
    };
    const fetchUserData = async () => {
      const res: any = await FetchApi(url, body);
      if (res.status === "success") {
        setcurrentUserData(res);
      }
    };
    fetchUserData();
  }, [id]);

  // Get the user ID from the fetched current user data
  const otherUser = currentUserData?.data.user._id;

  const shouldHide = mainUser !== otherUser;

  // Conditionally hide content based on comparison
  return <div className={shouldHide ? "hidden" : "bg-white"}>{children}</div>;
};

export default ShouldHide;
