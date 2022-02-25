import React, { FC, ElementType } from 'react';
import { Route, RouteProps, Redirect } from 'react-router-dom';

interface Props extends Omit<RouteProps, 'component'> {
  component: ElementType;
  layout: ElementType;
}

export const AuthRoute: FC<Props> = ({ component: Component, layout: Layout, ...props }) => {
  const isAuth = true;
  return (
    <Route
      {...props}
      render={({ location }) =>
        isAuth ? (
          <Redirect
            to={{
              pathname: '/',
              state: { from: location },
            }}
          />
        ) : (
          <Layout>
            <Component />
          </Layout>
        )
      }
    />
  );
};
