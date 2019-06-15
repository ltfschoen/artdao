// Author: Luke Schoen (refactored jQuery code into React equivalent) 2019

// IPFS registration message hash: QmWurEp6qKZxKPTSDLTiJN6qEngcbEeWNnV8b7481Te1Wf
// Your Peep DAO was deployed successfuly!
// Avatar address: 0xcb4e66eca663fdb61818d52a152601ca6afef74f
// Absolute Voting Machine address: 0x0290fb167208af455bb137780163b7b7a9a10c16

import React, { Component } from "react";
import {
  InitializeArcJs,
  LoggingService,
  LogLevel,
  DAO,
  ConfigService,
  AccountService,
  WrapperService,
  BinaryVoteResult
} from "@daostack/arc.js";
// Import truffle-contract to interact with non-ArcJS contracts
import contract from "truffle-contract";
import IPFS from "ipfs-mini";
// Import the JSON file of our PeepScheme
import peepSchemeArtifacts from "./contracts/PeepScheme.json";
import getWeb3 from "./utils/getWeb3";

import "./App.css";

// Default Avatar and Voting Machine addresses when using Ganache cli.
// TODO: Paste here your own instances addresses which can be found in the logs at the end of the migration script.
const avatarAddress = "0xcb4e66eca663fdb61818d52a152601ca6afef74f";
const votingMachineAddress = "0x0290fb167208af455bb137780163b7b7a9a10c16";

const ipfs = new IPFS({
  host: "ipfs.infura.io",
  port: 5001,
  protocol: "https"
});

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      accounts: null,
      avatarAddress: null,
      contract: null,
      peepContent: null,
      peepDAO: null,
      peepUpvotes: null,
      peepDownvotes: null,
      peepScheme: null,
      proposalId: null,
      storageValue: 0,
      totalRep: null,
      userRep: null,
      votingMachineAddress: null,
      web3: null,
    };

    this.newPeepProposalContentRef = React.createRef();
  }

  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();

      // Get the contract instance.
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = peepSchemeArtifacts.networks[networkId];

      // Initializes the PeepScheme as a contract
      // This is not a specific instance but the contract object which can be later initialized
      let PeepScheme = contract(peepSchemeArtifacts);

      const instance = new web3.eth.Contract(
        peepSchemeArtifacts.abi,
        deployedNetwork && deployedNetwork.address,
      );

      // Initialize the ArcJS library
      ConfigService.set("estimateGas", true);
      ConfigService.set("txDepthRequiredForConfirmation.kovan", 0);

      // TODO: If you use Kovan uncomment this line
      // ConfigService.set("network", "kovan"); // Set the network used to Kovan

      await InitializeArcJs({
        watchForAccountChanges: true,
        filter: {
          // If you want to use only specific Arc contracts list them here
          AbsoluteVote: true,
          DaoCreator: true,
          ControllerCreator: true,
          Avatar: true,
          Controller: true
        }
      });

      console.log("BinaryVoteResult " + BinaryVoteResult.No);

      LoggingService.logLevel = LogLevel.all; // Remove or modify to change ArcJS logging

      AccountService.subscribeToAccountChanges(() => {
        window.location.reload();
      });

      const peepDAO = await DAO.at(avatarAddress);

      const daoSchemes = await peepDAO.getSchemes(); // Returns all the schemes your DAO is registered to
      const peepSchemeAddress = daoSchemes[0].address; // Since our DAO has only 1 scheme it will be the first one

      PeepScheme.setProvider(web3.currentProvider); // Sets the Web3 Provider for a non-ArcJS contract
      const peepScheme = await PeepScheme.at(peepSchemeAddress); // Initializes a PeepScheme instance with our deployed scheme address

      // Using ArcJS to initializes our Absolute Vote contract instance with the deployed contract address
      const votingMachine = await WrapperService.factories.AbsoluteVote.at(
        votingMachineAddress
      );

      console.log('web3: ', web3);
      // Gets the user reputation and the total reputation supply
      const userAccount = web3.eth.accounts[0];
      const userRep = await this.getUserReputation(web3, peepDAO, userAccount);
      const totalRep = web3.utils.fromWei(String(await peepDAO.reputation.getTotalSupply()));

      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      this.setState({
        accounts,
        avatarAddress,
        contract: instance,
        peepDAO,
        peepScheme,
        totalRep,
        votingMachine,
        userRep,
        web3
      },
      this.runSetup
      );
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  };

  getUserReputation = async (web3, peepDAO, account) => {
    // Gets a list of the DAO participants with their reputation
    // Here we filter the list to get only the user account
    var participants = await peepDAO.getParticipants({
      participantAddress: account,
      returnReputations: true
    });
  
    // If the user is part of the DAO return its reputation
    if (participants.length > 0) {
      return web3.utils.fromWei(String(participants[0].reputation));
    }
  
    // If the user has no reputation in the DAO return 0
    return 0;
  }

  getPeepProposalsList = () => {
    const { peepScheme, votingMachine } = this.state;

    // Get all new proposal events filtered by our Avatar
    const eventFetcher = peepScheme.NewPeepProposal(
      { _avatar: avatarAddress },
      { fromBlock: 0, toBlock: "latest" }
    );
  
    eventFetcher.get(function(error, events) {
      events.reverse().forEach(event => {
        // Get the id of the created proposal
        var proposalId = event.args._proposalId;
        console.log('votingMachine: ', votingMachine);
        // If the proposal is still voteable (wasn't approved or declined yet)
        votingMachine
          .isVotable({ proposalId: proposalId })
          .then(function(isVotable) {
            if (isVotable) {
              // Gets the current votes for the proposals
              votingMachine
                .getCurrentVoteStatus(proposalId)
                .then(function(votes) {
                  // Get the hash of the Peep content saved on IPFS
                  var peepHash = event.args._peepHash;
                  // Get the content of the peep from IPFS
                  this.getPeepContentFromHash(peepHash).then(function(peepContent) {
                    // Add the peep to the proposals list
                    this.addPeepToList(proposalId, peepContent, votes);
                  });
                });
            }
          });
      });
    });
  }

  addPeepToList = (proposalId, peepContent, votes) => {
    const { web3 } = this.state;
    // The votes on a Peep should be:
    // 0 - Abstain
    // 1 - Yes
    // 2 - No
    let peepUpvotes = web3.utils.fromWei(String(votes[1]));
    let peepDownvotes = web3.utils.fromWei(String(votes[2]));

    this.setState({
      peepContent,
      peepUpvotes,
      peepDownvotes,
      proposalId
    });
  }

  // Returns a JS promise of the content of a peep by its IPFS hash
  getPeepContentFromHash = (hash) => {
    return new Promise(function(resolve, reject) {
      ipfs.catJSON(hash, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result.content);
        }
      });
    });
  }


  upvotePeep = (proposalId) => {
    const { votingMachine } = this.state;

    // Votes in favor of a proposal using the Absolute Voting Machine
    votingMachine
      .vote({ proposalId: proposalId, vote: BinaryVoteResult.Yes })
      .then(this.getPeepProposalsList());
  }

  downvotePeep = (proposalId) => {
    const { votingMachine } = this.state;

    // Votes against a proposal using the Absolute Voting Machine
    votingMachine
      .vote({ proposalId: proposalId, vote: BinaryVoteResult.No })
      .then(this.getPeepProposalsList());
  }

  proposeNewPeep = () => {
    const { avatarAddress, peepDAO, peepScheme } = this.state;

    console.log('avatarAddress', avatarAddress)
    // Get the proposal content and clears the text from the UI
    const peepContentNode = this.newPeepProposalContentRef.current;
    console.log('peepContentNode: ', peepContentNode);
  
    // Upload the proposal as a Peep to IPFS using Peepeth peep format
    ipfs.addJSON(
      {
        type: "peep",
        // FIXME - unable to get value from node
        content: peepContentNode.value,
        pic: "",
        untrustedAddress: avatarAddress,
        untrustedTimestamp: Math.trunc(new Date().getTime() / 1000),
        shareID: "",
        parentID: ""
      },
      (err, peepHash) => {
        if (err) {
          alert(err);
        } else {
          console.log('peepScheme: ', peepScheme);
          console.log('peepHash: ', peepHash);
          console.log('peepDAO: ', peepDAO);
          // Sends the new proposal to the Peep Scheme
          var newProposalTx = peepScheme
            .proposePeep(peepDAO.avatar.address, peepHash, 0, {
              gas: 300000 // Gas used by the transaction (including some safe margin)
            })
            .then(function(result) {
              // Reload the proposals list
              // Please note that on non-local networks this would be updated faster than the transaction will be included in a block
              // To see changes there you'll need to add logic to wait for confirmation or manually refresh the page when the transaction is included
              this.getPeepProposalsList();
            })
            .catch((err) => {
              console.log('error', err);
            });
        }
      }
    );
  }

  runSetup = async () => {
    // Loads the peep proposals list
    this.getPeepProposalsList();
  }

  // runExample = async () => {
  //   const { accounts, contract } = this.state;

  //   // Stores a given value, 5 by default.
  //   await contract.methods.set(5).send({ from: accounts[0] });

  //   // Get the value from the contract to prove it worked.
  //   const response = await contract.methods.get().call();

  //   // Update state with the result.
  //   this.setState({ storageValue: response });
  // };

  render() {
    const {
      avatarAddress, peepContent, peepDownvotes, peepUpvotes, proposalId,
      storageValue, totalRep, userRep, web3
    } = this.state;

    if (!web3) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }

    console.log("proposalId: ", proposalId);

    return (
      <div className="App">
        <div>The stored value is: {storageValue}</div>
        <p>The DAO Address is {avatarAddress}</p>
        <input ref={this.newPeepProposalContentRef} type="text" />
        <button onClick={this.proposeNewPeep}>Propose New Peep</button>
        <p>Your Reputation:  {userRep} rep ({(userRep / totalRep) * 100}%</p>
        Peep List Data:
        <ul>
          <li id={proposalId || "unknown"}>
            <span className="peepProposalText">
              Peep Content: {peepContent}
            </span>
            <input
              disabled={userRep > 0 ? "" : "disabled "}
              type="button"
              value="+" className="upvotePeep"
            />
            <span className="upvotesCount">
              Upvotes Count: {(peepUpvotes / totalRep) * 100}%
            </span>
            <input
              disabled={userRep > 0 ? "" : "disabled "}
              type="button"
              value="-" className="downvotePeep"
            />
            <span className="downvotesCount">
              Downvotes Count: {(peepDownvotes / totalRep) * 100}%
            </span>
            {
              proposalId ? (
                <div>
                  <button className="upvotePeep" onClick={this.upvotePeep(proposalId)}>Upvote Peep</button>
                  <button className="downvotePeep" onClick={this.downvotePeep(proposalId)}>Downvote Peep</button>
                </div>
              ) : null
            }
          </li>
        </ul>
      </div>
    );
  }
}

export default App;
