import { Flex } from "@chakra-ui/react";
import React from "react";
import { useRecoilValue } from "recoil";
import { authModalState } from "../../../atoms/authModalAtom";
import Login from "./Login";
import SignUp from "./SignUp";

type AuthInputsProps = {
  //   toggleView: (view: ModalView) => void;
};

const AuthInputs: React.FC<AuthInputsProps> = () => {
  const modalState = useRecoilValue(authModalState);

  return (
    <Flex direction="column" alignItems="center" width="100%" mt={4}>
      {modalState.view === "login" ? <Login /> : <SignUp />}
    </Flex>
  );
};
export default AuthInputs;