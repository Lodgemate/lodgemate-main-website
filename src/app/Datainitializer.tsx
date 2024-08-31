import { useCallback, useEffect, useRef } from "react";
import {
  getUsersData,
  selectAllUsersdata,
  selectAllUsersError,
  selectAllUsersStatus,
} from "@/lib/features/Users/usersSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import {
  selectAllAuthenticated,
  setAuthenticated,
} from "@/lib/features/Login/signinSlice";
import { ApiResponse, user } from "@/lib/Types";
import { setLocation } from "@/lib/features/Filters/filterSlice";

function DataInitializer({ children }: { children: React.ReactNode }) {
  interface dataType {
    status: string;
    data: ApiResponse;
  }
  const dispatch = useAppDispatch();
  const data = useAppSelector(selectAllUsersdata);
  const status = useAppSelector(selectAllUsersStatus);
  const isAuthenticated = useAppSelector(selectAllAuthenticated);
 console.log(data)
  // Function to fetch user data
  const fetchData = useCallback(() => {
    const localStorageToken = localStorage.getItem("token");
    const parseToken =localStorageToken && JSON.parse(localStorageToken)
      if (parseToken) {
       dispatch(getUsersData());
      }
  }, [dispatch, isAuthenticated]);

  // Initial data fetching
  useEffect(() => {
    if (!data) {
      fetchData();
      
    }
  }, [fetchData]);
  useEffect(() => {
    if (!data) {
      return;
    }
    if (status === "succeeded" && data?.status === "success") {
      dispatch(setAuthenticated());
      const location = {
        latitude: data.data.user.latitude,
        longitude: data.data.user.longitude,
      };
      dispatch(setLocation(location));
    }
  }, [status, dispatch]);
  return <>{children}</>;
}
export default DataInitializer;
