import React from 'react';
import { Box, Flex, Text, Icon } from "rimble-ui";

class WrongNetworkBanner extends React.Component {
  render() {
    const bannerStyle = {
      position: 'fixed',
      bottom: 0,
      left: 0,
      right: 0,
      width: '100%',
      backgroundColor: 'white'
    };

    return (
      <Box style={bannerStyle} p={3}>
        <Flex alignItems={"center"}>
          <Box p={4}>
            <Icon name="Warning" color="gold" size="30" />
          </Box>
          <Flex flexDirection={"column"}>
            <Text fontWeight={"bold"}>Looks like you're on the wrong network</Text>
            <Text>You should be on the {this.props.requiredNetwork.name} Ethereum network. You are currently connected to {this.props.currentNetwork.name} - switch in your MetaMask extension.</Text>
          </Flex>
        </Flex>
      </Box>
    )
  }
}

export default WrongNetworkBanner;
