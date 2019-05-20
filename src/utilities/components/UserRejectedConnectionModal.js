import React from "react";
import { Card, Heading, Text, Flex, Button, Modal } from "rimble-ui";

class UserRejectedConnectionModal extends React.Component {
  sendMessageAgain = event => {
    this.props.closeModal();
    this.props.initAccount();
  };

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
              You can't continue without connecting your account
            </Heading.h2>

            <Text my={4}>
              To use our blockchain features you need to confirm the connection
              request.
            </Text>

            <Flex justifyContent={"flex-end"} mt={4}>
              <Button.Outline onClick={this.props.closeModal} mr={4}>
                Cancel connection
              </Button.Outline>
              <Button onClick={this.sendMessageAgain}>Try again</Button>
            </Flex>
          </Flex>
        </Card>
      </Modal>
    );
  }
}

export default UserRejectedConnectionModal;
