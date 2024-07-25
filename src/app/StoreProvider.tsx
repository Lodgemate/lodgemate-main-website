'use client'
import { useEffect, useRef } from 'react'
import { Provider } from 'react-redux'
import { makeStore, AppStore } from '../lib/store'
import { getUsersData, selectAllUsersdata, selectAllUsersError, selectAllUsersStatus } from '@/lib/features/Users/usersSlice'
import { useAppDispatch, useAppSelector } from '@/lib/hooks'
import { selectAllAuthenticated, setAuthenticated } from '@/lib/features/Login/signinSlice'
import { user } from '@/lib/Types'

export default function StoreProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const storeRef = useRef<AppStore>()
  if (!storeRef.current) {
    getUsersData()
    // Create the store instance the first time this renders
    console.log(('rendered'))
    storeRef.current = makeStore()
  }

  return <Provider store={storeRef.current}>
    <DataInitializer>{children}</DataInitializer>
  </Provider>
}

function DataInitializer({ children }: { children: React.ReactNode }) {
  interface dataType{
    status: string,
    data: user
  }
  const dispatch = useAppDispatch();
 const data= useAppSelector(selectAllUsersdata) as null|dataType
 const status= useAppSelector(selectAllUsersStatus) 
 const error= useAppSelector(selectAllUsersError)
 const isAuthenticated = useAppSelector(selectAllAuthenticated);

console.log(data)
console.log(status)
console.log(error)
  useEffect(() => {
if (!isAuthenticated) {
   dispatch(getUsersData());}

}, [isAuthenticated,data,dispatch]);

useEffect(() => {
  if (!data) {
    return
  }
  if (status === 'succeeded' && data?.status === 'success') {
    console.log(data)
    dispatch(setAuthenticated())
  }
}, [status, data, dispatch]);
  return <>{children}</>;
}