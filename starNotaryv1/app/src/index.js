import Web3 from "web3";
import starNotaryArtifact from "../../build/contracts/starNotary.json";

const App = {
  web3: null,
  account: null,
  meta: null,

  start: async function() {
    const { web3 } = this;

    try {
      // get contract instance
      const networkId = await web3.eth.net.getId(); //This method find the network id to retrieve the configuration from truffle-config.js file
      const deployedNetwork = starNotaryArtifact.networks[networkId]; //Retrieves the network we deployed to
      this.meta = new web3.eth.Contract( // Initialising the contract
        metaCoinArtifact.abi,
        deployedNetwork.address,
      );

      // get accounts
      const accounts = await web3.eth.getAccounts(); //getting test accounts
      this.account = accounts[0]; //assigning a test accouny

     // this.refreshBalance();
    } catch (error) {
      console.error("Could not connect to contract or chain.");
    }
  },
/*
  refreshBalance: async function() {
    const { getBalance } = this.meta.methods;
    const balance = await getBalance(this.account).call();

    const balanceElement = document.getElementsByClassName("balance")[0];
    balanceElement.innerHTML = balance;
  },

  sendCoin: async function() {
    const amount = parseInt(document.getElementById("amount").value);
    const receiver = document.getElementById("receiver").value;

    this.setStatus("Initiating transaction... (please wait)");

    const { sendCoin } = this.meta.methods;
    await sendCoin(receiver, amount).send({ from: this.account });

    this.setStatus("Transaction complete!");
    this.refreshBalance();
  }, */
 //function to update the status message in the page
  setStatus: function(message) {
    const status = document.getElementById("status");
    status.innerHTML = message;
  },
  starNameFunc: async function(){
    const { starName } = this.meta.methods; // to be able to use the functions
    const response = await starName().call(); //calling the starName property
    const owner = document.getElementById("name"); //Updating Html
    owner.innerHTML = response;
  },
  starOwnerFunc: async function(){
    const { startOwner } = this.meta.methods;
    const response = await this.starOwnerFunc().call();
    const owner = document.getElementById("owner");
    owner.innerHTML = response; 
  } ,
  claimStarFunc:  async function(){
    const { claimStar, starOwner } = this.meta.methods;
    await claimStar().send({from:this.account});
    const response = await starOwner().call();
    App.setStatus("New Star Owner is " + response + ".");
  },
  renameStarFunc: async function(){
    const {renameStar, starName} = this.meta.methods;
    const response = await starName.call();
    const owner = getElementById("renamestar");
    owner.html = response;
    updated = owner.html;
    App.setStatus("New Star Name is " + updated + ".");
  }
};

window.App = App;

window.addEventListener("load", function() {
  if (window.ethereum) {
    // use MetaMask's provider
    App.web3 = new Web3(window.ethereum);
    window.ethereum.enable(); // get permission to access accounts
  } else {
    console.warn(
      "No web3 detected. Falling back to http://127.0.0.1:8545. You should remove this fallback when you deploy live",
    );
    // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
    App.web3 = new Web3(
      new Web3.providers.HttpProvider("http://127.0.0.1:8545"),
    );
  }

  App.start();
});
