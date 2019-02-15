import React from "react";
import { Card } from "rimble-ui";
import RimbleWeb3 from "./RimbleWeb3";
import ConnectButton from "./ConnectButton";
import SmartContractControls from "./SmartContractControls";

class PrimaryCard extends React.Component {
  render() {
    return (
      <RimbleWeb3.Consumer>
        {({
          contract,
          account,
          initContract,
          initAccount,
          contractMethodSendWrapper
        }) => (
          <Card width={"400px"} mx={"auto"} px={4}>
            {!account ? (
              <ConnectButton initAccount={initAccount} account={account} />
            ) : (
              <SmartContractControls
                contract={contract}
                account={account}
                initContract={initContract}
                contractMethodSendWrapper={contractMethodSendWrapper}
              />
            )}
          </Card>
        )}
      </RimbleWeb3.Consumer>
    );
  }
}

export default PrimaryCard;
