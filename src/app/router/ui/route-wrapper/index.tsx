import React, { FC, ElementType } from 'react';
import { Route, RouteProps } from 'react-router-dom';

interface Props extends Omit<RouteProps, 'component'> {
  component: ElementType;
  layout: ElementType;
}

export const RouteWrapper: FC<Props> = ({ component: Component, layout: Layout, ...props }) => {
  return (
    <Route {...props}>
      <Layout>
        <Component />
      </Layout>
    </Route>
  );
};
