import React from "react";
import { Card, Heading, Text, Icon, Flex, ToastMessage, OutlineButton, Box, Button } from "rimble-ui"
import WrongNetworkBanner from "./WrongNetworkBanner"
import NetworkOverview from "./NetworkOverview"

class MissingWeb3Provider extends React.Component {
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
                
                <OutlineButton size="small" href="https://www.google.com/chrome/browser/">Download Chrome</OutlineButton>
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
                
                <OutlineButton size="small" href="https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=en">Get MetaMask Extension</OutlineButton>
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

          { !this.props.account && this.props.web3 && !this.props.isCorrectNetwork
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
              <Flex ml={4} alignItems={"center"} >
                <NetworkOverview network={this.props.currentNetwork}/>
              </Flex>
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
              <Flex ml={4} alignItems={"center"}>
                <Icon name='Check' color={"green"} mr={2} /> 
                <Text color="#999">Connected wallet {this.props.account}</Text>
              </Flex>
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
