import React from 'react';
import './styles/index.css';
import { Helmet } from 'react-helmet-async';
import { Routes } from './routes';

export const App = () => {
  return (
    <>
      <Helmet defaultTitle="Anonymous Project" titleTemplate="%s" />
      <Routes />
    </>
  );
};
