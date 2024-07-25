export const Endpoints ={
    signUp:"",
    signIn:`${process.env.NEXT_PUBLIC_BASE_URL}/v1/user/login`,
    forgotpw:`${process.env.NEXT_PUBLIC_BASE_URL}/v1/user/forgot-password`,
    resetpw:`${process.env.NEXT_PUBLIC_BASE_URL}/v1/user/reset-password`,
    verifyEmail:`${process.env.NEXT_PUBLIC_BASE_URL}/v1/user/send-email-otp`,
    verifyEmailPost:`${process.env.NEXT_PUBLIC_BASE_URL}/v1/user/verify-email`,
    googleAuth:`${process.env.NEXT_PUBLIC_BASE_URL}/v1/user/auth/google/web-sign-in`,
    getUsers:`${process.env.NEXT_PUBLIC_BASE_URL}/v1/user/me`
}