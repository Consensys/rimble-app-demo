import React from "react";
import { Flex, Box, Text, Blockie, QR } from "rimble-ui";
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
      <Flex alignItems={"flex-start"}>

        <Flex mr={3}>
          <Flex border={1} borderColor={'moon-gray'} p={1} mr={1}>
            <Blockie opts={{
              seed: this.props.account,
              size: 8,
              scale: 8,
            }} />
          </Flex>
          <Flex border={1} borderColor={'moon-gray'} p={1}>
            <QR
              value={this.props.account}
              size={'4rem'}
              renderAs={'svg'}
            />
          </Flex>
        </Flex>

        <Box>
          <Text fontWeight={3} color={'success'}>
            wallet connected
          </Text>
          <Text fontSize={1} color={'mid-gray'}>
            Public Address:
            <div>
              {this.props.account}
            </div>
          </Text>
          <Text
            fontSize={1}
            color={this.props.accountBalanceLow ? 'red' : 'mid-gray'}
            >
              Balance: {roundedBalance} ETH
            </Text>
        </Box>

      </Flex>
    );
  }
}

export default AccountOverview;
