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

class LowFundsModal extends React.Component {
  state = {
    showSecondary: false
  };

  toggleSecondary = () => {
    this.setState({
      showSecondary: !this.state.showSecondary
    });
  };

  render() {
    return (
      // <Modal isOpen={this.props.isOpen}>
      <Modal isOpen={true}>
        <Card
          px={[0, 5]}
          pt={[4, 5]}
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

          {this.state.showSecondary === false ? (
            <Box>
              <Box
                style={{ overflow: "auto" }}
                maxHeight={"calc(100vh - 148px)"}
              >
                {/* Start primary content */}
                <Box p={[3, 0]} mb={[5, 0]} pb={[3, 5]}>
                  <Heading.h2>
                    You don't have enough Ether for transaction fees
                  </Heading.h2>

                  <Text mb={4}>
                    This is a blockchain action so you’ll have to pay a
                    transaction fee. A few dollars worth of Ether should be
                    enough but fees do change based on how busy the network is.{" "}
                    <strong>Fund your account and try again.</strong>
                    <Link>What are transaction fees?</Link>
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
                            <Flex justifyContent={"center"}>
                              <Icon
                                name="SwapHoriz"
                                color="primary"
                                size="60"
                              />
                            </Flex>

                            <Heading.h4>Buy ETH from an exchange</Heading.h4>
                            <Text>
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
                            <Flex justifyContent={"center"}>
                              <Icon name="Send" color="primary" size="60" />
                            </Flex>

                            <Heading.h4>
                              Send ETH from another account
                            </Heading.h4>
                            <Text>
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
          ) : (
            <Box mb={3}>
              {/* Start secondary content */}
              <Box
                style={{ overflow: "auto" }}
                maxHeight={"calc(100vh - 148px)"}
              >
                <Box>
                  <Flex my={3} justifyContent={"center"}>
                    <QR
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
                  justifyContent={["center", "flex-end"]}
                  pt={3}
                  borderTop={1}
                  borderColor={"#999"}
                >
                  <Button.Outline
                    width={[1, "auto"]}
                    onClick={this.toggleSecondary}
                  >
                    Go back
                  </Button.Outline>
                </Flex>
                {/* End secondary footer */}
              </Box>
            </Box>
          )}
        </Card>
      </Modal>
    );
  }
}

export default LowFundsModal;
