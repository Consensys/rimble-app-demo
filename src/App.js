import React, { Component } from "react";
import { ThemeProvider, Box, Text, Flex } from "rimble-ui";

import RimbleWeb3 from "./utilities/RimbleWeb3";

import Header from "./components/Header";
import PrimaryCard from "./components/PrimaryCard";
import InstructionsCard from "./components/InstructionsCard";
import MissingWeb3Provider from "./components/MissingWeb3Provider";

import theme from "./theme";
import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  body, html {
    margin: 0;
    padding: 0;
    background-color: #efefef;
  }
`;

class App extends Component {
  // Optional parameters to pass into RimbleWeb3
  config = {
    accountBalanceMinimum: 1000
  }
  render() {
    return (
      <ThemeProvider theme={theme} className="App">
        <Header />
        <Flex justifyContent="center" p={4}>
          <Text width="400px">
            This is a starter React dApp that uses the Rimble UI component
            library to call methods on a smart contract deployed to the Ethereum
            Rinkeby testnet.
          </Text>
        </Flex>

        <RimbleWeb3 config={this.config}>
          <RimbleWeb3.Consumer>
            {({ 
              needsPreflight, 
              validBrowser, 
              userAgent, 
              web3, 
              account, 
              accountBalance,
              accountBalanceLow,
              initAccount, 
              userRejectedConnect,
              accountValidated,
              accountValidationPending,
              userRejectedValidation,
              validateAccount,
              checkNetwork,
              requiredNetwork,
              currentNetwork,
              isCorrectNetwork,
            }) => (
              <Box>
                {/* Conditionally render child comonents dependent on web3 being loaded */}
                {/* TODO: How can we combine these together to use a single prop? */}
                { validBrowser && web3 && account && accountValidated && isCorrectNetwork ?  
                  <PrimaryCard /> 
                : <MissingWeb3Provider 
                    validBrowser={validBrowser} 
                    userAgent={userAgent} 
                    web3={web3} 
                    account={account} 
                    accountBalance={accountBalance}
                    accountBalanceLow={accountBalanceLow}
                    initAccount={initAccount} 
                    userRejectedConnect={userRejectedConnect}
                    accountValidated={accountValidated} 
                    accountValidationPending={accountValidationPending} 
                    userRejectedValidation={userRejectedValidation} 
                    validateAccount={validateAccount} 
                    checkNetwork={checkNetwork}
                    requiredNetwork={requiredNetwork}
                    currentNetwork={currentNetwork}
                    isCorrectNetwork={isCorrectNetwork}
                  /> 
                }
              </Box>
            )}
          </RimbleWeb3.Consumer>
        </RimbleWeb3>
        <InstructionsCard />
        <GlobalStyle />
      </ThemeProvider>
    );
  }
}

export default App;
