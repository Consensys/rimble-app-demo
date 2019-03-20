import React from "react";
import { Flex, Text } from "rimble-ui";
import ShortHash from "./ShortHash";

class AccountOverview extends React.Component {
  trimEth = (eth) => {
    eth = parseFloat(eth);
    eth = eth * 10000;
    eth = Math.round(eth);
    eth = eth / 10000;
    eth = eth.toFixed(4);
    
    return eth;
  }

  render() {
    const roundedBalance = this.trimEth(this.props.accountBalance)
    return (
      <Flex alignItems={"center"} flexDirection={"column"} m={2}>
        <ShortHash hash={this.props.account} />
        <Text color={this.props.accountBalanceLow ? "red" : "#999"}>{roundedBalance} ETH</Text>
      </Flex>
    )
  }
}

export default AccountOverview;
