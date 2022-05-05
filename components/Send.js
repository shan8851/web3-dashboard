import {
  Button,
  FormControl,
  FormLabel,
  Input,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Text,
  useToast,
} from "@chakra-ui/react";
import CustomContainer from "./CustomContainer";
import { useState } from "react";
import { useWeb3Transfer } from "react-moralis";
import Moralis from "moralis";

export default function Send({ user }) {
  const [amount, setAmount] = useState(0);
  const [receiver, setReceiver] = useState("");
  const handleChange = (value) => setAmount(value);

  const toast = useToast();

  const { fetch, isFetching } = useWeb3Transfer({
    amount: Moralis.Units.ETH(amount),
    receiver: receiver,
    type: "native",
  });

  return (
    <CustomContainer>
      <Text mb="6" fontSize="xl" fontWeight="extrabold">
        Send ETH
      </Text>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          await Moralis.enableWeb3();
          fetch({
            onSuccess: () => {
              toast({
                title: "ETH successfully sent",
                description: "ETH will soon be in the receivers wallet",
                status: "success",
                duration: 9000,
                isClosable: true,
              });
              setReceiver("");
            },
            onError: (error) => {
              toast({
                title: "Error",
                description: error,
                status: "error",
                duration: 9000,
                isClosable: true,
              });
            },
          });
        }}
      >
        <FormControl mt="4">
          <FormLabel htmlFor="amount">Amount of ETH</FormLabel>
          <NumberInput step={0.1} onChange={handleChange}>
            <NumberInputField id="amount" value={amount} />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
          <FormLabel mt="4" htmlFor="receiver">
            Send to
          </FormLabel>
          <Input
            id="receiver"
            type="text"
            placeholder="Recipients Address"
            value={receiver}
            onChange={(e) => setReceiver(e.target.value)}
          />
        </FormControl>
        <Button disabled={isFetching} mt="4" type="submit" colorScheme="teal">
          💸&nbsp; Send{" "}
        </Button>
      </form>
    </CustomContainer>
  );
}
