import type { ReactNode, VFC } from "react";

import { Footer } from "./Footer";
import { Header } from "./Header";

type Props = {
  children: ReactNode;
};
export const Layout: VFC<Props> = (props) => {
  return (
    <div className="flex flex-col mx-6 min-h-screen">
      <Header />
      <main className="flex-1 bg-blue-50">{props.children}</main>
      <Footer />
    </div>
  );
};
