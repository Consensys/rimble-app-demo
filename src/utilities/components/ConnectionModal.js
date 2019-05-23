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
          m={0}
          maxWidth={"960px"}
          height={['100vh', 'auto']}
          overflow={"hidden"}
        >
          <Box
            position={"absolute"}
            top={'0'}
            right={'0'}
            m={2}
            borderRadius={'100%'}
            bg={'white'}
          >
            <Button.Text
              icononly
              icon={"Close"}
              mainColor={"moon-gray"}
              onClick={this.props.closeModal}
              size={'2.5rem'}
            />
          </Box>

          {this.state.showTxFees === false ? (
            <Flex flexDirection={'column'} height={'100%'}>
              {/* Modal content */}
              <Flex flex={'1'} style={{ overflow: "auto" }} >
                <Box p={['4', '5']} m={'auto'}>
                  {/* Start primary content */}
                  <Box mt={4} mb={5}>
                    <Heading fontSize={[4, 5]}>Before you connect</Heading>
                    <Text fontSize={[2, 3]} my={3}>
                      Connecting lets you use the Rimble Demo App via your
                      Ethereum account.
                    </Text>
                  </Box>

                  <Flex
                    flexDirection={['column', 'row']}
                    justifyContent={"space-between"}
                    my={[0, 4]}
                  >
                    <Box flex={'1 1'} width={1} mt={[3, 0]} mb={[4, 0]} mr={4}>
                      <Flex justifyContent={"center"} mb={3}>
                        <Icon
                          name="Public"
                          color="primary"
                          size="4rem"
                        />
                      </Flex>
                      <Heading fontSize={2}>The blockchain is public</Heading>
                      <Text fontSize={1}>
                        Your Ethereum account activity is public on the
                        blockchain. Choose an account you don’t mind being
                        linked with your activity here.
                      </Text>
                    </Box>
                    <Box flex={'1 1'} width={1} mt={[3, 0]} mb={[4, 0]} mr={4}>
                      <Flex justifyContent={"center"} mb={3}>
                        <Icon
                          name="AccountBalanceWallet"
                          color="primary"
                          size="4rem"
                        />
                      </Flex>
                      <Heading fontSize={2}>Have some Ether for fees</Heading>
                      <Text fontSize={1} mb={3}>
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
                    <Box flex={'1 1'} width={1} mt={[3, 0]} mb={[4, 0]}>
                      <Flex justifyContent={"center"} mb={3}>
                        <Icon
                          name="People"
                          color="primary"
                          size="4rem"
                        />
                      </Flex>
                      <Heading fontSize={2}>Have the right account ready</Heading>
                      <Text fontSize={1}>
                        If you have multiple Ethereum accounts, check that the
                        one you want to use is active in your browser.
                      </Text>
                    </Box>
                  </Flex>
                  {/* End Modal Content */}
                </Box>
              </Flex>

              <Box
                flex={'0'}
                borderTop={1}
                borderColor={'light-gray'}
                bg={"white"}
                p={3}
              >
                <Flex justifyContent={'center'}>
                  {GeneralUtil.hasMetaMask() ? (
                    <MetaMaskButton
                      onClick={this.props.validateAccount}
                      width={[1, 1/2]}
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
            </Flex>
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
