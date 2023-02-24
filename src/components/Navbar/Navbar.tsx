import { Flex, Image } from "@chakra-ui/react";
import React from "react";
import RightContent from "./RightContent/RightContent";
import SearchInput from "./SearchInput";

const Navbar: React.FC = () => {
  return (
    <Flex height="44px" bg="white" padding="6px 12px">
      <Flex align="center">
        <Image src="/images/redditFace.svg" alt="reddit face" height="30px" />
        <Image
          src="/images/redditText.svg"
          alt="reddit text"
          height="46px"
          display={{ base: "none", md: "unset" }}
        />
        <SearchInput />
        <RightContent />
      </Flex>
    </Flex>
  );
};
export default Navbar;
