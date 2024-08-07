export const Endpoints ={
    signUp:"",
    signIn:`${process.env.NEXT_PUBLIC_BASE_URL}/v1/user/login`,
    forgotpw:`${process.env.NEXT_PUBLIC_BASE_URL}/v1/user/forgot-password`,
    resetpw:`${process.env.NEXT_PUBLIC_BASE_URL}/v1/user/reset-password`,
    verifyEmail:`${process.env.NEXT_PUBLIC_BASE_URL}/v1/user/send-email-otp`,
    verifyEmailPost:`${process.env.NEXT_PUBLIC_BASE_URL}/v1/user/verify-email`,
    googleAuth:`${process.env.NEXT_PUBLIC_BASE_URL}/v1/user/auth/google/web-sign-in`,
    getUsers:`${process.env.NEXT_PUBLIC_BASE_URL}/v1/user/me`,
    getPublicLodges:`${process.env.NEXT_PUBLIC_BASE_URL}/v1/lodges/p?`,
    getPublicLodgesbyId:`${process.env.NEXT_PUBLIC_BASE_URL}/v1/lodges/p/`,
    getPrivateLodges:`${process.env.NEXT_PUBLIC_BASE_URL}/v1/lodges?`,
    getPrivateLodgesbyId:`${process.env.NEXT_PUBLIC_BASE_URL}/v1/lodges/`,
    getPublicServices:`${process.env.NEXT_PUBLIC_BASE_URL}/v1/services/p?`,
    getPublicServicesbyId:`${process.env.NEXT_PUBLIC_BASE_URL}/v1/services/p/`,
    getPrivateServices:`${process.env.NEXT_PUBLIC_BASE_URL}/v1/lodges?`,
    getPrivateServicesbyId:`${process.env.NEXT_PUBLIC_BASE_URL}/v1/lodges/`,
    getPublicRoommates:`${process.env.NEXT_PUBLIC_BASE_URL}/v1/roommate-requests/p?`,
    getPublicRoommatesbyId:`${process.env.NEXT_PUBLIC_BASE_URL}/v1/roommate-requests/p/`,
    getPrivateRoommates:`${process.env.NEXT_PUBLIC_BASE_URL}/v1/roommate-requests?`,
    getPrivateRoommatesbyId:`${process.env.NEXT_PUBLIC_BASE_URL}/v1/roommate-requests/`,
}