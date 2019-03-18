import React from "react";
import { Card, Heading, Text, Flex, OutlineButton, Button, Icon, Modal, TextButton } from "rimble-ui";

class UserRejectedValidationModal extends React.Component {
  sendMessageAgain = (event) => {
    this.props.closeUserRejectedValidationModal(event);
    this.props.validateAccount();
  };

  render() {
    return (
      <Modal isOpen={this.props.isOpen}>
        <Card p={5} maxWidth={'600px'}>
          <TextButton
            icononly
            icon={'Close'}
            color={'moon-gray'}
            position={'absolute'}
            top={0}
            right={0}
            mt={3}
            mr={3}
            onClick={this.props.closeUserRejectedValidationModal}
          />

          <Flex flexDirection={"column"} justifyContent={"space-between"}>
            <Flex justifyContent={"center"} my={4}>
              <Icon name="Warning" color="gold" size="40"/>
            </Flex>
            
            <Heading.h2 my={3}>You can't continue without signing the message</Heading.h2>

            <Text my={4}>To use Bounties Explorer, you need to sign the message to finish conne ting securely. You can still browse as a guest.</Text>
            
            <Flex justifyContent={"flex-end"} mt={4}>
              <OutlineButton onClick={this.props.closeUserRejectedValidationModal} mr={4}>Browse as guest</OutlineButton>
              <Button onClick={this.sendMessageAgain}>Send message again</Button>
            </Flex>
          </Flex>
        </Card>
      </Modal>
    )
  }
}

export default UserRejectedValidationModal;
