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

            <Heading.h2 my={3}>Not a Web3 Browser</Heading.h2>

            <Text my={4}>
              Your current browser does not support interacting with blockchain.
              Try using Chrome.
            </Text>

            <Button.Outline
              size="small"
              as="a"
              href="https://www.google.com/chrome/browser/"
              target="_blank"
            >
              Download Chrome
            </Button.Outline>
          </Flex>
        </Card>
      </Modal>
    );
  }
}

export default NoWeb3BrowserModal;
