import React from "react";
import { Card } from "rimble-ui";

import RimbleWeb3 from "../utilities/RimbleWeb3";
import TransactionToastUtil from "../utilities/TransactionToastUtil";

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
            <Card maxWidth={'640px'} px={4} mx={'auto'}>
              <SmartContractControls
                contract={contract}
                account={account}
                transactions={transactions}
                initContract={initContract}
                contractMethodSendWrapper={contractMethodSendWrapper}
              />
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
