<h1 align="center">Welcome to CardanoBot 👋</h1>
<p>
  <img alt="Version" src="https://img.shields.io/badge/version-0.1.0-blue.svg?cacheSeconds=2592000" />
  <a href="#" target="_blank">
    <img alt="License: mit" src="https://img.shields.io/badge/License-mit-yellow.svg" />
  </a>
  <a href="https://twitter.com/cardano\_sense" target="_blank">
    <img alt="Twitter: cardano\_sense" src="https://img.shields.io/badge/Domo%20Arigato%2C-Mr.%20Roboto!-blueviolet" />
  </a>
</p>

> Robot controlled by metatdata posted to the Cardano blockchain

## Install

```sh
npm install
```

## Usage

```sh
npm start
```
## YOU DO NOT  INSTALL THIS REPO TO USE THE ROBOT
```diff
+ I am just using this space to explain how working the robot works, you do not need to install this repo - you need to SEND METADATA to the Cardano blockchain to control the robot.
```

# What the hell is this?
This was a way for me to try and justify buying a robot I haven't used in a while / finding a unique use case for the Cardano blockchain, specifically the metadata.

# What can I do?
You can drive my robot around by posting metadata to the Cardano blockchain.
# Where do I go to see this so-called robot?
This is the address to the live cam:

(If this address is not working, the demo period is over... we needed the dining room back!!)

# How do I do this?
I am assuming you know how to post metadata to the Cardano blockchain. It is beyond the scope of this readMe to explain how to do that - With that said, here is a sample of the code needed to post metadata if you are running a node. This was kindly provided to me by Cardano community member "TheRealAdamDean" long before I ventured onto this project:
```
```
## get protocol parameters
```
cardano-cli query protocol-parameters \
  --allegra-era \
  --mainnet \
  --out-file protocol.json

```
## get the transaction hash and index of the utxo to spend
```
cardano-cli query utxo \
  --address $(cat payment.addr) \
  --allegra-era \
  --mainnet

```
## Draft the transaction
```
cardano-cli transaction build-raw \
--tx-in b868473668a88189ef648******6f85d6cd147c3581d5066a03ee914d8697f44#0 \
--tx-out $(cat payment.addr)+0 \
--metadata-json-file robot.json \
--ttl 0 \
--fee 0 \
--out-file tx.draft

```
## Calculate fee
```
cardano-cli transaction calculate-min-fee \
--tx-body-file tx.draft \
--tx-in-count 1 \
--tx-out-count 1 \
--witness-count 1 \
--byron-witness-count 0 \
--mainnet \
--protocol-params-file protocol.json

```
## calculate change 
```
expr <UTXO BALANCE> - <AMOUNT TO SEND> - <TRANSACTION FEE>

```
## Determine the TTL for the transaction
```
cardano-cli query tip --mainnet

```
## build the transaction
```
cardano-cli transaction build-raw \
--tx-in b868473668a88189ef648******6f85d6cd147c3581d5066a03ee914d8697f44#0 \
--tx-out $(cat payment.addr)+2177708 \
--metadata-json-file robot.json \
--ttl 20599000 \
--fee 184553 \
--out-file tx.raw

```
## Sign the transaction
```
cardano-cli transaction sign \
--tx-body-file tx.raw \
--signing-key-file payment.skey \
--mainnet \
--out-file tx.signed

```
## Submit the transaction
```
cardano-cli transaction submit \
--tx-file tx.signed \
--mainnet
```
# Instructions
The best thing to do is to watch my video:

Here is the metadata template, change the variables to make the robot do different things. DO NOT CHANGE THE ID NUMBER AT THE TOP OF THE METADATA OR THE ROBOT WILL NOT WORK,
```
{
  "171411419": {
    "movement": {
      "drive": {
        "turnToTheRight": "false",
        "turnToTheLeft": "false",
        "goForward": "true",
        "goBackward": "false",
        "duration": "1000"
      },
      "moveArms": {
        "leftArmPosition": "",
        "rightArmPosition": ""
      },
      "moveHead": {
        "pitch": "",
        "roll": "",
        "yaw": ""
      }
    },
    "expression": {
      "changeLed": {
        "red": "6",
        "blue": "6",
        "green": "45"
      },
      "setBlinking": "false",
      "setFlashLight": "false"
    }
  }
}
```
All of the commands except the drive commands are explained at the official Misty website api page here:

http://sdk.mistyrobotics.com/api-explorer/index.html

I had to simplify the drive command because there were just to many options to keep it simple - you will see what I mean if you look at the api's at the api page listed above.

I am expecting you watched the video and looked at the api's - I will do my best to explain everything but the video and looking at Misty's api's are really a pre-requisite.

## Turn radius information
To turn the robot 90 degrees it takes about 4500 ms

To turn the robot 180 degrees it takes about 6300 ms

To turn the robot 270 degrees it takes about 7750 ms

To turn the robot 360 degrees it takes about 8700 ms
## Precautions
You can only have one 'true' expression at a time in the drive part of the metadata.
If the robot does not move for some reason there are 2 ways you can check and see if you posted the metadata correctly.

1) The data you posted will still show in the information on the side of the live stream if you posted it correctly.

2) You can also go to this address and post add this snippet on the left hand side of the playground and press the arrow. 

https://graphql-api.mainnet.dandelion.link/
```
  {
    transactions(where: { metadata: { key: { _eq: "171411419" } } }) {
      metadata {
        key
        value
      }
    }
  }
```
If your metadata was entered correctly, you will see it posted as the last entry (scroll down)


# Last words
To borrow an expression from out great Project Catalyst leader 'Dor', "This is an experiment"... and to add some words of my own, "Don't be surprised if it doesn't work". I am not developer, I am more of a hacker... but not the cool kind with a hoodie. I am more of the, "guy in the woods with a machete", kind of hacker. 

# Good luck!


## Author

👤 **Anthony Stachowitz**

* Website: thecardanofund.com
* Twitter: [@cardano\_sense](https://twitter.com/cardano\_sense)
* Github: [@stackBlock](https://github.com/stackBlock)
* LinkedIn: [@anthony-stachowitz-7b4b6937](https://linkedin.com/in/anthony-stachowitz-7b4b6937)

## Show your support

Give a ⭐️ if this project helped you!

***
_This README was generated with ❤️ by [readme-md-generator](https://github.com/kefranabg/readme-md-generator)_