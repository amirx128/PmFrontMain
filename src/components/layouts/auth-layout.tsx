

import { FunctionComponent, PropsWithChildren } from "react";


export const AuthLayout: FunctionComponent<PropsWithChildren> = ({
  children,
}) => (
  <div>
    <main>{children}</main>
  </div>
);
