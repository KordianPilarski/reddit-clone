import React from "react";
import { Box, Button, Flex, Icon, Text, Image } from "@chakra-ui/react";
import { FaReddit } from "react-icons/fa";
import { Community } from "../../atoms/communitiesAtom";
import { useSetRecoilState } from "recoil";
import useCommunityData from "../../hooks/useCommunityData";

type HeaderProps = {
  communityData: Community;
};

const Header = ({ communityData }: HeaderProps) => {
  const { communityStateValue, onJoinLeaveCommunity } = useCommunityData();
  const isJoined = !!communityStateValue.mySnippets.find(
    (snippet) => snippet.communityId === communityData.id
  );

  /**
   * !!!Don't pass communityData boolean until the end
   * It's a small optimization!!!
   */
  //   const { communityStateValue, loading, error, onJoinLeaveCommunity } =
  //     useCommunityData(!!communityData);
  //   const isJoined = !!communityStateValue.mySnippets.find(
  //     (item) => item.communityId === communityData.id
  //   );

  return (
    <Flex direction="column" width="100%" height="146px">
      <Box height="50%" bg="blue.400" />
      <Flex justifyContent="center" bg="white" height="50%">
        <Flex width="95%" maxWidth="860px">
          {/* IMAGE URL IS ADDED AT THE VERY END BEFORE DUMMY DATA - USE ICON AT FIRST */}
          {communityData.imageURL ? (
            <Image
              borderRadius="full"
              boxSize="66px"
              src="https://avatars.githubusercontent.com/u/65373763?s=40&v=4"
              alt="Dan Abramov"
              position="relative"
              top={-3}
              color="blue.500"
              border="4px solid white"
            />
          ) : (
            <Icon
              as={FaReddit}
              fontSize={64}
              position="relative"
              top={-3}
              color="blue.500"
              border="4px solid white"
              borderRadius="50%"
            />
          )}
          <Flex padding="10px 16px">
            <Flex direction="column" mr={6}>
              <Text fontWeight={800} fontSize="16pt">
                {communityData.id}
              </Text>
              <Text fontWeight={600} fontSize="10pt" color="gray.400">
                r/{communityData.id}
              </Text>
            </Flex>
            <Flex>
              <Button
                variant={"isJoinedVarFromAbove" ? "outline" : "solid"}
                height="30px"
                pr={6}
                pl={6}
                onClick={() => {
                  onJoinLeaveCommunity(communityData, isJoined);
                }}
              >
                {"isJoinedVarFromAbove" ? "Joined" : "Join"}
              </Button>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};
export default Header;
