import { Box, Center, Image, Text } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { useNFTBalances } from "react-moralis";
import CustomContainer from "./CustomContainer";

export default function Nft({ user }) {
  const { getNFTBalances, data } = useNFTBalances();

  useEffect(() => {
    getNFTBalances({
      params: {
        chain: "rinkeby",
        address: user.get("ethAddress"),
      },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <CustomContainer>
      <Text mb="6" fontSize="xl" fontWeight="extrabold">
        My NFTS
      </Text>
      {data &&
        data.result.map((nft) => (
          <Box
            mt="4"
            px="2"
            py="2"
            borderWidth="1px"
            borderRadius="md"
            key={nft.token_hash}
          >
            <Center>
              {" "}
              {nft.image && (
                <Image mb="6" src={nft.image} height={250} width={250} />
              )}
            </Center>
            <Center>
              {" "}
              <p>{nft.name}</p>
            </Center>
          </Box>
        ))}
    </CustomContainer>
  );
}
