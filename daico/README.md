# DAICO - Responsible Decentralized Fund Raising

<ADD-DESCRIPTION>

**Notice: the code here was not profesionally audited, please use the code with caution and don't use with real money (unless you are willing to take the assosiated risks)**

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

Then on a different terminal window (but still in your project folder) you can choose one of the 2:

1. Run all work with one command:
```
npm run launch-local
```

2. Run the commands one by one as follows:

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

_Note:
After making changes in the src js files use the following command:_

```
npm run webpack
```

_Please note that the command might take a couple of minutes so be patient._
