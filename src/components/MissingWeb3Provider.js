import React from "react";
import { Card, Heading, Text, Icon, Flex, ToastMessage, OutlineButton, Box, Button, Link } from "rimble-ui";
import WrongNetworkBanner from "./WrongNetworkBanner";
import NetworkOverview from "./NetworkOverview";
import WrongNetworkModal from "./WrongNetworkModal";
import ConnectionModal from "./ConnectionModal";
import TransactionConnectionModal from "./TransactionConnectionModal";
import ConnectionPendingModal from "./ConnectionPendingModal";

class MissingWeb3Provider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      wrongNetworkModalIsOpen: false,
      connectionModalIsOpen: false,
      transactionConnectionModalIsOpen: false,
      accountValidationPending: this.props.accountValidationPending
    }
  }

  closeWrongNetworkModal = (e) => {
    e.preventDefault()
    this.setState((state, props) => ({
      wrongNetworkModalIsOpen: false
    }))
  }

  openWrongNetworkModal = (e) => {
    e.preventDefault()
    this.setState((state, props) => ({
      wrongNetworkModalIsOpen: true
    }))
  }

  closeConnectionModal = (e) => {
    e.preventDefault()
    this.setState((state, props) => ({
      connectionModalIsOpen: false
    }))
  }

  openConnectionModal = (e) => {
    e.preventDefault()
    this.setState((state, props) => ({
      connectionModalIsOpen: true
    }))
  }

  closeTransactionConnectionModal = (e) => {
    e.preventDefault()
    this.setState((state, props) => ({
      transactionConnectionModalIsOpen: false
    }))
  }

  openTransactionConnectionModal = (e) => {
    e.preventDefault()
    this.setState((state, props) => ({
      transactionConnectionModalIsOpen: true
    }))
  }

  closeConnectionPendingModal = (e) => {
    e.preventDefault()
    this.setState((state, props) => ({
      accountValidationPending: false
    }))
  }

  openConnectionPendingModal = (e) => {
    e.preventDefault()
    this.setState((state, props) => ({
      accountValidationPending: true
    }))
  }

  componentWillReceiveProps(props) {
    this.setState({ accountValidationPending: props.accountValidationPending });
  }


  render() {
    return(
      <Card width={"600px"} mx={"auto"} px={4}>
        <Heading.h3 textAlign={"center"}>Get Connected</Heading.h3>
        
        <Box>
          <Flex alignItems={"center"}>
            { this.props.validBrowser 
              ? 
                <Icon name='Check' color={"green"} mr={2} /> 
              :
                <Icon name='Close' color={"red"} mr={2} />
            }
            <Text>Modern & Web3 Capable Browser</Text>
          </Flex>

          { !this.props.validBrowser 
            ? 
              <Flex ml={4} alignItems={"center"} justifyContent={"space-between"}>
                <Flex alignItems={"center"}>
                  <Icon name='Info' mr={2} color="#999" />
                  <Text color="#999">You current browser is not web3 capable.</Text>
                </Flex>
                
                <Link href="https://www.google.com/chrome/browser/" target="_blank">
                  <OutlineButton size="small">Download Chrome</OutlineButton>
                </Link>
              </Flex>
            : null 
          }
        </Box>

        <Box>
          <Flex alignItems={"center"}>
            { this.props.web3 
              ? 
                <Icon name='Check' color={"green"} mr={2} /> 
              :
                <Icon name='Close' color={"red"} mr={2} />
            }
            <Text>Browser-connected Wallet</Text>
          </Flex>

          { !this.props.web3 && this.props.validBrowser
            ? 
              <Flex ml={4} alignItems={"center"} justifyContent={"space-between"}>
                <Flex alignItems={"center"}>
                  <Icon name='Info' mr={2} color="#999" />
                  <Text color="#999">You do not have a wallet.</Text>
                </Flex>
                
                <Link href="https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=en" target="_blank">
                  <OutlineButton size="small">Get MetaMask Extension</OutlineButton>
                </Link>
              </Flex>
            : null 
          }
        </Box>

        { this.props.web3
          ? 
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
                onClick={this.props.validateAccount}
                disabled={!this.props.web3}
              >Connect & Validate</Button>
              <Text>- or -</Text>
              <Button size="small" disabled>Initiate On-Chain Action</Button>
            </Flex>
          :
            null
        }

        <Box>
          <Flex alignItems={"center"}>
            { this.props.isCorrectNetwork ? 
              <Icon name='Check' color={"green"} mr={2} /> 
            :
              <Icon name='Close' color={"red"} mr={2} />
            }
            <Text>Correct Network</Text>
          </Flex>

          { this.props.web3 && !this.props.isCorrectNetwork
            ? 
              <Flex ml={4} alignItems={"center"} justifyContent={"space-between"}>
                <Flex alignItems={"center"}>
                  <Icon name='Info' mr={2} color="#999" />
                  <Box>
                    <Flex alignItems={"center"}>
                      <Text mr={2} color="#999" style={{ textTransform: "capitalize" }}>Current network:</Text>
                      <NetworkOverview network={this.props.currentNetwork}/>
                    </Flex>
                    <Flex alignItems={"center"}>
                      <Text mr={2} color="#999" style={{ textTransform: "capitalize" }}>Required network:</Text>
                      <NetworkOverview network={this.props.requiredNetwork}/>
                    </Flex>
                  </Box>
                </Flex>
                
                <OutlineButton size="small" onClick={this.props.checkNetwork}>Check Network</OutlineButton>
              </Flex>
            : 
              null
          }
          { 
            this.props.web3 && this.props.isCorrectNetwork
            ?
              <Flex ml={4} alignItems={"center"} >
                <NetworkOverview network={this.props.currentNetwork}/>
              </Flex>
            :
              null
          }
        </Box>
        
        <Box>
          <Flex alignItems={"center"}>
            { this.props.account && this.props.accountValidated
              ? 
                <Icon name='Check' color={"green"} mr={2} /> 
              :
                <Icon name='Close' color={"red"} mr={2} />
            }
            <Text>Wallet Connected and Validated</Text>
          </Flex>

          { !this.props.account && this.props.web3 
            ? 
              <Flex ml={4} alignItems={"center"} justifyContent={"space-between"}>
                <Flex alignItems={"center"}>
                  <Icon name='Info' mr={2} color="#999" />
                  <Text color="#999">Not connected to this dApp.</Text>
                </Flex>
                
                <OutlineButton size="small" onClick={this.props.initAccount}>Connect</OutlineButton>
              </Flex>
            : 
              null
          }
          {
            this.props.account && this.props.web3
            ?
              <Flex ml={4} alignItems={"center"}>
                <Icon name='Check' color={"green"} mr={2} /> 
                <Text color="#999">Connected wallet {this.props.account}</Text>
              </Flex>
            :
              null
          }

          { this.props.userRejectedConnect 
            ? 
              <Flex ml={4}>
                <Icon name='Error' mr={2} color="red" />
                <Text color="red">User rejected Connect request</Text>
              </Flex>
            : 
              null
          }

          { (this.props.accountValidated === null || this.props.accountValidated === false) && this.props.web3 
            ? 
              <Flex ml={4} my={1} alignItems={"center"} justifyContent={"space-between"}>
                <Flex alignItems={"center"}>
                  <Icon name='Info' mr={2} color="#999" />
                  <Text color="#999">Account not validated</Text>
                </Flex>
                
                <OutlineButton size="small" onClick={this.props.validateAccount}>Validate</OutlineButton>
              </Flex>
            : 
              null
          }

          { this.props.accountValidated === false
            ? 
              <Flex ml={4}>
              <Icon name='Error' mr={2} color="red" />
                <Text color="red">Account not validated</Text>
              </Flex>
            : 
              null
          }
        </Box>

        <Box>
          <Heading.h4 textAlign={"center"}>Show Modal</Heading.h4>
          <Button size="small" onClick={this.openWrongNetworkModal}>Blocking Wrong Network</Button>
          <Button size="small" onClick={this.openConnectionModal}>Connection</Button>
          <Button size="small" onClick={this.openTransactionConnectionModal}>Transaction Connection</Button>
          <Button size="small" onClick={this.openConnectionPendingModal}>Connection Pending</Button>
        </Box>

        {/* Modals */}
        <WrongNetworkModal closeWrongNetworkModal={this.closeWrongNetworkModal} isOpen={this.state.wrongNetworkModalIsOpen} requiredNetwork={this.props.requiredNetwork} currentNetwork={this.props.currentNetwork} />
        <ConnectionModal closeConnectionModal={this.closeConnectionModal} validateAccount={this.props.validateAccount} isOpen={this.state.connectionModalIsOpen && !this.props.accountValidated} currentNetwork={this.props.currentNetwork} />
        <TransactionConnectionModal closeTransactionConnectionModal={this.closeTransactionConnectionModal} validateAccount={this.props.validateAccount} isOpen={this.state.transactionConnectionModalIsOpen && !this.props.accountValidated} currentNetwork={this.props.currentNetwork} />
        <ConnectionPendingModal closeConnectionPendingModal={this.closeConnectionPendingModal} isOpen={ this.state.accountValidationPending } currentNetwork={this.props.currentNetwork} />
        
        <ToastMessage.Provider ref={node => (window.toastProvider = node)} />
        { !this.props.isCorrectNetwork && this.props.web3
          ?
            <WrongNetworkBanner requiredNetwork={this.props.requiredNetwork} currentNetwork={this.props.currentNetwork}></WrongNetworkBanner>
          :
            null
        }
      </Card>
    )
  }
}

export default MissingWeb3Provider
