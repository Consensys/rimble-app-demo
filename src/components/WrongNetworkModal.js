import React from "react";
import { Card, Heading, Text, Flex, ToastMessage, Icon, Modal } from "rimble-ui";

class WrongNetworkModal extends React.Component {
  render() {
    return (
      <Modal isOpen={this.props.isOpen}>
        <Card p={4}>
          <Flex flexDirection={"column"} justifyContent={"space-between"}>
            <Flex justifyContent={"center"}>
              <Icon name="Warning" color="gold" size="40"/>
            </Flex>
            
            <Heading.h2 mt={3}>Wrong Network</Heading.h2>
            <Text mb={3}>Looks like your account is connected to {this.props.currentNetwork.name} network. Head to MetaMask and switch to the {this.props.requiredNetwork.name} network.</Text>
            
            <ToastMessage
              message={'Waiting for the right network.'}
              icon={'InfoOutline'}
            />
          </Flex>
        </Card>
      </Modal>
    )
  }
}

export default WrongNetworkModal;
