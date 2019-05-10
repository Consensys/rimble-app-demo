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
  QR
} from "rimble-ui";
import NetworkOverview from "./NetworkOverview";
import theme from "../../theme";

class LowFundsModal extends React.Component {
  state = {
    showQR: false
  };

  toggleQRVisible = () => {
    this.setState({
      showQR: !this.state.showQR
    });
  };

  RightColumn = () => {
    return (
      <Flex flexDirection={"column"} p={3}>
        <Flex justifyContent={"center"} my={4}>
          <Icon name="Warning" color="gold" size="40" />
        </Flex>

        <Heading.h2>Low Funds</Heading.h2>

        <Text mb={4}>
          To use Bounties Explorer's block chain features, you'll need to own
          Ether. Deposit Ether into your account via your MetaMask extension or
          send Funds from another account.
        </Text>

        <PublicAddress address={this.props.account} />

        <Box my={3}>
          <Text.span bold fontWeight={3} mr={3}>
            Got another account on a mobile wallet?
          </Text.span>
          <Text.span>
            Send funds by scanning your QR code with your wallet app.
          </Text.span>
        </Box>

        <Box mb={4}>
          <Button.Outline onClick={this.toggleQRVisible}>
            <Flex alignItems={"center"}>
              <Icon name="FilterCenterFocus" mr={2} />
              Show account QR code
            </Flex>
          </Button.Outline>
        </Box>
        <Flex justifyContent={"flex-end"}>
          <Box>
            <Button onClick={this.props.closeModal}>
              Continue to Bounties Explorer
            </Button>
          </Box>
        </Flex>
      </Flex>
    );
  };

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

          <Flex justifyContent={"center"} alignContent={"stretch"}>
            <Box width={"400px"} flex={"1 1 auto"}>
              <Flex flexDirection={"column"} alignContent={"center"}>
                <Box>
                  <Text color={theme.colors.primary} caps>
                    Current Network
                  </Text>
                  <NetworkOverview network={this.props.currentNetwork} />
                </Box>

                <Box my={4}>
                  <Text color={theme.colors.primary} caps>
                    New to Ether?
                  </Text>
                </Box>

                <Text fontWeight={3}>What you'll need Ether for:</Text>
                <ul>
                  <li>Submitting a bounty</li>
                  <li>Paying for a completed bounty</li>
                  <li>Network fees</li>
                </ul>

                <Text fontWeight={3}>What are network fees?</Text>
                <Text>
                  Network fees pay for a person or group to add a record of your
                  action to the blockchain and let the network know. It doesn't
                  go to us.
                </Text>
              </Flex>
            </Box>

            <Flex borderRight={1} borderColor={"#999"} mx={3}>
              <Text />
            </Flex>
            {!this.state.showQR ? (
              this.RightColumn()
            ) : (
              <Box>
                <Flex justifyContent={"center"}>
                  <QR value={this.props.account} />
                </Flex>

                <Text>{this.props.account}</Text>
                <Button.Outline onClick={this.toggleQRVisible}>
                  Close QR
                </Button.Outline>
              </Box>
            )}
          </Flex>
        </Card>
      </Modal>
    );
  }
}

export default LowFundsModal;
