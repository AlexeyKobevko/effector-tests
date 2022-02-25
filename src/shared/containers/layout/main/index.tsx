import React, { FC } from 'react';
import { Header, Footer } from 'shared/containers';

export const LayoutMain: FC = ({ children }) => {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
};
