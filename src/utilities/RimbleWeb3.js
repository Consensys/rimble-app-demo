import React from "react";
import Web3 from "web3"; // uses latest 1.x.x version
import bowser from "bowser";

const RimbleTransactionContext = React.createContext({
  contract: {},
  account: {},
  accountBalance: {},
  accountBalanceLow: {},
  web3: {},
  transactions: {},
  checkPreflight: () => {},
  initWeb3: () => {},
  initContract: () => {},
  initAccount: () => {},
  userRejectedConnect: {},
  accountValidated: {},
  accountValidationPending: {},
  userRejectedValidation: {},
  validateAccount: () => {},
  checkNetwork: () => {},
  requiredNetwork: {},
  currentNetwork: {},
  isCorrectNetwork: {},
});

class RimbleTransaction extends React.Component {
  static Consumer = RimbleTransactionContext.Consumer;
  
  // Performs 
  checkPreflight = () => {
    this.checkModernBrowser();
    this.initWeb3();

    // Prevent MetaMask from reloading page on network change
    // TODO: Throwing too many system dialogs, possible to resolve?
    // window.onbeforeunload = function() {
    //   console.log("Suppresing page reload");
    //   return "Prevent reload"
    // }
    
  }

  // Validates user's browser is web3 capable
  checkModernBrowser = async () => {
    // User Agent
    const browser = bowser.getParser(window.navigator.userAgent);
    const userAgent = browser.parse().parsedResult;

    const validBrowser = browser.satisfies({
      desktop: {
        chrome: '>49',
        firefox: '>52',
        opera: '>36'
      }
    }) ? true : false;

    this.setState({ 
      userAgent,
      validBrowser
    });

    return validBrowser;
  }

  // Initialize a web3 provider
  // TODO: Make async work
  initWeb3 = async () => {
    return new Promise ((resolve, reject) => {
      let web3 = {};

      // Check for modern web3 provider
      if (window.ethereum) {
        console.log("Using modern web3 provider.");
        web3 = new Web3(window.ethereum);
      }
      // Legacy dapp browsers, public wallet address always exposed
      else if (window.web3) {
        console.log("Legacy web3 provider. Try updating.");
        web3 = new Web3(window.web3.currentProvider);
      }
      // Non-dapp browsers...
      else {
        console.log(
          "Non-Ethereum browser detected. You should consider trying MetaMask!"
        );

        web3 = false;
      }

      this.setState({ web3 }, () => {
        // After setting the web3 provider, check network
        this.checkNetwork();
      });
    }, error => {
      console.log("Error initializing web3");
    });
  };

  initContract = async (address, abi) => {
    console.log("creating contract");
    // Create contract on initialized web3 provider with given abi and address
    try {
      const contract = await new this.state.web3.eth.Contract(abi, address);
      this.setState({ contract });
    } catch (error) {
      console.log("Could not create contract.");
      window.toastProvider.addMessage("Contract creation failed.", {
        variant: "failure"
      });
    }
  };

  initAccount = async () => {
    try {
      // Request account access if needed
      await window.ethereum.enable().then(wallets => {
        const account = wallets[0];
        this.setState({ account });
        console.log("wallet address:", this.state.account);
        
        // Watch for account change
        this.pollAccountUpdates();
      });
    } catch (error) {
      // User denied account access...
      console.log("User cancelled connect request. Error:", error);
      window.toastProvider.addMessage("User needs to CONNECT wallet", {
        variant: "failure"
      });
      this.setState({ userRejectedConnect: true })
    }
    // After account is complete, get the balance
    await this.getAccountBalance();
  };

  getAccountBalance = async () => {
    try {
      await this.state.web3.eth.getBalance(this.state.account).then(accountBalance => {
        accountBalance = this.state.web3.utils.fromWei(accountBalance, "ether");
        accountBalance = parseFloat(accountBalance);
        this.setState({ accountBalance })
        console.log("account balance: ", accountBalance);

        this.determineAccountLowBalance();
      });
    } catch (error) {
      console.log("Failed to get account balance.");
    }
  };

  determineAccountLowBalance = () => {
    // If provided a minimum from config then use it, else default to 1
    console.log("this.props.config", this.props.config);
    
    const accountBalanceMinimum = typeof (this.props.config.accountBalanceMinimum) !== "undefined"
      ?
        this.props.config.accountBalanceMinimum
      : 
        1000

    console.log("accountBalanceMinimum", accountBalanceMinimum);
    // Determine if the account balance is low
    console.log("this.state.accountBalance", this.state.accountBalance);
    console.log("compare", (this.state.accountBalance < accountBalanceMinimum));
    const accountBalanceLow = this.state.accountBalance < accountBalanceMinimum
      ?
        true
      :
        false;

    this.setState({
      accountBalanceLow
    });
  }

  validateAccount = async () => {
    // Show blocking modal
    this.setState({ 
      accountValidationPending: true,
      userRejectedValidation: false,
    });

    console.log("Account: ", this.state.account)
    if (!this.state.account) {
      await this.initAccount();
    }

    return window.web3.personal.sign(
      window.web3.fromUtf8(`I am signing my one-time nonce: 012345`),
      this.state.account,
      (err, signature) => {
        if (err) {
          // User rejected account validation.
          console.log("Wallet account not validated. Error:", err);
          window.toastProvider.addMessage("Wallet account was not validated", {
            variant: "failure"
          });
          this.setState({ 
            accountValidated: false, 
            accountValidationPending: false,
            userRejectedValidation: true,
          });
        } else {
          console.log("Account validation successful.", signature);
          this.setState({ 
            accountValidated: true, 
            accountValidationPending: false 
          });
        }
      }
    )
  }

  getNetworkId = async () => {
    try {
      return this.state.web3.eth.net.getId((error, networkId) => {
        let currentNetwork = { ...this.state.currentNetwork };
        currentNetwork.id = networkId;
        this.setState({ currentNetwork });
      });
    } catch (error) {
      console.log("Could not get network ID: ", error);
    }
  }

  getNetworkName = async () => {
    try {
      return this.state.web3.eth.net.getNetworkType((error, networkName) => {
        let currentNetwork = { ...this.state.currentNetwork };
        currentNetwork.name = networkName;
        this.setState({ currentNetwork });
      });
    } catch (error) {
      console.log("Could not get network Name: ", error);
    }
  }

  checkNetwork = async () => {
    let isCorrectNetwork = null;
    await this.getNetworkId();
    await this.getNetworkName();

    isCorrectNetwork = this.state.currentNetwork.id === this.state.requiredNetwork.id
      ? true
      : false;
  
    this.setState({ isCorrectNetwork });
  }

  pollAccountUpdates = () => {
    let account = this.state.account;
    let requiresUpdate = false;
    let accountInterval = setInterval(() => {
      window.ethereum.enable().then(wallets => {
        const updatedAccount = wallets[0];
        
        if (updatedAccount !== account) {
          requiresUpdate = true;
        }

        if (requiresUpdate) {
          clearInterval(accountInterval);
          this.setState({
            userRejectedConnect: null,
            account: '',
            accountValidated: null,
          }, () => {
            this.initAccount()
          });
        }
      });
    }, 1000);
  }

  contractMethodSendWrapper = contractMethod => {
    // Create new tx and add to collection
    // Maybe this needs to get moved out of the wrapper?
    let transaction = this.createTransaction();
    this.addTransaction(transaction);

    // Add meta data to transaction
    transaction.method = contractMethod;
    transaction.type = "contract";
    transaction.status = "started";

    // Show toast for starting transaction
    this.updateTransaction(transaction);

    const { contract, account } = this.state;

    try {
      contract.methods[contractMethod]()
        .send({ from: account })
        .on("transactionHash", hash => {
          // Submitted to block and received transaction hash
          // Set properties on the current transaction
          transaction.transactionHash = hash;
          transaction.status = "pending";
          transaction.recentEvent = "transactionHash";
          this.updateTransaction(transaction);
        })
        .on("confirmation", (confirmationNumber, receipt) => {
          // Update confirmation count on each subsequent confirmation that's received
          transaction.confirmationCount += 1;

          // How many confirmations should be received before informing the user
          const confidenceThreshold = 3;

          if (transaction.confirmationCount === 1) {
            // Initial confirmation receipt
            transaction.status = "confirmed";
          } else if (transaction.confirmationCount < confidenceThreshold) {
            // Not enough confirmations to match threshold
          } else if (transaction.confirmationCount === confidenceThreshold) {
            // Confirmations match threshold
            // Check the status from result since we are confident in the result
            if (receipt.status) {
              transaction.status = "success";
            } else if (!receipt.status) {
              transaction.status = "error";
            }
          } else if (transaction.confirmationCount > confidenceThreshold) {
            // Confidence threshold met
          }
          // Update transaction with receipt details
          transaction.recentEvent = "confirmation";
          this.updateTransaction(transaction);
        })
        .on("receipt", receipt => {
          // Received receipt, met total number of confirmations
          transaction.recentEvent = "receipt";
          this.updateTransaction(transaction);
        })
        .on("error", error => {
          // Errored out
          transaction.status = "error";
          transaction.recentEvent = "error";
          this.updateTransaction(transaction);
          // TODO: should this be a custom error? What is the error here?
          // TODO: determine how to handle error messages globally
          window.toastProvider.addMessage("Value change failed", {
            secondaryMessage: "Could not change value.",
            actionHref: "",
            actionText: "",
            variant: "failure"
          });
        });
    } catch (error) {
      transaction.status = "error";
      this.updateTransaction(transaction);
      // TODO: should this be a custom error? What is the error here?
      // TODO: determine how to handle error messages globally
      window.toastProvider.addMessage("Value change failed", {
        secondaryMessage: "Could not change value on smart contract",
        actionHref: "",
        actionText: "",
        variant: "failure"
      });
    }
  };

  // Create tx
  createTransaction = () => {
    let transaction = {};
    transaction.created = Date.now();
    transaction.lastUpdated = Date.now();
    transaction.status = "initialized";
    transaction.confirmationCount = 0;

    return transaction;
  };

  addTransaction = transaction => {
    const transactions = { ...this.state.transactions };
    transactions[`tx${transaction.created}`] = transaction;
    this.setState({ transactions });
  };

  // Add/update transaction in state
  updateTransaction = updatedTransaction => {
    const transactions = { ...this.state.transactions };
    const transaction = { ...updatedTransaction };
    transaction.lastUpdated = Date.now();
    transactions[`tx${updatedTransaction.created}`] = transaction;
    this.setState({ transactions });
  };

  state = {
    contract: {},
    account: null,
    accountBalance: null,
    accountBalanceLow: null,
    web3: null,
    transactions: {},
    checkPreflight: this.checkPreflight,
    initWeb3: this.initWeb3,
    initContract: this.initContract,
    initAccount: this.initAccount,
    contractMethodSendWrapper: this.contractMethodSendWrapper,
    userRejectedConnect: null,
    accountValidated: null,
    accountValidationPending: null,
    userRejectedValidation: null,
    validateAccount: this.validateAccount,
    checkNetwork: this.checkNetwork,
    requiredNetwork: {
      name: "Rinkby",
      id: 4,
    },
    currentNetwork: {},
    isCorrectNetwork: null,
  };

  componentDidMount() {
    this.checkPreflight();
  }

  render() {
    return (
      <RimbleTransactionContext.Provider value={this.state} {...this.props} />
    );
  }
}

export default RimbleTransaction;
