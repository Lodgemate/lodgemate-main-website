'use client';
import { AppProgressBar as ProgressBar } from 'next-nprogress-bar';

export const Providers = ({ children }: any) => {
  return (
    <>
      {children}
      <ProgressBar
        height="4px"
        color="#30A2FF"
        options={{ showSpinner: false }}
        shallowRouting
      />
    </>
  );
};
