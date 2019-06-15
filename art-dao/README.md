# ArtDAO

This project is a Dapp for reclaiming space for site-specific art. It allows an artist to create a DAO for a location. The Dapp allows the community members to make decisions on whether to fund a proposal from the artist. Their proposal would be to use that space for an event to showcase their artwork. The community members perform decentralised voting on their performance after the event.

## User Stories

### Phase 1 - Propose Art

#### Artist

* Claims a location and generates a DAO address represented by a QR code
* Generates an art proposal that contains:
  * GPS coordinates of the location
  * Sketch of the artwork at the location using augmented reality
  * Maximum artists that may occupy the location
  * Minimum art tokens required to back them
  * Does not reveal the exact location or identity of the artist
* Waits for sufficient funding threshold to back them

#### Community Member

* Pre-purchases art tokens
* Receives Dapp alert when in proximity of an art proposal
* Sends art tokens to the QR code to back the art proposal, or follows it

### Phase 2 - Build Art

* Reach threshold funding level and boosted
* Funding for proposal distributed in proportions to artist (partial pending performance) and DAO
* Push event of build status to followers and backers
* Invite followers and backers to the specific event location

### Phase 3 - Vote on Art

* Vote by followers and backers on each of the artists based on predefined criteria (location)
* Optional acquisition of art

### Phase 4 - Rotate Artists

* Artists with low votes based on performance have a proportion of their funding put toward possibly funding a replacement 

**Notice: the code here was not professionally audited and was written for the purpose of education and demonstration, please use the code with caution and don't use with real money (unless you are willing to take the associated risks)**

## Setup using React (Terminal 1)

Setup React Truffle box https://www.trufflesuite.com/boxes/react

```bash
nvm use v11.14.0
npm install -g truffle
node ~/.nvm/versions/node/v11.13.0/lib/node_modules/node/bin/truffle unbox react
npm install
```

## Run Ganache (Terminal 2 in a separate tab)

Open a separate terminal tab and run:

```bash
npm run ganache
```

## Remove Old Custom Migrations. Migrate & Deploy DAOStack Contracts. Deploy Custom Contracts. Register IPFS

Back in the original terminal run:

```bash
npm run migrate-daostack
rm -rf client/src/contracts
npm run truffle-migrate
```

Open `src/index.js` and make sure the `avatarAddress` and `votingMachineAddress` are identical to the ones found in the end of the `truffle migrate` logs output. If not, paste the correct addresses and enter the following terminal command:

* Copy the Avatar and Voting Machine addresses from the end of the `truffle migrate` logs.
* Open `src/index.js` and pasted the copied addresses in the `avatarAddress` and `votingMachineAddress`.


### Interact from UI with Ganache

* Run React app

  ```bash
  cd client
  npm run start
  ```

* Open localhost:3000

* Open your web browser and open MetaMask
* Connect to Ganache
* Refresh webpage to view changes


## Configure 

To configure different founder accounts or any other change to the DAO, go to `migrations/2_deploy_dao.js` and follow the instructions in the comments.


## Usage

1. Run the development console.
    ```bash
    truffle develop
    ```

2. Compile and migrate the smart contracts. Note inside the development console we don't preface commands with `truffle`.
    ```bash
    // inside the development console.
    compile
    migrate
    ```

3. In the `client` directory, we run the React app. Smart contract changes must be manually recompiled and migrated.
    ```bash
    cd client
    npm run start
    ```

4. Truffle can run tests written in Solidity or JavaScript against your smart contracts. Note the command varies slightly if you're in or outside of the development console.
    ```bash
    // inside the development console.
    test

    // outside the development console..
    truffle test
    ```

5. Jest is included for testing React components. Compile your contracts before running Jest, or you may receive some file not found errors.
    ```bash
    cd client
    npm run test
    ```

6. Build production
    ```bash
    cd client
    npm run build
    ```

## FAQ

* __How do I use this with the Ganache-CLI?__

    It's as easy as modifying the config file! [Check out our documentation on adding network configurations](http://truffleframework.com/docs/advanced/configuration#networks). Depending on the port you're using, you'll also need to update line 29 of `client/src/utils/getWeb3.js`.

* __Where is my production build?__

    The production build will be in the `client/build` folder after running `npm run build` in the `client` folder.

* __Where can I find more documentation?__

    This box is a marriage of [Truffle](http://truffleframework.com/) and a React setup created with [create-react-app](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md). Either one would be a great place to start!








# TODO


## How to use?

Enter the project folder from the terminal and type the following:

After downloading the project:

```
npm install
npm install -g nps
npm install -g npx
```

- _Note: to configure different founder accounts or any other change to the DAO, go to `migrations/2_deploy_dao.js` and follow the instructions in the comments._

### Run on a local testnet:

```
npm run ganache
```

Then on a different terminal window (but still in your project folder):

```
npm run migrate-daostack
rm -rf build
npm run truffle-migrate
```

Open `src/index.js` and make sure the `avatarAddress` and `votingMachineAddress` are identical to the ones found in the end of the `truffle migrate` logs output. If not, paste the correct addresses and enter the following terminal command:

```
npm run webpack
```

### Deploy and use on Kovan network:

1. Enter the `truffle.js` file and make the changes as instructed there.
2. Open `src/index.js` and uncomment the lines to configure Kovan (as instructed there).
3. Open terminal at the project folder
4. Run the following commands:

```
rm -rf build
truffle migrate --network kovan-infura
```

5. Copy the Avatar and Voting Machine addresses from the end of the `truffle migrate` logs.
6. Open `src/index.js` and pasted the copied addresses in the `avatarAddress` and `votingMachineAddress`.
7. On the terminal window, run the following command:

```
npm run webpack
```

### Use the web interface:

#### Using directly with Ganache:

- Go to `dist/index.html` and follow the instructions in the comments
- After saving the changes, just open index.html in your web browser.

#### Using with MetaMask:

1. Open terminal at the project folder
2. Run `node dist/app.js`
3. Open your web browser with MetaMask open _and connected to your configured network_
4. In your browser enter: `http://localhost:3000/`
5. Please note that here you'll need to refresh the page after submitting transactions in order to view the new state in the UI.

_Note:
After making changes in the src js files use the following command:_

```
npm run webpack
```

_Please note that the command might take a couple of minutes so be patient._


# Art Example

Art is a community driven crowdsourcing platform, which utilizes DaoStack for governance of the projects.
This is a striped down version of the project, which only showcases the DaoStack integration.

**Notice: the code here was not profesionally audited, please use the code with caution and don't use with real money (unless you are willing to take the assosiated risks)**

## How it works?
Firestarter users can supply funds to a project, project owner can withdraw those funds.
Users reputation is based on how much Ether they supplied for a given project.
Users vote on project proposals, if the proposal has majority vote the proposal passes and the funds for the proposal are transfered.

## How to use?

Enter the project folder from the terminal and type the following:

After downloading the project:

If you don't have truffle, install truffle version 5.0.0 with `npm install -g truffle@5.0.0`

After that run `npm install`

Run `truffle develop` which will start a truffle console, in that console you can run:

`migrate --reset` - This will compile and run the code in a built in truffle test blockchain
