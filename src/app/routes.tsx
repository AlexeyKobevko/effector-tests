import React, { FC } from 'react';
import { Switch } from 'react-router-dom';
import { RouteWrapper } from './router/ui/route-wrapper';
import { Route } from './router';
import { LayoutMain } from 'shared/containers';
import { MainPage, SinglePage, CommonPage, NotFoundPage } from 'pages';

export const Routes: FC = () => {
  return (
    <Switch>
      <RouteWrapper path={Route.root} component={MainPage} layout={LayoutMain} exact />
      <RouteWrapper path={Route.single} component={SinglePage} layout={LayoutMain} exact />
      <RouteWrapper path={Route.common} component={CommonPage} layout={LayoutMain} exact />
      <RouteWrapper component={NotFoundPage} layout={LayoutMain} exact />
    </Switch>
  );
};
