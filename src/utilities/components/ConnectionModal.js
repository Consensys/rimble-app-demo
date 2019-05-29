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

const ModalCard = ({children, closeFunc, ...props}) => (
  <Card
    border={0}
    m={0}
    p={0}
    maxWidth={"960px"}
    height={['100vh', 'auto']}
    overflow={"hidden"}
  >
    <Box
      position={"absolute"}
      top={'0'}
      right={'0'}
      m={3}
      borderRadius={'100%'}
      bg={'white'}
    >
      <Button.Text
        icononly
        icon={"Close"}
        mainColor={"moon-gray"}
        onClick={closeFunc}
        size={'2.5rem'}
      />
    </Box>
    <Flex flexDirection={'column'} height={'100%'}>
      {children}
    </Flex>
  </Card>
);

ModalCard.Body = ({children, ...props}) => (
  <Flex flex={'1'} style={{ overflow: 'auto' }} >
    <Box p={['4', '5']} m={'auto'}>
      {children}
    </Box>
  </Flex>
);

ModalCard.Footer = ({children, ...props}) => (
  <Flex
    flex={'0'}
    justifyContent={'center'}
    borderTop={1}
    borderColor={'light-gray'}
    p={3}
  >
    {children}
  </Flex>
);

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

  renderModalContent = () => {
    return (
      <React.Fragment>
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
      </React.Fragment>
    );
  }

  renderConnectButton = () => {
    if (GeneralUtil.hasMetaMask()) {
      return (
        <MetaMaskButton
          onClick={this.props.validateAccount}
          width={[1, 1/2]}
        >
          Connect with MetaMask
        </MetaMaskButton>
      )
    } else {
      return (
        <Button
          onClick={this.props.validateAccount}
          width={[1, 'auto']}
        >
          Connect
        </Button>
      )
    }
  }

  render() {
    return (
      <Modal isOpen={this.props.isOpen}>
        <ModalCard closeFunc={this.props.closeModal}>
            {this.state.showTxFees === false ? (
              <React.Fragment>
                <ModalCard.Body>
                  {this.renderModalContent()}
                </ModalCard.Body>
                <ModalCard.Footer>
                  {this.renderConnectButton()}
                </ModalCard.Footer>
              </React.Fragment>
            ) : (
              <ModalCard.Body>
                <TransactionFeeModal />
                <Box
                  position={'absolute'}
                  top={'0'}
                  left={'0'}
                  m={3}
                  bg={'white'}
                >
                  <Button.Outline
                    onClick={this.toggleShowTxFees}
                    icononly
                    icon={'ArrowBack'}
                    size={'2.5rem'}
                  />
                </Box>
              </ModalCard.Body>
            )}
        </ModalCard>
      </Modal>
    );
  }
}

export default ConnectionModal;
