import React from "react";
import Web3 from "web3"; // uses latest 1.x.x version
import bowser from "bowser";

import ConnectionModalUtil from "./ConnectionModalsUtil";
import NetworkUtil from "./NetworkUtil";
import TransactionUtil from "./TransactionUtil";

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
  rejectAccountConnect: () => {},
  accountValidated: {},
  accountValidationPending: {},
  rejectValidation: () => {},
  validateAccount: () => {},
  connectAndValidateAccount: () => {}, 
  network: {
    required: {},
    current: {},
    isCorrectNetwork: null,
    checkNetwork: () => {},
  },
  modals: {
    data: {
      noWeb3BrowserModalIsOpen: {},
      noWalletModalIsOpen: {},
      connectionModalIsOpen: {},
      accountConnectionPending: {},
      userRejectedConnect: {},
      accountValidationPending: {},
      userRejectedValidation: {},
      wrongNetworkModalIsOpen: {},
      transactionConnectionModalIsOpen: {},
      lowFundsModalIsOpen: {},
    },
    methods: {
      openNoWeb3BrowserModal: () => {},
      closeNoWeb3BrowserModal: () => {},
      closeConnectionPendingModal: () => {},
      openConnectionPendingModal: () => {},
      closeUserRejectedConnectionModal: () => {},
      closeValidationPendingModal: () => {},
      openValidationPendingModal: () => {},
      closeUserRejectedValidationModal: () => {},
      closeWrongNetworkModal: () => {},
      openWrongNetworkModal: () => {},
      closeTransactionConnectionModal: () => {},
      openTransactionConnectionModal: () => {},
      closeLowFundsModal: () => {},
      openLowFundsModal: () => {},
    }
  },
  transaction: {
    data: {
      transactions: {}
    },
    meta: {
      
    },
    methods: {
      
    }
  }
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

  web3ActionPreflight = () => {
    // Is this browser compatible?
    if (!this.state.validBrowser) {  
      console.log("Invalid browser, cancelling transaction.");
      let modals = { ...this.state.modals };
      modals.data.noWeb3BrowserModalIsOpen = true;
      this.setState({ modals });
      return false;
    }

    // Is there a web3 provider?
    if (!this.state.web3) {  
      console.log("No browser wallet, cancelling transaction.");
      let modals = { ...this.state.modals };
      modals.data.noWalletModalIsOpen = true;
      this.setState({ modals });
      return false;
    }

    return true;
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
          "Non-Ethereum browser detected. Using Infura fallback."
        );

        const web3Provider = new Web3.providers.HttpProvider('https://rinkeby.infura.io:443');
        this.setState({ web3Provider });
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
    let modals = { ...this.state.modals };
    modals.data.connectionModalIsOpen = false;
    modals.data.accountConnectionPending = true;
    this.setState({ modals });

    try {
      // Request account access if needed
      await window.ethereum.enable().then(wallets => {
        const account = wallets[0];
        modals.data.accountConnectionPending = false;
        this.setState(({ account, modals }));
        
        console.log("wallet address:", this.state.account);
        
        // After account is complete, get the balance
        this.getAccountBalance();
        
        // Watch for account change
        this.pollAccountUpdates();
      });
    } catch (error) {
      // User denied account access...
      console.log("User cancelled connect request. Error:", error);

      // Reject Connect
      this.rejectAccountConnect(error);
    }
  };

  rejectAccountConnect = (error) => {
    let modals = { ...this.state.modals };
    modals.data.accountConnectionPending = false;
    modals.data.userRejectedConnect = true;
    this.setState({ modals });
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
    const accountBalanceMinimum = typeof(this.props.config) !== "undefined" && typeof (this.props.config.accountBalanceMinimum) !== "undefined"
      ?
        this.props.config.accountBalanceMinimum
      : 
        1
    // Determine if the account balance is low
    const accountBalanceLow = this.state.accountBalance < accountBalanceMinimum
      ? true : false;

    this.setState({
      accountBalanceLow
    });
  }

  validateAccount = async () => {
    console.log("validateAccount");
    // Get account wallet if none exist
    if (!this.state.account) {
      await this.initAccount();

      if (!this.state.account) {
        return;
      }
    }
    console.log("setting state to update UI");
    
    // Show blocking modal
    this.openValidationPendingModal();

    console.log("Requesting web3 personal sign");
    return window.web3.personal.sign(
      window.web3.fromUtf8(`Hi there from Rimble! To connect, sign this message to prove you have access to this account. This won’t cost you any Ether. To stop hackers pretending to be you, here’s a unique message ID they won't be able to guess: 012345`),
      this.state.account,
      (error, signature) => {
        if (error) {
          // User rejected account validation.
          console.log("Wallet account not validated. Error:", error);
          
          // Reject the validation
          this.rejectValidation(error);
        } else {
          const successMessage = "Wallet " + this.shortenHash(this.state.account) + " connected";
          console.log(successMessage, signature);
          window.toastProvider.addMessage(successMessage, {
            variant: "success"
          });

          this.closeValidationPendingModal();
          this.setState({ 
            accountValidated: true,
          });
        }
      }
    )
  }

  rejectValidation = (error) => {
    let modals = { ...this.state.modals };
    modals.data.userRejectedValidation = true;
    modals.data.accountValidated = false;
    modals.data.accountValidationPending = false;
    this.setState({ modals });
  }

  connectAndValidateAccount = async () => {
    if (!this.web3ActionPreflight()) {
      return;
    }

    // Check for account
    if (!this.state.account || !this.state.accountValidated) {
      // Show modal to connect account
      this.openConnectionModal();
    }

    // await this.initAccount();
    // await this.validateAccount();
  }

  getRequiredNetwork = () => {
    const networkId = typeof(this.props.config) !== "undefined" && typeof (this.props.config.requiredNetwork) !== "undefined"
      ?
        this.props.config.requiredNetwork
      : 
        1
    let networkName = "";
    switch (networkId) {
      case 1:
        networkName = "Main";
        break;
      case 3:
        networkName = "Ropsten";
        break;
      case 4:
        networkName = "Rinkeby";
        break;
      case 42:
        networkName = "Kovan";
        break;
      default:
        networkName = "unknown";
    }

    let requiredNetwork = {
      name: networkName,
      id: networkId
    }

    let network = { ...this.state.network };
    network.required = requiredNetwork;

    this.setState({ network })
  }

  getNetworkId = async () => {
    try {
      return this.state.web3.eth.net.getId((error, networkId) => {
        let current = { ...this.state.network.current };
        current.id = networkId;
        let network = { ...this.state.network };
        network.current = current;
        this.setState({ network });
      });
    } catch (error) {
      console.log("Could not get network ID: ", error);
    }
  }

  getNetworkName = async () => {
    try {
      return this.state.web3.eth.net.getNetworkType((error, networkName) => {
        let current = { ...this.state.network.current };
        current.name = networkName;
        let network = { ...this.state.network };
        network.current = current;
        this.setState({ network });
      });
    } catch (error) {
      console.log("Could not get network Name: ", error);
    }
  }

  checkNetwork = async () => {
    this.getRequiredNetwork();
    await this.getNetworkId();
    await this.getNetworkName();

    let network = { ...this.state.network }
    network.isCorrectNetwork = this.state.network.current.id === this.state.network.required.id
      ? true
      : false;
    
    this.setState({ network });
  }

  pollAccountUpdates = () => {
    let account = this.state.account;
    let requiresUpdate = false;
    let accountInterval = setInterval(() => {
      if (this.state.modals.data.accountValidationPending || this.state.modals.data.accountConnectionPending) {
        return;
      }
      window.ethereum.enable().then(wallets => {
        const updatedAccount = wallets[0];
        
        if (updatedAccount !== account) {
          requiresUpdate = true;
        }

        if (requiresUpdate) {
          clearInterval(accountInterval);
          let modals = { ...this.state.modals };
          modals.data.userRejectedConnect = null;
          
          this.setState({ 
            modals: modals,
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
    // Is it web3 capable?
    if (!this.web3ActionPreflight()) {
      return;
    }

    // Is it on the correct network?
    if (!this.state.network.isCorrectNetwork) {
      // wrong network modal
      this.state.modals.methods.openWrongNetworkModal();
      return;
    }

    // Is a wallet connected and verified?
    if (!this.state.account || !this.state.accountValidated) {
      this.openTransactionConnectionModal();
      return;
    }

    // Are there a minimum amount of funds?
    if (this.state.accountBalanceLow) {
      this.openLowFundsModal();
      return;
    }
    
    // Is the contract loaded?

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


  // UTILITY
  shortenHash = (hash) => {
    let shortHash = hash;
    const txStart = shortHash.substr(0, 7);
    const txEnd = shortHash.substr(shortHash.length - 4);
    shortHash = txStart + "..." + txEnd;
    return shortHash;
  }


  // CONNECTION MODAL METHODS
  closeConnectionModal = (e) => {
    if (typeof e !== "undefined") {
      e.preventDefault();
    }
    
    let modals = { ...this.state.modals };
    modals.data.connectionModalIsOpen = false;
    console.log("this.state", this.state);
    this.setState({ modals });
  }

  openConnectionModal = (e) => {
    if (typeof e !== "undefined") {
      e.preventDefault();
    }
    
    let modals = { ...this.state.modals };
    modals.data.connectionModalIsOpen = true;
    this.setState({ modals: modals });
  }

  closeConnectionPendingModal = (e) => {
    if (typeof e !== "undefined") {
      e.preventDefault();
    }
    
    let modals = { ...this.state.modals };
    modals.data.accountConnectionPending = false;
    this.setState({ modals });
  }

  openConnectionPendingModal = (e) => {
    if (typeof e !== "undefined") {
      e.preventDefault();
    }
    
    let modals = { ...this.state.modals };
    modals.data.accountConnectionPending = true;
    this.setState({ modals });
  }

  closeUserRejectedConnectionModal = (e) => {
    if (typeof e !== "undefined") {
      e.preventDefault();
    }
    
    let modals = { ...this.state.modals };
    modals.data.userRejectedConnect = false;
    this.setState({ modals });
  }

  closeValidationPendingModal = (e) => {
    if (typeof e !== "undefined") {
      e.preventDefault();
    }
    
    let modals = { ...this.state.modals };
    modals.data.accountValidationPending = false;
    modals.data.connectionModalIsOpen = false;
    modals.data.transactionConnectionModalIsOpen = false;
    this.setState({ modals });
  }

  openValidationPendingModal = (e) => {
    if (typeof e !== "undefined") {
      e.preventDefault();
    }

    let modals = { ...this.state.modals };
    modals.data.accountConnectionPending = false;
    modals.data.accountValidationPending = true;
    modals.data.userRejectedValidation = false;
    this.setState({ modals });
  }

  closeUserRejectedValidationModal = (e) => {
    if (typeof e !== "undefined") {
      e.preventDefault();
    }

    let modals = { ...this.state.modals };
    modals.data.userRejectedValidation = false;
    modals.data.connectionModalIsOpen = false;
    modals.data.transactionConnectionModalIsOpen = false;
    this.setState({ modals });
  }

  closeNoWeb3BrowserModal = (e) => {
    if (typeof e !== "undefined") {
      e.preventDefault();
    }

    let modals = { ...this.state.modals };
    modals.data.noWeb3BrowserModalIsOpen = false;
    this.setState({ modals });
  }

  openNoWeb3BrowserModal = (e) => {
    if (typeof e !== "undefined") {
      e.preventDefault();
    }

    let modals = { ...this.state.modals };
    modals.data.noWeb3BrowserModalIsOpen = true;
    this.setState({ modals });
  }

  closeNoWalletModal = (e) => {
    if (typeof e !== "undefined") {
      e.preventDefault();
    }

    let modals = { ...this.state.modals };
    modals.data.noWalletModalIsOpen = false;
    this.setState({ modals });
  }
  
  openNoWalletModal = (e) => {
    if (typeof e !== "undefined") {
      e.preventDefault();
    }

    let modals = { ...this.state.modals };
    modals.data.noWalletModalIsOpen = true;
    this.setState({ modals });
  }

  closeNoWalletModal = (e) => {
    if (typeof e !== "undefined") {
      e.preventDefault();
    }

    let modals = { ...this.state.modals };
    modals.data.noWalletModalIsOpen = false;
    this.setState({ modals });
  }
  
  openNoWalletModal = (e) => {
    if (typeof e !== "undefined") {
      e.preventDefault();
    }

    let modals = { ...this.state.modals };
    modals.data.noWalletModalIsOpen = true;
    this.setState({ modals });
  }

  closeWrongNetworkModal = (e) => {
    if (typeof e !== "undefined") {
      e.preventDefault();
    }

    let modals = { ...this.state.modals };
    modals.data.wrongNetworkModalIsOpen = false;
    this.setState({ modals });
  }
  
  openWrongNetworkModal = (e) => {
    if (typeof e !== "undefined") {
      e.preventDefault();
    }

    let modals = { ...this.state.modals };
    modals.data.wrongNetworkModalIsOpen = true;
    this.setState({ modals });
  }

  closeTransactionConnectionModal = (e) => {
    if (typeof e !== "undefined") {
      e.preventDefault();
    }

    let modals = { ...this.state.modals };
    modals.data.transactionConnectionModalIsOpen = false;
    this.setState({ modals });
  }
  
  openTransactionConnectionModal = (e) => {
    if (typeof e !== "undefined") {
      e.preventDefault();
    }

    let modals = { ...this.state.modals };
    modals.data.transactionConnectionModalIsOpen = true;
    this.setState({ modals });
  }

  closeLowFundsModal = (e) => {
    if (typeof e !== "undefined") {
      e.preventDefault();
    }

    let modals = { ...this.state.modals };
    modals.data.lowFundsModalIsOpen = false;
    this.setState({ modals });
  }
  
  openLowFundsModal = (e) => {
    if (typeof e !== "undefined") {
      e.preventDefault();
    }

    let modals = { ...this.state.modals };
    modals.data.lowFundsModalIsOpen = true;
    this.setState({ modals });
  }
  


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
    rejectAccountConnect: this.rejectAccountConnect,
    accountValidated: null,
    accountValidationPending: null,
    rejectValidation: this.rejectValidation,
    validateAccount: this.validateAccount,
    connectAndValidateAccount: this.connectAndValidateAccount,
    network: {
      required: {},
      current: {},
      isCorrectNetwork: null,
      checkNetwork: this.checkNetwork,
    },
    modals: {
      data: {
        noWeb3BrowserModalIsOpen: this.noWeb3BrowserModalIsOpen,
        noWalletModalIsOpen: this.noWalletModalIsOpen,
        connectionModalIsOpen: null,
        accountConnectionPending: null,
        userRejectedConnection: null,
        accountValidationPending: null,
        userRejectedValidation: null,
        wrongNetworkModalIsOpen: null,
        transactionConnectionModalIsOpen: null,
        lowFundsModalIsOpen: null,
      },
      methods: {
        openNoWeb3BrowserModal: this.openNoWeb3BrowserModal,
        closeNoWeb3BrowserModal: this.closeNoWeb3BrowserModal,
        openNoWalletModal: this.openNoWalletModal,
        closeNoWalletModal: this.closeNoWalletModal,
        closeConnectionModal: this.closeConnectionModal,
        openConnectionModal: this.openConnectionModal,
        closeConnectionPendingModal: this.closeConnectionPendingModal,
        openConnectionPendingModal: this.openConnectionPendingModal,
        closeUserRejectedConnectionModal: this.closeUserRejectedConnectionModal,
        closeValidationPendingModal: this.closeValidationPendingModal,
        openValidationPendingModal: this.openValidationPendingModal,
        closeUserRejectedValidationModal: this.closeUserRejectedValidationModal,
        closeWrongNetworkModal: this.closeWrongNetworkModal,
        openWrongNetworkModal: this.openWrongNetworkModal,
        closeTransactionConnectionModal: this.closeTransactionConnectionModal,
        openTransactionConnectionModal: this.openTransactionConnectionModal,
        closeLowFundsModal: this.closeLowFundsModal,
        openLowFundsModal: this.openLowFundsModal,
      }
    },
    transaction: {
      data: {
        transactions: null
      },
      meta: {
        
      },
      methods: {
      }
    }
  };

  componentDidMount() {
    this.checkPreflight();
  }

  render() {
    return (
      <div>
        <RimbleTransactionContext.Provider value={this.state} {...this.props} />
        <ConnectionModalUtil 
          initAccount={this.state.initAccount} 
          account={this.state.account} 
          validateAccount={this.state.validateAccount} 
          accountConnectionPending={this.state.accountConnectionPending} 
          accountValidationPending={this.state.accountValidationPending} 
          accountValidated={this.state.accountValidated} 
          network={this.state.network} 
          modals={ this.state.modals } 
        />
        <NetworkUtil
          network={this.state.network}
          web3={this.state.web3}
        />
        <TransactionUtil
          transaction={ this.state.transaction }
        />
      </div>
      
    );
  }
}

export default RimbleTransaction;
