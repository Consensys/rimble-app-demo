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
import GeneralUtil from "../GeneralUtil";
import TransactionFeeModal from "./TransactionFeeModal";

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
        <Card
          border={0}
          p={0}
          maxWidth={"960px"}
          overflow={"hidden"}
        >
          <Box
            position={"absolute"}
            top={'0'}
            right={'0'}
          >
            <Button.Text
              position={"absolute"}
              top={'0'}
              right={'0'}
              icononly
              icon={"Close"}
              mainColor={"moon-gray"}
              onClick={this.props.closeModal}
            />
          </Box>

          {this.state.showTxFees === false ? (
            <Box>
              {/* Modal content */}
              <Box
                style={{ overflow: "auto" }}
                maxHeight={"calc(100vh - 195px)"}
              >
                <Box px={3}>
                  {/* Start primary content */}
                  <Box>
                    <Heading fontSize={4}>Before you connect</Heading>
                    <Text my={3}>
                      Connecting lets you use the Rimble Demo App via your
                      Ethereum account.
                    </Text>
                  </Box>

                  <Flex
                    flexWrap={"wrap"}
                    justifyContent={"space-between"}
                    mt={[0, 4]}
                    mb={[0, 4]}
                  >
                    <Box width={[1, 1, 1/3]} my={3}>
                      <Flex justifyContent={"center"} mb={3}>
                        <Icon name="Public" color="primary" size="4rem" />
                      </Flex>
                      <Heading fontSize={2}>The blockchain is public</Heading>
                      <Text fontSize={1}>
                        Your Ethereum account activity is public on the
                        blockchain. Choose an account you don’t mind being
                        linked with your activity here.
                      </Text>
                    </Box>
                    <Box width={[1, 1, 1 / 3]} px={2} my={3}>
                      <Flex justifyContent={"center"}>
                        <Icon
                          color="primary"
                          size="60"
                          name="AccountBalanceWallet"
                        />
                      </Flex>
                      <Heading.h4>Have some Ether for fees</Heading.h4>
                      <Text>
                        You’ll need Ether to pay transaction fees. Buy Ether
                        from exchanges like Coinbase.
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
                    <Box width={[1, 1, 1 / 3]} px={2} my={3}>
                      <Flex justifyContent={"center"}>
                        <Icon color="primary" size="60" name="People" />
                      </Flex>
                      <Heading.h4>Have the right account ready</Heading.h4>
                      <Text>
                        If you have multiple Ethereum accounts, check that the
                        one you want to use is active in your browser.
                      </Text>
                    </Box>
                  </Flex>
                  {/* End Modal Content */}
                </Box>
              </Box>

              <Box
                borderTop={1}
                borderColor={'moon-gray'}
                bg={"white"}
                p={3}
              >
                <Flex />
                <Flex justifyContent={["center", "flex-end"]}>
                  {GeneralUtil.hasMetaMask() ? (
                    <MetaMaskButton
                      onClick={this.props.validateAccount}
                      width={[1, "auto"]}
                    >
                      Connect with MetaMask
                    </MetaMaskButton>
                  ) : (
                    <Button
                      onClick={this.props.validateAccount}
                      width={[1, "auto"]}
                    >
                      Connect
                    </Button>
                  )}
                </Flex>
              </Box>
            </Box>
          ) : (
            <Box mb={3}>
              <Box
                style={{ overflow: "auto" }}
                maxHeight={"calc(100vh - 195px)"}
              >
                <Box px={[4, 0]} pt={[0, 0]} pb={[4, 5]}>
                  {/* Start modal content */}
                  <TransactionFeeModal />
                  {/* End Modal Content */}
                </Box>
              </Box>

              <Box
                position={"absolute"}
                bottom={"0"}
                left={"0"}
                right={"0"}
                px={[4, 5]}
                pt={0}
                pb={4}
                bg={"white"}
              >
                <Flex borderTop={1} borderColor={"#999"} />
                <Flex mt={4} justifyContent={["center", "flex-end"]}>
                  <Button.Outline
                    width={[1, "auto"]}
                    onClick={this.toggleShowTxFees}
                  >
                    Go back
                  </Button.Outline>
                </Flex>
              </Box>
            </Box>
          )}
        </Card>
      </Modal>
    );
  }
}

export default ConnectionModal;
