import React from "react";
import {
  Card,
  Heading,
  Text,
  Flex,
  Icon,
  Modal,
  TextButton,
  Link,
  OutlineButton
} from "rimble-ui";

class NoWalletModal extends React.Component {
  render() {
    return (
      <Modal isOpen={this.props.isOpen}>
        <Card p={5} maxWidth={"600px"}>
          <TextButton
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

          <Flex flexDirection={"column"} justifyContent={"space-between"}>
            <Flex justifyContent={"center"} my={4}>
              <Icon name="Warning" color="gold" size="40" />
            </Flex>

            <Heading.h2 my={3}>No Wallet Available</Heading.h2>

            <Text my={4}>
              Your current browser does not have a blockchain connected wallet.
              Try using MetaMask.
            </Text>

            <Link
              href="https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=en"
              target="_blank"
            >
              <OutlineButton size="small">Get MetaMask Extension</OutlineButton>
            </Link>
          </Flex>
        </Card>
      </Modal>
    );
  }
}

export default NoWalletModal;
