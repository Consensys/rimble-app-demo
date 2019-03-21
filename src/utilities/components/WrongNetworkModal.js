import React from "react";
import {
  Card,
  Heading,
  Text,
  Flex,
  ToastMessage,
  Icon,
  Modal,
  TextButton
} from "rimble-ui";

class WrongNetworkModal extends React.Component {
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

            <Heading.h2 my={3}>Wrong Network</Heading.h2>

            <Text my={4}>
              Looks like your account is connected to the{" "}
              <Text.span style={{ textTransform: "capitalize" }}>
                {this.props.network.current.name}
              </Text.span>{" "}
              network. Head to MetaMask and switch to the{" "}
              {this.props.network.required.name} network.
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
