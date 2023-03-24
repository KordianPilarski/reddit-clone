import { writeBatch, doc, increment } from "firebase/firestore";
import React from "react";
import { useRecoilState } from "recoil";
import {
  Community,
  CommunitySnippet,
  communityState,
} from "../atoms/communitiesAtom";
import { firestore } from "../firebase/clientApp";

const useCommunityData = () => {
  const [communityStateValue, setCommunityStateValue] =
    useRecoilState(communityState);

  const onJoinLeaveCommunity = (community: Community, isJoined?: boolean) => {
    // if (!user) {
    //   setAuthModalState({ open: true, view: "login" });
    //   return;
    // }

    // setLoading(true);
    if (isJoined) {
      leaveCommunity(community.id);
      return;
    }
    joinCommunity(community);
  };

  const joinCommunity = async (community: Community) => {
    console.log("JOINING COMMUNITY: ", community.id);
    try {
      const batch = writeBatch(firestore);

      const newSnippet: CommunitySnippet = {
        communityId: community.id,
        imageURL: community.imageURL || "",
      };
      //   batch.set(
      //     doc(
      //       firestore,
      //       `users/${user?.uid}/communitySnippets`,
      //       community.id // will for sure have this value at this point
      //     ),
      //     newSnippet
      //   );

      batch.update(doc(firestore, "communities", community.id), {
        numberOfMembers: increment(1),
      });

      // perform batch writes
      await batch.commit();

      // Add current community to snippet
      setCommunityStateValue((prev) => ({
        ...prev,
        mySnippets: [...prev.mySnippets, newSnippet],
      }));
    } catch (error) {
      console.log("joinCommunity error", error);
    }
    // setLoading(false);
  };

  const leaveCommunity = async (communityId: string) => {
    try {
      const batch = writeBatch(firestore);

      //   batch.delete(
      //     doc(firestore, `users/${user?.uid}/communitySnippets/${communityId}`)
      //   );

      batch.update(doc(firestore, "communities", communityId), {
        numberOfMembers: increment(-1),
      });

      await batch.commit();

      setCommunityStateValue((prev) => ({
        ...prev,
        mySnippets: prev.mySnippets.filter(
          (item) => item.communityId !== communityId
        ),
      }));
    } catch (error) {
      console.log("leaveCommunity error", error);
    }
    // setLoading(false);
  };

  return {
    communityStateValue,
    onJoinLeaveCommunity,
  };
};
export default useCommunityData;
