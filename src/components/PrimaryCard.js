import React from "react";
import { Card } from "rimble-ui";

import RimbleWeb3 from "../utilities/RimbleWeb3";
import TransactionToastUtil from "../utilities/TransactionToastUtil";

import ConnectButton from "./ConnectButton";
import SmartContractControls from "./SmartContractControls";
import TransactionsCard from "./TransactionsCard";

class PrimaryCard extends React.Component {
  render() {
    return (
      <RimbleWeb3.Consumer>
        {({
          contract,
          account,
          transactions,
          initContract,
          initAccount,
          contractMethodSendWrapper
        }) => (
          <div>
            <Card width={"400px"} mx={"auto"} px={4}>
              {!account ? (
                <ConnectButton initAccount={initAccount} account={account} />
              ) : (
                <SmartContractControls
                  contract={contract}
                  account={account}
                  transactions={transactions}
                  initContract={initContract}
                  contractMethodSendWrapper={contractMethodSendWrapper}
                />
              )}
            </Card>

            <TransactionsCard transactions={transactions} />
            <TransactionToastUtil transactions={transactions} />
          </div>
        )}
      </RimbleWeb3.Consumer>
    );
  }
}

export default PrimaryCard;
