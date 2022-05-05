import { Divider, Text } from "@chakra-ui/react";
import { useERC20Balances, useMoralisWeb3Api } from "react-moralis";
import CustomContainer from "./CustomContainer";
import { useEffect, useState } from "react";
import Moralis from "moralis";

export default function Balance({ user }) {
  const [ethBalance, setEthBalance] = useState(0);
  const Web3Api = useMoralisWeb3Api();
  const { fetchERC20Balances, data } = useERC20Balances();
  const fetchNativeBalance = async () => {
    const result = await Web3Api.account
      .getNativeBalance({ chain: "rinkeby", address: user.get("ethAddress") })
      .catch((e) => console.log(e));
    if (result.balance) {
      setEthBalance(Moralis.Units.FromWei(result.balance));
    }
  };

  useEffect(() => {
    fetchNativeBalance();
    fetchERC20Balances({
      params: { chain: "rinkeby", address: user.get("ethAddress") },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <CustomContainer>
      <Text mb="6" fontSize="xl" fontWeight="extrabold">
        My ERC20 Tokens
      </Text>
      {ethBalance && (
        <Text>
          🤑&nbsp; {ethBalance}
          <b> ETH</b>
        </Text>
      )}
      <Divider />
      {data &&
        data.map((token) => (
          <div key={token.symbol}>
            <Text>
              🤑&nbsp; {Moralis.Units.FromWei(token.balance)}
              <b> {token.symbol}</b>
            </Text>
            <Divider />
          </div>
        ))}
    </CustomContainer>
  );
}
