Assignment - 
The objective of this exercise were as follows:
1. Create a functional relayer
2. Demonstrate understanding of the core components - Queue, Network Interaction, transaction Sending & Tracking

The Biconomy relayer-node has been used as the base for this exercise.
1. The relayer (originally) supports three types of transaction relays - i) ERC4337 Compliant - AA | ii) Biconomy Smart Contract Wallet related | iii) Cross Chain with integrations to Wormhole and Axelar

Following are the core components in the entire flow:
1. Server- It has a server which receives the transactions, identifies the transaction type and routes to the transactionHandler
2. Transaction Sservice - with a transaction listener. It is used to create, execute and send a transaction and notify retry attempts.
3. Network Service - connects to the blockchain via a Json rpcUrl
4. Relayer Manager with load distribution algorithm based on strategy of sorting by balance and sorting by least pending count to allocate the transaction in queue to it
5. Database Service - Redis for creating and maintaining a cache with information such as transactionId: retryCount | MongoDb for storing the transactions by Id and keeping their status and state and utilising it for resubmission based on transactionListener service
6. Gas Price Service - managing, calculating and modifying gas limits when making retry attempts

In addition, there were FeeOptions, Notification Manager and Smart Contract Wallet components - which were more relevant to Biconomoy's specific use case.
These have been removed.

The current submission allows for two of the flows:
1. AA flow
2. Cross Chain Transaction flow (Incomplete)

Requirements:
1. Need wssUrl & httpUrl to replace the existing static config mentions


########################################################################################
########################################################################################
# Relayer Node

The Relayer Node is responsible for validating transactions, paying their gas fees, and sending them to the network.
Relayers allow you to send transactions and take care of transaction sending, nonce management, gas pricing estimation, and resubmissions. This way you don’t need to worry about monitoring transactions to ensure they get mined.
The Relayer infrastructure composes of multiple EOAs on each chain. Every relayer has an inbuilt auto-scaling functionality. Thus in cases of a high load of transactions, the relayer infra can spin up additional relayers to handle this. A socket server is attached to the relayer node via which one can subscribe and get updates on the transaction events like transaction hash generated, transaction mined, etc.

<div>
    <a href="https://opensource.org/licenses/GPL-3.0"><img src="https://img.shields.io/badge/license-GPL--v3-blueviolet"/></a>
</div>


## Local deployment 

### Requirements:

- Rabbitmq: https://www.rabbitmq.com/
- Centrifugo: https://github.com/centrifugal/centrifugo
- Redis: https://redis.io

For centrifugo use the following base configuration file
```
{
  "token_hmac_secret_key": "averystrongsecret",
  "admin_password": "usedIfAdminSetToTrue",
  "admin_secret": "averystrongsecretforadmin",
  "api_key": "usedforpostapi",
  "allowed_origins": ["*"],
  "debug": true,
  "admin": true,
  "log_level": "debug",
  "client_anonymous": true,
  "client_channel_limit": 512,
  "namespaces": [
    {
      "name": "relayer",
      "publish": true,
      "history_size": 10,
      "history_ttl": "300s",
      "recover": true,
      "anonymous": false
    },
    {
      "name": "transaction",
      "publish": true,
      "history_size": 10,
      "history_ttl": "300s",
      "recover": true,
      "anonymous": true
    }
  ]
}
```

## Steps to run the project

1. Clone the project

```jsx
git clone https://github.com/bcnmy/relayer-node.git
```

2. Checkout to the main branch

```jsx
git checkout main
```

3. Install dependencies. Make sure node version is 16 or above.
```jsx
yarn install
```

4. Check if config.json.enc file exists in the config folder at the root of the repository. If not or if you want to make any changes in the configuration. Create a file config.json in the config folder. You can use the template shown below for local deployment or find the config-example.json file in the folder.

```jsx
{
  "slack": {
    "token": "",
    "channel": ""
  },
  "dataSources": {
    "mongoUrl": "",
    "redisUrl": ""
  },
  "socketService": {
    "token": "",
    "apiKey": ""
  },
  "relayer": {
    "nodePathIndex": 0
  },
  "queueUrl": "",
  "simulationData": {
    "tenderlyData": {
      "tenderlyUser": "",
      "tenderlyProject": "",
      "tenderlyAccessKey": ""
    }
  },
  "chains": {
    "provider": {
      "5": "",
      "137": "",
      "80001": "",
      "97": "",
      "420": "",
      "421613": "",
      "43113": ""
    }
  },
  "relayerManagers": [{
    "relayerSeed": "",
    "ownerAccountDetails": {
      "5": {
        "publicKey": "",
        "privateKey": ""
      },
      "137": {
        "publicKey": "",
        "privateKey": ""
      },
      "80001": {
        "publicKey": "",
        "privateKey": ""
      },
      "97": {
        "publicKey": "",
        "privateKey": ""
      },
      "420": {
        "publicKey": "",
        "privateKey": ""
      },
      "421613": {
        "publicKey": "",
        "privateKey": ""
      },
      "43113": {
        "publicKey": "",
        "privateKey": ""
      }
    }
  }],
  "tokenPrice": {
    "coinMarketCapApi": ""
  }
}


```
Create a .env file and add the following:

```jsx
CONFIG_PASSPHRASE=passphrase
```

Now To update the config.json.enc file: 

```jsx
CONFIG_PASSPHRASE=passphrase ts-node encrypt-config.ts
```

5. To update the configuration for chain specific parameters (provider url, currency, decimals), relayer manager, fee options, and transactions use static-config.json in the config folder.  

6. Run the following code to start the project.
```jsx
yarn run build && yarn run start
```

