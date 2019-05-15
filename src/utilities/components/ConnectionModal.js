import React from "react";
import {
  Card,
  Heading,
  Text,
  Icon,
  Modal,
  Flex,
  Box,
  Button,
  MetaMaskButton,
  Link
} from "rimble-ui";

class ConnectionModal extends React.Component {
  render() {
    return (
      // <Modal isOpen={this.props.isOpen}>
      <Modal isOpen={true}>
        <Card p={[3, 5]} maxWidth={"600px"} style={{ overflow: "scroll" }}>
          <Flex justifyContent={"flex-end"} mr={[-3, -5]} mt={[-3, -5]}>
            <Button.Text
              icononly
              icon={"Close"}
              color={"moon-gray"}
              onClick={this.props.closeModal}
            />
          </Flex>

          <Box mb={3}>
            <Heading.h2>Before you connect</Heading.h2>
            <Text my={3}>
              Connecting lets you use the Rimble Demo App via your Ethereum
              account.
            </Text>
          </Box>

          <Flex
            my={4}
            flexWrap={"wrap"}
            justifyContent={"space-between"}
            mx={-2}
          >
            <Box width={[1, 1, 1 / 3]} px={2}>
              <Flex justifyContent={"center"}>
                <Icon color="primary" size="60" name="Public" />
              </Flex>
              <Heading.h4>The blockchain is public</Heading.h4>
              <Text>
                Your Ethereum account activity is public on the blockchain.
                Choose an account you don’t mind being linked with your activity
                here.
              </Text>
            </Box>
            <Box width={[1, 1, 1 / 3]} px={2}>
              <Flex justifyContent={"center"}>
                <Icon color="primary" size="60" name="AccountBalanceWallet" />
              </Flex>
              <Heading.h4>Have some Ether for fees</Heading.h4>
              <Text>
                You’ll need Ether to pay transaction fees. Buy Ether from
                exchanges like Coinbase.
              </Text>
              <Link>What are transaction fees?</Link>
            </Box>
            <Box width={[1, 1, 1 / 3]} px={2}>
              <Flex justifyContent={"center"}>
                <Icon color="primary" size="60" name="People" />
              </Flex>
              <Heading.h4>Have the right account ready</Heading.h4>
              <Text>
                If you have multiple Ethereum accounts, check that the one you
                want to use is active in your browser.
              </Text>
            </Box>
          </Flex>
          <Flex borderTop={1} borderColor={"#999"} />
          <Box mt={3} textAlign="right">
            <MetaMaskButton onClick={this.props.validateAccount}>
              Connect with MetaMask
            </MetaMaskButton>
          </Box>
        </Card>
      </Modal>
    );
  }
}

export default ConnectionModal;
