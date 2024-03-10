import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";

import { useQueryErrorResetBoundary } from "@tanstack/react-query";
import { ErrorBoundary } from "react-error-boundary";

import routerLinks, { IRouterLinks } from "./common/routerLinks";
import Layout from "./common/layout";
import LoadingFallback from "./components/atoms/LoadingFallback";
import ErrorFallback from "./components/atoms/ErrorFallback";

const lazyImport = (pageName: string) =>
  lazy(() => {
    return import(`./pages/${pageName}.tsx`);
  });

const assignRouter = Object.keys(routerLinks).map((componentKey: string) => {
  const props: IRouterLinks = routerLinks[componentKey];

  return {
    Component: lazyImport(componentKey),
    props,
  };
});

const Router = () => {
  const { reset } = useQueryErrorResetBoundary();

  return (
    <Routes>
      <Route element={<Layout />}>
        {assignRouter.map(({ Component, props }) => (
          <Route
            key={props.path}
            path={props.path}
            element={
              <Suspense fallback={<LoadingFallback />}>
                <ErrorBoundary
                  onReset={reset}
                  fallbackRender={({ resetErrorBoundary }) => (
                    <ErrorFallback resetErrorBoundary={resetErrorBoundary} />
                  )}
                >
                  <Component />
                </ErrorBoundary>
              </Suspense>
            }
          />
        ))}
      </Route>
    </Routes>
  );
};

export default Router;
