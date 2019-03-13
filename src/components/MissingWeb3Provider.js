import React from "react";
import { Card, Heading, Text, Link, Icon, Flex, ToastMessage } from "rimble-ui"

class MissingWeb3Provider extends React.Component {
  render() {
    return(
      <Card width={"600px"} mx={"auto"} px={4}>
        <Heading.h3 textAlign={"center"}>Get Connected</Heading.h3>
        
        <Flex alignItems={"center"}>
          { this.props.validBrowser ? 
            <Icon name='Check' color={"green"} mr={2} /> 
          :
            <Icon name='Close' color={"red"} mr={2} />
          }
          <Text>Modern & Web3 Capable Browser</Text>
        </Flex>
        <Flex alignItems={"center"}>
          { this.props.web3 ? 
            <Icon name='Check' color={"green"} mr={2} /> 
          :
            <Icon name='Close' color={"red"} mr={2} />
          }
          <Text>Browser-connected Wallet</Text>
        </Flex>
        <Flex alignItems={"center"}>
          { this.props.account ? 
            <Icon name='Check' color={"green"} mr={2} /> 
          :
            <Icon name='Close' color={"red"} mr={2} />
          }
          <Text>Wallet Unlocked</Text>
        </Flex>
        <Flex alignItems={"center"}>
          { this.props.account ? 
            <Icon name='Check' color={"green"} mr={2} /> 
          :
            <Icon name='Close' color={"red"} mr={2} />
          }
          <Text>Wallet Connected</Text>
        </Flex>
        <Flex alignItems={"center"}>
          { this.props.network ? 
            <Icon name='Check' color={"green"} mr={2} /> 
          :
            <Icon name='Close' color={"red"} mr={2} />
          }
          <Text>Correct Network</Text>
        </Flex>

        {/* <Text>You will need to <Link href="https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=en" target="_blank">install MetaMask</Link> to use this dApp.</Text> */}
        <ToastMessage.Provider ref={node => (window.toastProvider = node)} />
      </Card>
    )
  }
}

export default MissingWeb3Provider
