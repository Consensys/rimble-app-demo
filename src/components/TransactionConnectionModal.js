import React from "react";
import { Card, Heading, Text, Icon, TextButton, Modal, Flex, Image, Box, MetaMaskButton } from "rimble-ui";
import NetworkOverview from "./NetworkOverview"
import theme from "./../theme";

class ConnectionModal extends React.Component {
  render() {
    return (
      <Modal isOpen={this.props.isOpen}>
        <Card p={5} maxWidth={'960px'}>
          <TextButton
            icononly
            icon={'Close'}
            color={'moon-gray'}
            position={'absolute'}
            top={0}
            right={0}
            mt={3}
            mr={3}
            onClick={this.props.closeTransactionConnectionModal}
          />

          <Flex justifyContent={"center"} alignContent={"stretch"}>
            <Box width={"400px"} flex={"1 1 auto"}>
              <Flex flexDirection={"column"} alignContent={"center"}>
                <Box>
                  <Text color={theme.colors.primary} caps>Current Network</Text>
                  <NetworkOverview network={this.props.currentNetwork} />
                </Box>
                
                <Box my={4}>
                  <Text color={theme.colors.primary} caps>New to Bounties Explorer?</Text>
                  <Text>You need to be connected so you can use the funds stored in your Etherum account.</Text>
                  <Text>Every blockchain action requires a small network fee.</Text>
                </Box>

                <Text fontWeight={3}>What's a network fee?</Text>
                <Text>This fee pays for a person or group to add a record of your action to the blockchain and let the network know. It doesn't go to us.</Text>
              </Flex>
            </Box>

            <Flex borderRight={1} borderColor={"#999"} mx={3}>
              <Text></Text>
            </Flex>

            <Flex flexDirection={"column"} p={3}>
              <Flex justifyContent={"center"} my={4}>
                <Icon name="Link" color="#666" size="40"/>
              </Flex>
              
              <Heading.h2>Connect to continue</Heading.h2>

              <Text mb={4}>This action uses the blockchain, so you'll need to connect your Ethereum account to continue. That's the long code starting with <Text.span fontWeight={3}>0x</Text.span>.</Text>
              
              <MetaMaskButton onClick={this.props.validateAccount}>Connect with MetaMask</MetaMaskButton>

            </Flex>
          </Flex>
        </Card>
      </Modal>
    )
  }
}

export default ConnectionModal;
