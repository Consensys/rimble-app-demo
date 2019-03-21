import React from "react";
import { Flex, Text } from "rimble-ui";
import ShortHash from "./ShortHash";

class AccountOverview extends React.Component {
  trimEth = eth => {
    eth = parseFloat(eth);
    eth = eth * 10000;
    eth = Math.round(eth);
    eth = eth / 10000;
    eth = eth.toFixed(4);

    return eth;
  };

  render() {
    const roundedBalance = this.trimEth(this.props.accountBalance);
    return (
      <Flex alignItems={"flex-start"} flexDirection={"column"} my={2} mx={4}>
        <Text fontSize={2}>
          Connected to <ShortHash hash={this.props.account} />
        </Text>
        <Text
          fontSize={1}
          color={this.props.accountBalanceLow ? "red" : "#999"}
        >
          Balance: {roundedBalance} ETH
        </Text>
      </Flex>
    );
  }
}

export default AccountOverview;
