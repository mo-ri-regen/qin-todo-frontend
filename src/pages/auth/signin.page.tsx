import type { NextPage } from "next";
import { AuthAction, withAuthUser } from "next-firebase-auth";
import { Sign } from "src/pages/auth/Sign";

import { Loader } from "./Loader";

const Signin: NextPage = () => {
  return <Sign page="signin" />;
};

export default withAuthUser({
  whenAuthed: AuthAction.REDIRECT_TO_APP,
  whenUnauthedBeforeInit: AuthAction.SHOW_LOADER,
  whenUnauthedAfterInit: AuthAction.RENDER,
  LoaderComponent: Loader,
})(Signin);
