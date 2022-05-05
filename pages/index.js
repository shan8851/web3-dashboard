import { useMoralis } from "react-moralis";
import Head from "next/head";
import {
  Flex,
  Text,
  Button,
  Box,
  Tab,
  Tabs,
  TabList,
  TabPanels,
  TabPanel,
} from "@chakra-ui/react";
import Header from "../components/Header";
import Profile from "../components/Profile";
import Balance from "../components/Balance";
import Transactions from "../components/Transactions";
import Nft from "../components/Nft";
import Send from "../components/Send";

export default function Home() {
  const { isAuthenticated, authenticate, user, logout, isLoggingOut } =
    useMoralis();
  if (!isAuthenticated) {
    return (
      <>
        <Head>
          <title>Login | Web3 Dashboard</title>
        </Head>
        <Flex
          direction="column"
          justifyContent="center"
          alignItems="center"
          width="100vw"
          height="100vh"
          bg="gray.700"
        >
          <Text fontSize="5xl" fontWeight="bold" color="white">
            Web3 Dashboard
          </Text>
          <Button
            onClick={() =>
              authenticate({
                signingMessage: "Please sign to login to the web3 Dashboard",
                network: "rinkeby",
              })
            }
            colorScheme="teal"
            size="lg"
            mt="6"
          >
            Login with Metamask
          </Button>
        </Flex>
      </>
    );
  }
  return (
    <>
      <Head>
        <title>Web3 Dashboard</title>
      </Head>
      <Flex direction="column" width="100vw" height="100vh">
        <Header user={user} logout={logout} isLoggingOut={isLoggingOut} />
        <Box flex="1" bg="gray.200" px="44" py="20">
          <Tabs size="lg" colorScheme="teal" align="center" variant="enclosed">
            <TabList>
              <Tab fontWeight="bold">Profile</Tab>
              <Tab fontWeight="bold">Balance</Tab>
              <Tab fontWeight="bold">Transactions</Tab>
              <Tab fontWeight="bold">NFTs</Tab>
              <Tab fontWeight="bold">Send ETH</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <Profile user={user} />
              </TabPanel>
              <TabPanel>
                <Balance user={user} />
              </TabPanel>
              <TabPanel>
                <Transactions user={user} />
              </TabPanel>
              <TabPanel>
                <Nft user={user} />
              </TabPanel>
              <TabPanel>
                <Send user={user} />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
      </Flex>
    </>
  );
}
