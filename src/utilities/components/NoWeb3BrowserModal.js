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

class NoWeb3BrowserModal extends React.Component {
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

            <Heading.h2 my={3}>Not a Web3 Browser</Heading.h2>

            <Text my={4}>
              Your current browser does not support interacting with blockchain.
              Try using Chrome.
            </Text>

            <Link href="https://www.google.com/chrome/browser/" target="_blank">
              <OutlineButton size="small">Download Chrome</OutlineButton>
            </Link>
          </Flex>
        </Card>
      </Modal>
    );
  }
}

export default NoWeb3BrowserModal;
