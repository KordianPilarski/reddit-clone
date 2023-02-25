<Button>
  <Image />
</Button>;
import { Flex, Button, Image } from "@chakra-ui/react";
import React from "react";

type OAuthButtonsProps = {};

const OAuthButtons: React.FC<OAuthButtonsProps> = () => {
  return (
    <Flex>
      <Button variant="oauth" mb={2}>
        <Image src="/images/googlelogo.png" height="20px" mr="4" /> Continue
        with Google
      </Button>
    </Flex>
  );
};
export default OAuthButtons;
