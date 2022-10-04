import { ReactNode } from "react";
import Navbar from "./Navbar";

const PageLayout = ({ children }: { children: ReactNode }): JSX.Element => (
  <div className="flex-col mx-auto w-full h-full min-h-screen min-w-screen">
    <Navbar />
    {children}
  </div>
);

export default PageLayout;
