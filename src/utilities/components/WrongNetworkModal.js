import React from "react";
import {
  Card,
  Heading,
  Text,
  Flex,
  Box,
  Icon,
  Modal,
  Loader,
  Button
} from "rimble-ui";
import GeneralUtil from "../GeneralUtil";

class WrongNetworkModal extends React.Component {
  render() {
    return (
      <Modal isOpen={this.props.isOpen}>
        <Card p={[4, 5]} maxWidth={"600px"}>
          <Flex justifyContent={"flex-end"}>
            <Button.Text
              icononly
              icon={"Close"}
              color={"moon-gray"}
              mt={[-4, -5]}
              mr={[-4, -5]}
              onClick={this.props.closeModal}
            />
          </Flex>

          <Box display={["block", "none"]}>
            <Flex justifyContent={"center"} my={4}>
              <Icon name="Warning" color="gold" size="40" />
            </Flex>
          </Box>

          <Flex flexDirection={"column"} justifyContent={"space-between"}>
            <Heading.h2 my={3}>
              Switch to the {this.props.network.required.name} network in{" "}
              {GeneralUtil.hasMetaMask() ? `MetaMask` : `Settings`}
            </Heading.h2>

            <Text my={4}>
              The Rimble Demo App only works on the {this.props.network.required.name} network. You’re currently on the{" "}
              <Text.span style={{ textTransform: "capitalize" }}>
                {" "}
                {this.props.network.current.name}
              </Text.span>{" "}
              network.
            </Text>

            {GeneralUtil.hasMetaMask() ? (
              <Box bg={"#f6f6fc"} p={3} display={["none", "block"]}>
                <Flex alignItems={"center"}>
                  <Box position={"relative"} width={"4em"}>
                    <Box>
                      <Loader size={"3em"} />
                    </Box>
                    <Box position={"absolute"} top={"1em"} left={"1em"}>
                      <Icon name="Settings" size={"1em"} />
                    </Box>
                  </Box>
                  <Box>
                    <Text fontWeight={4}>Waiting for the right network...</Text>
                    <Text fontWeight={2}>
                      Go to your MetaMask extension to switch
                    </Text>
                  </Box>
                </Flex>
              </Box>
            ) : null}

            <Box display={["block", "none"]}>
              <Button width={1}>OK</Button>
            </Box>
          </Flex>
        </Card>
      </Modal>
    );
  }
}

export default WrongNetworkModal;
