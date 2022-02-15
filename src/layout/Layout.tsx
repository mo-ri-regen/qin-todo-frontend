import type { ReactNode, VFC } from "react";

import { Header } from "./Header";

type Props = {
  children: ReactNode;
};
export const Layout: VFC<Props> = (props) => {
  return (
    <div className="flex flex-col mx-6 min-h-screen">
      <Header />
      <main className="flex-1">{props.children}</main>
    </div>
  );
};
