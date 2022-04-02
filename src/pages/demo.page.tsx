import { ref, uploadBytesResumable } from "@firebase/storage";
import {
  useAuthUser,
  withAuthUser,
  withAuthUserTokenSSR,
} from "next-firebase-auth";
import { useState } from "react";
import { storage } from "src/libs/auth/initAuth";

const Demo = () => {
  const AuthUser = useAuthUser();
  const [progress, setProgress] = useState(0);
  const handleForm = (e: any) => {
    e.preventDefault();
    const file = e.target[0].files[0];
    uploadFiles(file);
  };

  const uploadFiles = (file: any) => {
    //
    if (!file) return;
    const sotrageRef = ref(storage, `thumbnails/${AuthUser.id}`);
    const uploadTask = uploadBytesResumable(sotrageRef, file);

    uploadTask.on("state_changed", (snapshot) => {
      const prog = Math.round(
        (snapshot.bytesTransferred / snapshot.totalBytes) * 100
      );
      setProgress(prog);
    });
  };
  return (
    <div className="flex flex-col mx-10 mt-10 min-h-screen">
      <div className="mb-10">
        <p>Your email is {AuthUser.email ? AuthUser.email : "unknown"}.</p>
      </div>
      <div>
        <form onSubmit={handleForm}>
          <input type="file" className="input" />
          <button type="submit">Upload</button>
        </form>
        <hr />
        <h2>Uploading done {progress}%</h2>
      </div>
    </div>
  );
};

// Note that this is a higher-order function.
export const getServerSideProps = withAuthUserTokenSSR()();

export default withAuthUser()(Demo);
