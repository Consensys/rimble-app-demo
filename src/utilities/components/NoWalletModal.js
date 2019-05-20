import React from "react";
import {
  Card,
  Heading,
  Text,
  Flex,
  Modal,
  Button,
  Link,
  MetaMaskButton
} from "rimble-ui";

class NoWalletModal extends React.Component {
  render() {
    return (
      <Modal isOpen={this.props.isOpen}>
        <Card p={[4, 5]} maxWidth={"600px"}>
          <Flex justifyContent={"flex-end"} mr={[-4, -5]} mt={[-4, -5]}>
            <Button.Text
              icononly
              icon={"Close"}
              color={"moon-gray"}
              onClick={this.props.closeModal}
            />
          </Flex>

          <Flex flexDirection={"column"} justifyContent={"space-between"}>
            <Heading.h2 my={3}>
              Install MetaMask to use the Rimble App Demo
            </Heading.h2>

            <Text my={4}>
              MetaMask is a browser extension that will let you use our
              blockchain features in this browser. It may take you a few minutes
              to set up your MetaMask account.
            </Text>

            <MetaMaskButton
              as={"a"}
              href="https://metamask.io"
              target="_blank"
              title="MetaMask website"
            >
              Install MetaMask
            </MetaMaskButton>

            <Text mt={"4"}>
              <Text.span bold>Rather use your phone?</Text.span> You can use the
              Rimble App Demo in mobile browser wallets like{" "}
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
