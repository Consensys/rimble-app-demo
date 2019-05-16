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
  state = {
    showTxFees: false
  };

  toggleShowTxFees = e => {
    console.log("showTxFees", this.state.showTxFees);
    e.preventDefault();

    this.setState({
      showTxFees: !this.state.showTxFees
    });
  };

  render() {
    return (
      <Modal isOpen={this.props.isOpen}>
        <Card p={[3, 5]} maxWidth={"600px"} style={{ overflow: "scroll" }}>
          <Flex justifyContent={"flex-end"} mr={[-3, -5]} mt={[-3, -5]}>
            <Button.Text
              icononly
              icon={"Close"}
              color={"moon-gray"}
              onClick={this.props.closeModal}
            />
          </Flex>

          {this.state.showTxFees === false ? (
            <Box>
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
                    Choose an account you don’t mind being linked with your
                    activity here.
                  </Text>
                </Box>
                <Box width={[1, 1, 1 / 3]} px={2}>
                  <Flex justifyContent={"center"}>
                    <Icon
                      color="primary"
                      size="60"
                      name="AccountBalanceWallet"
                    />
                  </Flex>
                  <Heading.h4>Have some Ether for fees</Heading.h4>
                  <Text>
                    You’ll need Ether to pay transaction fees. Buy Ether from
                    exchanges like Coinbase.
                  </Text>
                  <Link
                    title="Learn about Ethereum transaction fees"
                    as={"a"}
                    href="#"
                    onClick={this.toggleShowTxFees}
                  >
                    What are transaction fees?
                  </Link>
                </Box>
                <Box width={[1, 1, 1 / 3]} px={2}>
                  <Flex justifyContent={"center"}>
                    <Icon color="primary" size="60" name="People" />
                  </Flex>
                  <Heading.h4>Have the right account ready</Heading.h4>
                  <Text>
                    If you have multiple Ethereum accounts, check that the one
                    you want to use is active in your browser.
                  </Text>
                </Box>
              </Flex>
              <Flex borderTop={1} borderColor={"#999"} />
              <Box mt={3} textAlign="right">
                <MetaMaskButton onClick={this.props.validateAccount}>
                  Connect with MetaMask
                </MetaMaskButton>
              </Box>
            </Box>
          ) : (
            <Box mb={3}>
              <Heading.h2>Transaction fees</Heading.h2>
              <Text my={3}>You need to pay a fee to use the Ethereum blockchain. This pays for someone to process your transaction and store the data.</Text>
              <Heading.h4>What are you paying for?</Heading.h4>
              <Flex
                my={4}
                flexWrap={"wrap"}
                justifyContent={"space-between"}
                mx={-2}
              >
                <Box width={[1, 1, 1 / 3]} px={2}>
                  <Flex justifyContent={"center"}>
                    <Icon color="primary" size="60" name="Fingerprint" />
                  </Flex>
                  <Heading.h4>Undeniable proof</Heading.h4>
                  <Text>
                    You get a public record of any funds you send or receive, a bit like a deed for a house.
                  </Text>
                </Box>
                <Box width={[1, 1, 1 / 3]} px={2}>
                  <Flex justifyContent={"center"}>
                    <Icon
                      color="primary"
                      size="60"
                      name="EnhancedEncryption"
                    />
                  </Flex>
                  <Heading.h4>Unbreakable encryption</Heading.h4>
                  <Text>
                    Your funds can only ever go to your intended recipients.
                  </Text>
                </Box>
                <Box width={[1, 1, 1 / 3]} px={2}>
                  <Flex justifyContent={"center"}>
                    <Icon color="primary" size="60" name="AccountBalance" />
                    <Icon color="primary" size="60" name="NotInterested" />
                  </Flex>
                  <Heading.h4>Unparalleled control</Heading.h4>
                  <Text>
                    You can pay or get paid without using any banks or companies.
                  </Text>
                </Box>
              </Flex>
              <Flex borderTop={1} borderColor={"#999"} />
              <Box mt={3} textAlign="right">
                <Button.Outline onClick={this.toggleShowTxFees}>
                  Go back
                </Button.Outline>
              </Box>
            </Box>
          )}
        </Card>
      </Modal>
    );
  }
}

export default ConnectionModal;
