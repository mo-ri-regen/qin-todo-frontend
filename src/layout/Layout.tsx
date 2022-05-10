import type { ReactNode, VFC } from "react";

import { Footer } from "./Footer";
import { Header } from "./Header";

type Props = {
  children: ReactNode;
};
export const Layout: VFC<Props> = (props) => {
  return (
    <div className="grid px-6 mx-auto min-h-screen grid-rows-[auto, 1fr]">
      <Header />
      <main className="h-[90vh]">{props.children}</main>
      <Footer />
    </div>
  );
};
