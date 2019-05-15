import React from "react";
import {
  Card,
  Heading,
  Text,
  Icon,
  Modal,
  Flex,
  Image,
  Box,
  Button,
  MetaMaskButton,
  Link,
} from "rimble-ui";
import NetworkOverview from "./NetworkOverview";
import theme from "../../theme";

class ConnectionModal extends React.Component {
  render() {
    return (
      <Modal isOpen={this.props.isOpen}>
        <Card p={5} maxWidth={"960px"}>
          <Button.Text
            icononly
            icon={"Close"}
            color={"moon-gray"}
            position={"absolute"}
            top={0}
            right={0}
            mt={3}
            mr={3}
            onClick={this.props.closeModal}
          />


          <Box mb={3}>
            <Heading.h2>
              Before you connect
            </Heading.h2>
            <Text my={3}>
              Connecting lets you use the Rimble Demo App via your Ethereum account.
            </Text>
          </Box>
          <Flex my={4}>
            <Box flex={"1 1 auto"} width={1/3} mx={2}>
              <Icon color="primary" size="60" name="Public" />
              <Heading.h4>
                The blockchain is public
              </Heading.h4>
              <Text>
                Your Ethereum account activity is public on the blockchain. Choose an account you don’t mind being linked with your activity here.
              </Text>
            </Box>
            <Box flex={"1 1 auto"} width={1/3} mx={2}>
              <Icon Align="Center" color="primary" size="60" name="AccountBalanceWallet" />
              <Heading.h4>
                Have some Ether for fees
              </Heading.h4>
              <Text>
                You’ll need Ether to pay transaction fees. Buy Ether from exchanges like Coinbase.
              </Text>
              <Link>
                What are transaction fees?
              </Link>
            </Box>
            <Box flex={"1 1 auto"} width={1/3} mx={2}>
              <Icon Align="Center" color="primary" size="60" name="People" />
              <Heading.h4>
                Have the right account ready
              </Heading.h4>
              <Text>
                If you have multiple Ethereum accounts, check that the one you want to use is active in your browser.
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
