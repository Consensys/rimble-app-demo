import React from "react";
import { Card, Heading, Text, Icon, TextButton, Modal, Flex, Box, ToastMessage } from "rimble-ui";
import NetworkOverview from "../../components/NetworkOverview"
import theme from "./../../theme";

class ConnectionPendingModal extends React.Component {
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
            onClick={this.props.closeConnectionPendingModal}
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
                  <Text>It's possible to use your account's address to see all your blockchain activity. Only connect accounts you don't mind being linked to your Bounties Explorer profile.</Text>
                </Box>

                <Text fontWeight={3}>What does connection mean?</Text>
                <ul>
                  <li>Shares your Ethereum account address with us</li>
                  <li>Allows us to start transactions on the blockchain (at your request)</li>
                </ul>
              </Flex>
            </Box>

            <Flex borderRight={1} borderColor={"#999"} mx={3}>
              <Text></Text>
            </Flex>

            <Flex flexDirection={"column"} p={3}>
              <Flex justifyContent={"center"} my={4}>
                <Icon name="Link" color="#666" size="40"/>
              </Flex>
              
              <Heading.h2>Connect your account</Heading.h2>

              <Text mb={4}>A connection request should automatically appear. If not, open it using the MetaMask extension icon in your browser.</Text>
              
              <ToastMessage
                message={'Waiting for connection confirmation...'}
                secondaryMessage={'This won\'t cost your any Ether'}
                icon={'InfoOutline'}
              />

            </Flex>
          </Flex>
        </Card>
      </Modal>
    )
  }
}

export default ConnectionPendingModal;
