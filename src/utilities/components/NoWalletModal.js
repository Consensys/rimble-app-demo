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
      // <Modal isOpen={this.props.isOpen}>
      <Modal isOpen={true}>
        <Card p={[3, 5]} maxWidth={"600px"}>
          <Flex justifyContent={"flex-end"}>
            <Button.Text
              icononly
              icon={"Close"}
              color={"moon-gray"}
              mt={[-3, -5]}
              mr={[-3, -5]}
              onClick={this.props.closeModal}
            />
          </Flex>

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
              href="https://metamask.io"
              target="_blank"
              title="MetaMask website"
            >
              <Button.Outline size="small">
                Get MetaMask Extension
              </Button.Outline>
            </Link>
          </Flex>
        </Card>
      </Modal>
    );
  }
}

export default NoWalletModal;
