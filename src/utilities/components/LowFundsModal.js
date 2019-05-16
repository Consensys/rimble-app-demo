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


        <Heading.h2>
          You don't have enough Ether for transaction fees
        </Heading.h2>

        <Text mb={4}>
          This is a blockchain action so you’ll have to pay a transaction fee. A few dollars worth of Ether should be enough but fees do change based on how busy the network is. <strong>Fund your account and try again.</strong>
          <Link>
            What are transaction fees?
          </Link>
        </Text>
        <Heading.h3>
          How to add funds
        </Heading.h3>
        <Flex my={3}>
          <Box mx={2} width={1/2}>
            <Card>
              <Icon name="SwapHoriz" color="primary" size="60"/>
              <Heading.h4>
                Buy ETH from an exchange
              </Heading.h4>
              <Text>
                You can buy ETH from exchanges like Coinbase and send it to your account. If you don’t already have a Coinbase account, it can take a while to get set up.
              </Text>
              <Button.Outline my={3}>
                <Flex alignItems={"center"}>
                  <Icon name="OpenInNew" mr={2} />
                  Go to CoinBase
                </Flex>
              </Button.Outline>
            </Card>
          </Box>
          <Box mx={2} width={1/2}>
            <Card>
              <Icon name="Send" color="primary" size="60"/>
              <Heading.h4>
                Send ETH from another account
              </Heading.h4>
              <Text>
                If you have ETH in another Ethereum account, you can send it to this account using your public Ethereum address or QR code.
              </Text>
              <Button.Outline my={3} onClick={this.toggleQRVisible}>
                <Flex alignItems={"center"}>
                  <Icon name="FilterCenterFocus" mr={2} />
                  Show account QR code
                </Flex>
              </Button.Outline>
            </Card>
          </Box>
        </Flex>


        <Box mb={4}>

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



            {!this.state.showQR ? (
              this.RightColumn()
            ) : (
              <Box>
                <Flex my={3} justifyContent={"center"}>
                  <QR value={this.props.account} />
                </Flex>

                <PublicAddress my={3} address={this.props.account} />
                <Button.Outline my={3} onClick={this.toggleQRVisible}>
                  Go back
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
