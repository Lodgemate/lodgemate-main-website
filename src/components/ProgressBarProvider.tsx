'use client';
import { AppProgressBar as ProgressBar } from 'next-nprogress-bar';

export const Providers = ({ children }: any) => {
  return (
    <>
      {children}
      <ProgressBar
        height="4px"
        color='#0064B6'
        options={{ showSpinner: false }}
        shallowRouting
      />
    </>
  );
};
