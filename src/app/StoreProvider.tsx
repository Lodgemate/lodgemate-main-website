'use client'
import { useEffect, useRef } from 'react'
import { Provider } from 'react-redux'
import { makeStore, AppStore } from '../lib/store'
import { getUsersData, selectAllUsersdata, selectAllUsersError, selectAllUsersStatus } from '@/lib/features/Users/usersSlice'
import { useAppDispatch, useAppSelector } from '@/lib/hooks'
import { selectAllAuthenticated, setAuthenticated } from '@/lib/features/Login/signinSlice'
import { ApiResponse, user } from '@/lib/Types'
import { setLocation } from '@/lib/features/Filters/filterSlice'


export default function StoreProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const storeRef = useRef<AppStore>()
  if (!storeRef.current) {
    getUsersData()
    // Create the store instance the first time this renders
    storeRef.current = makeStore()
  }

  return <Provider store={storeRef.current}>
    <DataInitializer>{children}</DataInitializer>
  </Provider>
}

 function DataInitializer ({ children }: { children: React.ReactNode }) {
  interface dataType{
    status: string,
    data: ApiResponse
  }
  const dispatch = useAppDispatch();
 const data= useAppSelector(selectAllUsersdata)
 const status= useAppSelector(selectAllUsersStatus) 
 const error= useAppSelector(selectAllUsersError)
 const isAuthenticated = useAppSelector(selectAllAuthenticated);
  useEffect(() => {
if (!isAuthenticated) {
   dispatch(getUsersData());}

}, [isAuthenticated,data,dispatch]);

useEffect(() => {
  if (!data) {
    return
  }
  if (status === 'succeeded' && data?.status === 'success') {
    dispatch(setAuthenticated())
    const location ={
      latitude: data.data.user.latitude,
        longitude: data.data.user.longitude,
    }
    dispatch(setLocation(location))
    
  }
}, [status, data, dispatch]);
  return <>{children}</>;
}