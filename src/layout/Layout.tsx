import type { ReactNode, VFC } from "react";

type Props = {
  children: ReactNode;
};
export const Layout: VFC<Props> = (props) => {
  return (
    <div className="pt-4 pb-20 space-y-8 sm:space-y-14">
      <main className="px-4 mx-auto w-full max-w-screen-sm bg-blue-50">
        {props.children}
      </main>
    </div>
  );
};
