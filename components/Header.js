import { Flex, Text, Button, Center } from "@chakra-ui/react";

export default function Header({ user, logout, isLoggingOut }) {
  return (
    <header>
      <Flex
        justifyContent="space-between"
        bg="gray.700"
        color="white"
        px="10"
        py="6"
      >
        <Center>
          <Text fontSize="xl" fontWeight="black">
            Web3 Dashboard
          </Text>
        </Center>
        <Center>
          <Text>{user.getUsername()}</Text>
          <Button
            ml="4"
            colorScheme="teal"
            onClick={logout}
            disabled={isLoggingOut}
          >
            Logout
          </Button>
        </Center>
      </Flex>
    </header>
  );
}
