import React from "react";
import {
  Card,
  Heading,
  Text,
  Flex,
  Icon,
  Modal,
  Button,
  Link
} from "rimble-ui";

class NoWalletModal extends React.Component {
  render() {
    return (
      <Modal isOpen={this.props.isOpen}>
        <Card p={5} maxWidth={"600px"}>
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

          <Flex flexDirection={"column"} justifyContent={"space-between"}>
            <Flex justifyContent={"center"} my={4}>
              <Icon name="Warning" color="gold" size="40" />
            </Flex>

            <Heading.h2 my={3}>Install MetaMask to use the Rimble App Demo</Heading.h2>

            <Text my={4}>
              MetaMask is a browser extension that will let you use our blockchain features in this browser. It may take you a few minutes to set up your MetaMask account.
            </Text>

            <Link
              href="https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=en"
              target="_blank"
            >
              <Button.Outline size="small">
                Get MetaMask Extension
              </Button.Outline>
            </Link>
            <Text mt={'4'}>
              <Text.span bold>Rather use your phone?</Text.span> You can use
              the Rimble App Demo in mobile browser wallets like{" "}
              <Link
                href="https://status.im/"
                title="status.im website"
                target="_blank"
              >
                Status
              </Link>
              ,{" "}
              <Link
                href="https://www.cipherbrowser.com/"
                title="Cipher Wallet"
                target="_blank"
              >
                Cipher
              </Link>{" "}
              or{" "}
              <Link
                href="https://wallet.coinbase.com/"
                title="Coinbase Wallet"
                target="_blank"
              >
                Coinbase wallet
              </Link>
              .
            </Text>
          </Flex>
        </Card>
      </Modal>
    );
  }
}

export default NoWalletModal;
