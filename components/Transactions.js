import CustomContainer from "./CustomContainer";
import { useMoralisWeb3Api } from "react-moralis";
import { useState, useEffect } from "react";
import { Divider, Link, Text } from "@chakra-ui/react";

export default function Transactions({ user }) {
  const [transactions, setTransactions] = useState();
  const Web3Api = useMoralisWeb3Api([]);
  const BASE_URL = "https://rinkeby.etherscan.io/tx/";

  const fetchTransactions = async () => {
    const data = await Web3Api.account.getTransactions({
      chain: "rinkeby",
      address: user.get("ethAddress"),
      limit: 10,
    });
    if (data) {
      setTransactions(data.result);
    }
  };

  useEffect(() => {
    fetchTransactions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <CustomContainer>
      <Text mb="6" fontSize="xl" fontWeight="extrabold">
        My Last 10 Transactions
      </Text>
      {transactions &&
        transactions.map((transaction) => (
          <div key={transaction.hash}>
            <Link href={`${BASE_URL}${transaction.hash}`} isExternal>
              ➡️&nbsp; {transaction.hash}
            </Link>
            <Divider />
          </div>
        ))}
    </CustomContainer>
  );
}
