import React from "react";
import {
  Card,
  Heading,
  Text,
  Icon,
  Flex,
  ToastMessage,
  OutlineButton,
  Box,
  Button,
  Link
} from "rimble-ui";
import NetworkOverview from "../utilities/components/NetworkOverview";

const DebuggerButtons = props => (
  <Box mt={4} borderTop={1} borderColor="#E8E8E8" pt={3}>
    <Heading.h4 textAlign={"center"}>Show Modal</Heading.h4>
    <Button
      onClick={props.modals.methods.openWrongNetworkModal}
      size="small"
      mr={2}
      mb={2}
    >
      Blocking Wrong Network
    </Button>

    <Button
      onClick={props.modals.methods.openConnectionModal}
      size="small"
      mr={2}
      mb={2}
    >
      Connection
    </Button>
    <Button
      size="small"
      onClick={props.modals.methods.openConnectionPendingModal}
      mr={2}
      mb={2}
    >
      Connection Pending
    </Button>
    <Button
      size="small"
      onClick={props.modals.methods.openUserRejectedConnectionModal}
      mr={2}
      mb={2}
    >
      Connection Rejected
    </Button>
    <Button
      size="small"
      onClick={props.modals.methods.openTransactionConnectionModal}
      mr={2}
      mb={2}
    >
      Transaction Connection
    </Button>
    <Button
      size="small"
      onClick={props.modals.methods.openValidationPendingModal}
      mr={2}
      mb={2}
    >
      Validation Pending
    </Button>
    <Button
      size="small"
      onClick={props.modals.methods.openUserRejectedValidationModal}
      mr={2}
      mb={2}
    >
      User Rejected Validation
    </Button>
    <Button
      size="small"
      onClick={event => {
        props.modals.methods.openLowFundsModal(event);
      }}
      mr={2}
      mb={2}
    >
      Low Funds
    </Button>
    <Button
      size="small"
      onClick={props.modals.methods.openNoWeb3BrowserModal}
      mr={2}
      mb={2}
    >
      Not Web3 Browser
    </Button>
    <Button
      size="small"
      onClick={props.modals.methods.openNoWalletModal}
      mr={2}
      mb={2}
    >
      No Wallet
    </Button>
  </Box>
);

class Web3Debugger extends React.Component {
  render() {
    return (
      <Card width={"600px"} mx={"auto"} px={4}>
        <Heading.h3 textAlign={"center"}>Get Connected</Heading.h3>

        <Box>
          <Flex alignItems={"center"}>
            {this.props.validBrowser ? (
              <Icon name="Check" color={"green"} mr={2} />
            ) : (
              <Icon name="Close" color={"red"} mr={2} />
            )}
            <Text>Modern & Web3 Capable Browser</Text>
          </Flex>

          {!this.props.validBrowser ? (
            <Flex ml={4} alignItems={"center"} justifyContent={"space-between"}>
              <Flex alignItems={"center"}>
                <Icon name="Info" mr={2} color="#999" />
                <Text color="#999">
                  You current browser is not web3 capable.
                </Text>
              </Flex>

              <Link
                href="https://www.google.com/chrome/browser/"
                target="_blank"
              >
                <OutlineButton size="small">Download Chrome</OutlineButton>
              </Link>
            </Flex>
          ) : null}
        </Box>

        <Box>
          <Flex alignItems={"center"}>
            {this.props.web3 ? (
              <Icon name="Check" color={"green"} mr={2} />
            ) : (
              <Icon name="Close" color={"red"} mr={2} />
            )}
            <Text>Browser-connected Wallet</Text>
          </Flex>

          {!this.props.web3 && this.props.validBrowser ? (
            <Flex ml={4} alignItems={"center"} justifyContent={"space-between"}>
              <Flex alignItems={"center"}>
                <Icon name="Info" mr={2} color="#999" />
                <Text color="#999">You do not have a wallet.</Text>
              </Flex>

              <Link
                href="https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=en"
                target="_blank"
              >
                <OutlineButton size="small">
                  Get MetaMask Extension
                </OutlineButton>
              </Link>
            </Flex>
          ) : null}
        </Box>

        {this.props.web3 ? (
          <Flex
            py={3}
            my={3}
            borderTop={1}
            borderBottom={1}
            borderColor={"#E8E8E8"}
            textAlign={"center"}
            justifyContent={"space-around"}
            alignItems={"center"}
          >
            <Button
              size="small"
              onClick={this.props.connectAndValidateAccount}
              disabled={!this.props.web3}
            >
              Connect and verify
            </Button>
            <Text>- or -</Text>
            <Button size="small" disabled>
              Initiate On-Chain Action
            </Button>
          </Flex>
        ) : null}

        <Box>
          <Flex alignItems={"center"}>
            {this.props.network.isCorrectNetwork ? (
              <Icon name="Check" color={"green"} mr={2} />
            ) : (
              <Icon name="Close" color={"red"} mr={2} />
            )}
            <Text>Correct Network</Text>
          </Flex>

          {this.props.web3 && !this.props.network.isCorrectNetwork ? (
            <Flex ml={4} alignItems={"center"} justifyContent={"space-between"}>
              <Flex alignItems={"center"}>
                <Icon name="Info" mr={2} color="#999" />
                <Box>
                  <Flex alignItems={"center"}>
                    <Text
                      mr={2}
                      color="#999"
                      style={{ textTransform: "capitalize" }}
                    >
                      Current network:
                    </Text>
                    <NetworkOverview network={this.props.network.current} />
                  </Flex>
                  <Flex alignItems={"center"}>
                    <Text
                      mr={2}
                      color="#999"
                      style={{ textTransform: "capitalize" }}
                    >
                      Required network:
                    </Text>
                    <NetworkOverview network={this.props.network.required} />
                  </Flex>
                </Box>
              </Flex>

              <OutlineButton size="small" onClick={this.props.checkNetwork}>
                Check Network
              </OutlineButton>
            </Flex>
          ) : null}
          {this.props.web3 && this.props.isCorrectNetwork ? (
            <Flex ml={4} alignItems={"center"}>
              <NetworkOverview network={this.props.network.current} />
            </Flex>
          ) : null}
        </Box>

        <Box>
          <Flex alignItems={"center"}>
            {this.props.account && this.props.accountValidated ? (
              <Icon name="Check" color={"green"} mr={2} />
            ) : (
              <Icon name="Close" color={"red"} mr={2} />
            )}
            <Text>Wallet connected and verified</Text>
          </Flex>

          {!this.props.account &&
          this.props.web3 &&
          !this.props.userRejectedConnect ? (
            <Flex ml={4} alignItems={"center"} justifyContent={"space-between"}>
              <Flex alignItems={"center"}>
                <Icon name="Info" mr={2} color="#999" />
                <Text color="#999">Not connected to this dApp.</Text>
              </Flex>

              <OutlineButton size="small" onClick={this.props.initAccount}>
                Connect
              </OutlineButton>
            </Flex>
          ) : null}
          {this.props.account && this.props.web3 ? (
            <Flex ml={4} alignItems={"center"}>
              <Icon name="Check" color={"green"} mr={2} />
              <Box>
                <Text color="#999">Connected wallet {this.props.account}</Text>
                <Text color={this.props.accountBalanceLow ? "red" : "#999"}>
                  Account balance {this.props.accountBalance}
                </Text>
              </Box>
            </Flex>
          ) : null}

          {this.props.userRejectedConnect ? (
            <Flex ml={4} justifyContent={"space-between"}>
              <Flex alignItems={"center"}>
                <Icon name="Error" mr={2} color="red" />
                <Text color="red">User rejected Connect request</Text>
              </Flex>

              <OutlineButton size="small" onClick={this.props.initAccount}>
                Connect
              </OutlineButton>
            </Flex>
          ) : null}

          {(this.props.accountValidated === null ||
            this.props.accountValidated === false) &&
          this.props.web3 ? (
            <Flex
              ml={4}
              my={1}
              alignItems={"center"}
              justifyContent={"space-between"}
            >
              <Flex alignItems={"center"}>
                <Icon name="Info" mr={2} color="#999" />
                <Text color="#999">Account not verified</Text>
              </Flex>

              <OutlineButton size="small" onClick={this.props.validateAccount}>
                Validate
              </OutlineButton>
            </Flex>
          ) : null}

          {this.props.accountValidated === false ? (
            <Flex
              ml={4}
              my={1}
              alignItems={"center"}
              justifyContent={"space-between"}
            >
              <Flex alignItems={"center"}>
                <Icon name="Error" mr={2} color="red" />
                <Text color="red">Account not verified</Text>
              </Flex>

              <OutlineButton size="small" onClick={this.props.validateAccount}>
                Validate
              </OutlineButton>
            </Flex>
          ) : null}

          {this.props.userRejectedValidation === false ? (
            <Flex ml={4}>
              <Icon name="Error" mr={2} color="red" />
              <Text color="red">Account not verified</Text>
            </Flex>
          ) : null}
        </Box>

        <DebuggerButtons {...this.props} />

        <ToastMessage.Provider ref={node => (window.toastProvider = node)} />
      </Card>
    );
  }
}

export default Web3Debugger;
