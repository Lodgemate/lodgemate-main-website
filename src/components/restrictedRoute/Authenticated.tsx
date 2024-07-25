// components/withAuth.tsx
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { selectAllAuthenticated } from "@/lib/features/Login/signinSlice";
import { useAppSelector } from "@/lib/hooks";

const withAuth = (WrappedComponent: React.ComponentType) => {
  return (props: any) => {
    const isAuthenticated = useAppSelector(selectAllAuthenticated);
    const router = useRouter();
    useEffect(() => {
      if (isAuthenticated) {
        router.push("/");
      }
    }, [isAuthenticated, router]);

    // if (!isAuthenticated) {
    //   return null; // Or a loading spinner
    // }
    return <WrappedComponent {...props} />;
  };
};

export default withAuth;
