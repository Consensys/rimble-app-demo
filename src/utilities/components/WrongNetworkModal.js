import React from "react";
import {
  Card,
  Heading,
  Text,
  Flex,
  ToastMessage,
  Icon,
  Modal,
  Button
} from "rimble-ui";

class WrongNetworkModal extends React.Component {
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

            <Heading.h2 my={3}>Switch to the {this.props.network.required.name} network in MetaMask</Heading.h2>

            <Text my={4}>
            The Rimble Demo App only works on the {this.props.network.required.name} network. Switch networks in your MetaMask extension to continue. You’re currently on the {this.props.network.current.name} network.
            </Text>

            <ToastMessage
              message={"Waiting for the right network..."}
              icon={"InfoOutline"}
            />
          </Flex>
        </Card>
      </Modal>
    );
  }
}

export default WrongNetworkModal;
