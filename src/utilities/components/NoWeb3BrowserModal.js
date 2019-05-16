import React from "react";
import {
  Box,
  Card,
  Heading,
  Text,
  Flex,
  Icon,
  Modal,
  Button,
  Link
} from "rimble-ui";

import RimbleUtil from "@rimble/utils";

class NoWeb3BrowserModal extends React.Component {
  render() {
    return (
      <Modal isOpen={this.props.isOpen}>
        <Card p={[3, 5]} maxWidth={"600px"}>
          <Flex justifyContent={"flex-end"} mr={[-3, -5]} mt={[-3, -5]}>
            <Button.Text
              icononly
              icon={"Close"}
              color={"moon-gray"}
              onClick={this.props.closeModal}
            />
          </Flex>

          <Flex flexDirection={"column"} justifyContent={"space-between"}>
            <Flex justifyContent={"center"} my={[3, 4]}>
              <Icon name="Warning" color="gold" size="40" />
            </Flex>

            <Heading.h2
              fontSize={4}
              fontWeight={3}
              lineHeight={"1.375em"}
              my={3}
            >
              Switch browsers to use the Rimble App Demo
            </Heading.h2>

            {RimbleUtil.isMobileDevice() ? (
              <Text my={4}>
                You can't use our blockchain features, like increasing the count
                value, in this browser. We recommend using{" "}
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
                </Link>{" "}
                browsers.
              </Text>
            ) : (
              <Box>
                <Text my={4}>
                  You can't use our blockchain features, like increasing the
                  count value, in this browser. Switch to{" "}
                  <Link
                    href="https://brave.com/download/"
                    title="Download Brave browser"
                    target="_blank"
                  >
                    Brave
                  </Link>
                  ,{" "}
                  <Link
                    href="https://www.mozilla.org/"
                    title="Download FireFox browser"
                    target="_blank"
                  >
                    FireFox
                  </Link>
                  ,{" "}
                  <Link
                    href="https://www.opera.com/download"
                    title="Download Opera Browser"
                    target="_blank"
                  >
                    Opera
                  </Link>
                  , or{" "}
                  <Link
                    href="https://www.google.com/chrome/"
                    title="Download Chrome browser"
                    target="_blank"
                  >
                    Chrome
                  </Link>{" "}
                  to continue.
                </Text>

                <Text>
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
              </Box>
            )}
          </Flex>
        </Card>
      </Modal>
    );
  }
}

export default NoWeb3BrowserModal;
