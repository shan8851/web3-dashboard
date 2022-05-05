import { Button, FormControl, FormLabel, Input, Text } from "@chakra-ui/react";
import { useState } from "react";
import { useMoralis } from "react-moralis";
import CustomContainer from "./CustomContainer";

export default function Profile({ user }) {
  const [input, setInput] = useState("");
  const { setUserData, isUserUpdating } = useMoralis();
  return (
    <CustomContainer>
      <Text>
        <b>🤓&nbsp; Username:</b> {user.getUsername()}
      </Text>
      <Text>
        <b>💰&nbsp; Wallet Address:</b> {user.get("ethAddress")}
      </Text>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (input.trim() !== "") {
            setUserData({ username: input }).then(() => setInput(""));
          }
        }}
      >
        <FormControl mt="6">
          <FormLabel htmlFor="username">Set a new username</FormLabel>
          <Input
            id="username"
            type="text"
            placeholder="eg. Satoshi"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            mb="6"
          />
          <Button disabled={isUserUpdating} type="submit" colorScheme="teal">
            ✅&nbsp; Change username
          </Button>
        </FormControl>
      </form>
    </CustomContainer>
  );
}
