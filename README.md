# Art DAO

# Table of Contents
  * [Background of DAOstack](#chapter-5f0881)
  * [Help on DAOstack](#chapter-b1b53c)

Note: Generate a new chapter with `openssl rand -hex 3`

## Background of DAOstack <a id="chapter-5f0881"></a>

An introduction to DAOstack is provided by the [DAOstack primer](https://medium.com/daostack/an-explanation-of-daostack-in-fairly-simple-terms-d0e034739c5a)

This template is based on [DAOstack Hackers Kit!](https://github.com/daostack/DAOstack-Hackers-Kit)

[DAOstack](https://daostack.io) software stack is used to build Dapps (decentralized apps), DAOs (Decentralized Autonomous Organizations), and DAO tools.

Arc uses Infra to provide DAOs with voting machines and voting rights management systems.

DAOstack infrastructure resources: 

* [Infra](https://github.com/daostack/infra)
  * About - Ethereum library of Solidity smart contracts that contains decentralized governance primitives 
  * Features
    * **Voting Machine**
      * Contract to operate the voting process of a DAO.
      * Predefined rules of the governance decision making and execution process.
        * Examples:
          * "Absolute Vote" protocol (requires 51% of voting power for approval)
          * [Holographic Consensus](https://www.youtube.com/watch?v=1De0MoStSkY) voting protocol.
    * **Voting Rights Management System**
      * Distribution of voting rights
      * Stores balances that represent the voting power each participant holds
      * Manage voting rights 
        * Token-based voting (where tokens are tradable), however tokens may not be taken from users.
        * Reputation-based voting (where reputation is non-tradable) model allows reputation to be redistributed by the organisation

* [Arc](https://github.com/daostack/arc), an Ethereum library of Solidity smart contracts for building and deploying DAOs.
  * Arc Contract Components:
    * **Avatar Contract** "DAO accounts"
      * DAO account (address/assets)
    * **Reputation Contract** "DAO reputation"
      * Reputation for voting in Arc
      * Distribute and redistribute reputation only by DAO decision based on a vote to agents according to their performance and contribution to a DAO.
    * **Token Contract** "DAO token"
      * DAO token
    * **Controller Contract** "DAO access control"
      * DAO access control constraints to managing who can interact with different DAO functions.
    * **Schemes Contract** "DAO actions"
      * Controller reviews and authorises schemes (motions) that based on written proposals to help the DAO.
      * Example:
        * Propose and make investments
        * Give reputation to agents
        * Upgrade DAO contracts
        * Register new schemes and constraints.
    * **Constraint Contract** "DAO constraints"
      * Limitations on the Schemes Contract
      * Controller checks the "DAO constraints" to see if the "DAO action" violates them, and blocks the execution if it does
      * Example Constraints:
        * Token supply can't be increased over 1M tokens
        * DAO won't use more than 60% of its funds at once.
        * DAO should use a "universal" contract that has already been deployed by using [Arc.js](https://github.com/daostack/arc.js).
  * [Documentation for Arc](https://daostack.github.io/arc)
  * [Blogpost on Arc](https://medium.com/daostack/the-arc-platform-2353229a32fc) how it is built. Arc has a concept of **"universal"** Arc contracts such that they may be deployed once and used by multiple DAOs simultaneously (saves gas and deployment costs)
  * Note: Ganache addresses are based on the DAOstack commands for running and deploying Arc to a local Ganache network, which means those addresses might change if you are using a different method to run Ganache or deploy Arc.
* [Arc.js](https://github.com/daostack/arc.js)
  * About
    * JavaScript framework that facilitates access to interacting with Arc smart contracts for decentralised governance using JavaScript and TypeScript without having to interact with the Ethereum blockchain smart contracts using Solidity directly.
    * Arc.js framework facilitates development of "Dapps" (Decentralized applications) for interacting with DAOs.
  * Analogy of Arc.js:
    * Similar to how Web3.js library that serves as the connection for JavaScript/TypeScript developers to the Ethereum network.
    * Arc.js library allows developers to write scripts, applications, DAO interfaces, or any other program that can connect to Arc and deploy DAOs, interact with existing DAO capabilities, submit proposals to DAOs, vote and stake on proposals, execute the resulting decisions, manage agent reputations.
  * Features:
    * Maintains access to **"universal"** Arc contracts that have already been deployed or are listed on[this table](https://docs.google.com/spreadsheets/d/1hfR-fnnqXEn3Go3x3qoiXJcKSIAYQalSOi52vV2PCTA/edit?usp=sharing) that contains the list of addresses of the "universal" Arc contracts on the mainnet, Kovan, and Ganache. Users should use them when needed and not redeploy them.
  * [Documentation for Arc.js](https://daostack.github.io/arc.js/)
  * [Scripts in Node.js for common interaction with Arc.js](https://github.com/daostack/arc.js-scripts).
* [Alchemy](https://alchemy.daostack.io/)
  * About
    * DAOstack's built its own Dapp [Alchemy](https://alchemy.daostack.io/) for end users to interact with in collaborative budget management, decisions, and allocations in a front-end interface of DAOs using the [Holographic Consensus protocol](https://www.youtube.com/watch?v=1De0MoStSkY&feature=youtu.be&t=11m50s).
  * Used By: For creating new ways to interact with existing DAOs and DAOstack smart contracts, e.g. a multi-DAO explorer for GEN predictors or a new DAO creation app.
  * Alchemy Repo [github.com/daostack/alchemy](https://github.com/daostack/alchemy).
  * Note: A second Dapp built by DAOstack is [Vanille](http://daostack.azurewebsites.net) (enable MetaMask) that is a direct interface for the Arc.js framework, enabling users to create and interact with DAOs before moving to a dedicated interface like Alchemy. Vanille repo [here](https://github.com/daostack/vanille).
* [Genesis](https://alchemy.daostack.io/), DAOstack's own community DAO, which exists to help promote and fund the DAO ecosystem
  * The goal of DAOstack is to make it as easy as possible to create and manage DAOs, and to use them to drive a new decentralized global economy (specifically, an economy that uses [GEN, our collective attention token](https://medium.com/daostack/on-the-utility-of-the-gen-token-eb4f341d770e)).
  * **Initial DAO called "Genesis" was created with the purpose of promoting the GEN/DAO ecosystem.** Genesis is currently live on the Ethereum mainnet, has over 100 Reputation-holders who have executed over 120 proposals since August 2018, and can be accessed through ["Alchemy"](https://alchemy.daostack.io/).
  * Examples - The hackers kit is equipped with several examples and sample projects, which we are working to maintain and expand. The goal for these examples is to help developers easily kickstart a new project, as well as to demonstrate some of the features included in each layer of the DAO stack.
    * [Peep DAO](https://github.com/daostack/DAOstack-Hackers-Kit/tree/master/peepeth-dao-example) This project is a Dapp for interacting with a DAO which has its own DAO social media account on [Peepeth](Peepeth.com), a decentralized microblogging app. The Dapp allows a DAO post Peeps via a decentralized voting mechanism.
    * [DutchX DAO Bootstrap](https://github.com/daostack/DAOstack-Hackers-Kit/tree/master/dutchx-bootstrap). This project contains a minimal UI for participating in the bootstrap of the DutchX DAO. The bootstrapping process for a DAO is the process of distributing its initial reputation and tokens. The DutchX bootstrap process is a 3 months period during which users can do several actions, like locking tokens, in order to receive Reputation in the DutchX DAO. You can view the DutchX DAO bootstrapping contracts [here](https://github.com/daostack/arc/tree/master/contracts/schemes).
    * [Firestarter DAO Example](https://github.com/daostack/DAOstack-Hackers-Kit/tree/master/firestarter-example). Firestarter is a community driven crowdsourcing platform, which utilizes DaoStack for governance of the projects. This is a striped down version of the project, which only showcases the DaoStack integration.

## Help on DAOstack <a id="chapter-b1b53c"></a>

* Tech questions via Discord [at this link](https://discord.gg/cHZ8Ha9).
