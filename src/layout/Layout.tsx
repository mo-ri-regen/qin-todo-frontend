import type { ReactNode, VFC } from "react";

import { Footer } from "./Footer";
import { Header } from "./Header";

type Props = {
  children: ReactNode;
};
export const Layout: VFC<Props> = (props) => {
  return (
    <div className="grid px-3 mx-auto mb-6 h-screen min-h-screen grid-rows-[auto, 1fr, auto]">
      <Header />
      <main>{props.children}</main>
      <Footer />
    </div>
  );
};
