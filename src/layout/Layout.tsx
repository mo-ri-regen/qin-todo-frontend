import type { ReactNode, VFC } from "react";

import { Footer } from "./Footer";
import { Header } from "./Header";

type Props = {
  children: ReactNode;
};
export const Layout: VFC<Props> = (props) => {
  return (
    <div className="grid px-3 mx-auto mb-6 h-screen grid-rows-[auto, 1fr]">
      <Header />
      <main className="grid overflow-y-hidden lg:overflow-y-visible grid-rows-3 lg:grid-rows-1 mb-8">
        {props.children}
      </main>
      <Footer />
    </div>
  );
};
