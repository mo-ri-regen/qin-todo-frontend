import type { NextPage } from "next";
// import { AuthAction, withAuthUser } from "next-firebase-auth";
// import { PageLoader } from "src/components/PageLoader";
import { Sign } from "src/pages/auth/Sign";

const Signup: NextPage = () => {
  return <Sign page="signup" />;
};

// export default withAuthUser({
//   whenAuthed: AuthAction.REDIRECT_TO_APP,
//   whenUnauthedBeforeInit: AuthAction.SHOW_LOADER,
//   whenUnauthedAfterInit: AuthAction.RENDER,
//   LoaderComponent: PageLoader,
// })(Signup);

export default Signup;
