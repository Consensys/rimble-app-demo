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
  PublicAddress,
  QR,
  Link
} from "rimble-ui";
import TransactionFeeModal from "./TransactionFeeModal";

class LowFundsModal extends React.Component {
  state = {
    showSecondary: false,
    showTxFees: false
  };

  toggleQRVisible = () => {
    this.setState({
      showSecondary: !this.state.showSecondary
    });
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
          px={[0, 5]}
          pt={[4, 5]}
          pb={["68px", "68px"]}
          maxWidth={"960px"}
          overflow={"hidden"}
          position={"relative"}
        >
          <Box position={"relative"}>
            <Flex
              justifyContent={"flex-end"}
              mr={[0, -5]}
              mt={[-4, -5]}
              position={"absolute"}
              top={"0"}
              left={"0"}
              right={"0"}
              bg={"white"}
              zIndex={"1"}
            >
              <Button.Text
                icononly
                icon={"Close"}
                color={"moon-gray"}
                onClick={this.props.closeModal}
              />
            </Flex>
          </Box>

          {this.state.showSecondary === false &&
          this.state.showTxFees === false ? (
            <Box>
              <Box
                style={{ overflow: "auto" }}
                maxHeight={"calc(100vh - 148px)"}
              >
                {/* Start primary content */}
                <Box p={[3, 0]} mb={[5, 0]} pb={[0, 3]}>
                <Flex>
                  <Box>
                    <Icon name="Warning" size="60" color="yellow" />
                  </Box>
                  <Box>
                    <Heading.h2>
                      You don't have enough Ether for transaction fees
                    </Heading.h2>
                  </Box>
                </Flex>
                  <Text mb={4}>
                    This is a blockchain action so you’ll have to pay a
                    transaction fee. A few dollars worth of Ether should be
                    enough but fees do change based on how busy the network is.{" "}
                    <strong>Fund your account and try again.</strong>{" "}
                    <Link
                      title="Learn about Ethereum transaction fees"
                      as={"a"}
                      href="#"
                      onClick={this.toggleShowTxFees}
                    >
                      What are transaction fees?
                    </Link>
                  </Text>

                  <Heading.h3>How to add funds</Heading.h3>

                  <Flex
                    mt={3}
                    mb={4}
                    alignItems={"stretch"}
                    mx={[0, -2]}
                    flexWrap={["wrap", "no-wrap"]}
                  >
                    <Box p={2} width={[1, 1 / 2]}>
                      <Card height={"100%"}>
                        <Flex
                          flexDirection={"column"}
                          justifyContent={"space-between"}
                          height={"100%"}
                        >
                          <Box>


                            <Heading.h5>Buy ETH from an exchange</Heading.h5>
                            <Text fontSize="1">
                              You can buy ETH from exchanges like Coinbase and
                              send it to your account. If you don’t already have
                              a Coinbase account, it can take a while to get set
                              up.
                            </Text>
                          </Box>

                          <Button.Outline my={3}>
                            <Flex alignItems={"center"}>
                              <Icon name="OpenInNew" mr={2} />
                              Go to CoinBase
                            </Flex>
                          </Button.Outline>
                        </Flex>
                      </Card>
                    </Box>
                    <Box p={2} width={[1, 1 / 2]}>
                      <Card height={"100%"}>
                        <Flex
                          flexDirection={"column"}
                          justifyContent={"space-between"}
                          height={"100%"}
                        >
                          <Box>


                            <Heading.h5>
                              Send ETH from another account
                            </Heading.h5>
                            <Text fontSize="1">
                              If you have ETH in another Ethereum account, you
                              can send it to this account using your public
                              Ethereum address or QR code.
                            </Text>
                          </Box>
                          <Button.Outline my={3} onClick={this.toggleQRVisible}>
                            <Flex alignItems={"center"}>
                              <Icon name="FilterCenterFocus" mr={2} />
                              Show account QR code
                            </Flex>
                          </Button.Outline>
                        </Flex>
                      </Card>
                    </Box>
                  </Flex>
                </Box>
                {/* End primary content */}
              </Box>
              <Box
                position={"absolute"}
                bottom={"0"}
                left={"0"}
                right={"0"}
                px={[3, 5]}
                bg={"white"}
              >
                {/* Start primary footer */}
                <Flex
                  mt={3}
                  py={3}
                  justifyContent={["center", "flex-end"]}
                  borderTop={1}
                  borderColor={"#999"}
                >
                  <Button onClick={this.props.closeModal}>
                    Back to Rimble App Demo
                  </Button>
                </Flex>
                {/* End primary footer */}
              </Box>
            </Box>
          ) : null}

          {this.state.showSecondary ? (
            <Box mb={3}>
              {/* Start secondary content */}
              <Box
                style={{ overflow: "auto" }}
                maxHeight={"calc(100vh - 148px)"}
                px={[3, 0]}
                pb={[4, 0]}
              >
                <Box>
                  <Flex my={3} justifyContent={"center"}>
                    <QR
                      size="130"
                      value={
                        this.props.account ? this.props.account : "1234512345"
                      }
                    />
                  </Flex>

                  <PublicAddress my={3} address={this.props.account} />
                </Box>
              </Box>
              {/* End secondary content */}

              <Box
                position={"absolute"}
                bottom={"0"}
                left={"0"}
                right={"0"}
                px={[3, 5]}
                bg={"white"}
              >
                {/* Start secondary footer */}
                <Flex
                  mt={3}
                  py={3}
                  justifyContent={["center", "flex-end"]}
                  borderTop={1}
                  borderColor={"#999"}
                >
                  <Button.Outline
                    width={[1, "auto"]}
                    onClick={this.toggleQRVisible}
                  >
                    Go back
                  </Button.Outline>
                </Flex>
                {/* End secondary footer */}
              </Box>
            </Box>
          ) : null}

          {this.state.showTxFees ? (
            <Box>
              <Box
                style={{ overflow: "auto" }}
                maxHeight={"calc(100vh - 148px)"}
              >
                <Box p={[3, 0]} mb={[5, 0]} pb={[3, 5]}>
                  {/* Start tx fee content */}
                  <TransactionFeeModal />
                  {/* End tx fee content */}
                </Box>
              </Box>
              <Box
                position={"absolute"}
                bottom={"0"}
                left={"0"}
                right={"0"}
                px={[3, 5]}
                bg={"white"}
              >
                {/* Start primary footer */}
                <Flex
                  mt={3}
                  py={3}
                  justifyContent={["center", "flex-end"]}
                  borderTop={1}
                  borderColor={"#999"}
                >
                  <Button.Outline onClick={this.toggleShowTxFees}>
                    Go Back
                  </Button.Outline>
                </Flex>
                {/* End primary footer */}
              </Box>
            </Box>
          ) : null}
        </Card>
      </Modal>
    );
  }
}

export default LowFundsModal;
