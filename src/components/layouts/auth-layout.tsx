import { useEffect } from "react";

export const AuthLayout = ({ children, title }) => {
  useEffect(() => {
    document.title = title;
  }, [title]);
  return (
    <div>
      <main>{children}</main>
    </div>
  );
};
