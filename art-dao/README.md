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

## Setup using React

Setup React Truffle box https://www.trufflesuite.com/boxes/react

```
nvm use v11.14.0
node ~/.nvm/versions/node/v11.13.0/lib/node_modules/node/bin/truffle unbox react
```
