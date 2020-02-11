# Setting up Development Environment

## Install Node.js

Install Node.js by your favorite method, or use Node Version Manager by following directions at https://github.com/creationix/nvm

```bash
nvm install v4
```

## Fork and Download Repositories

To develop b4bcore-node:

```bash
cd ~
git clone git@github.com:<yourusername>/b4bcore-node.git
git clone git@github.com:<yourusername>/b4bcore-lib.git
```

To develop b4bcoin or to compile from source:

```bash
git clone git@github.com:<yourusername>/b4bcoin.git
git fetch origin <branchname>:<branchname>
git checkout <branchname>
```
**Note**: See b4bcoin documentation for building b4bcoin on your platform.


## Install Development Dependencies

For Ubuntu:
```bash
sudo apt-get install libzmq3-dev
sudo apt-get install build-essential
```
**Note**: Make sure that libzmq-dev is not installed, it should be removed when installing libzmq3-dev.


For Mac OS X:
```bash
brew install zeromq
```

## Install and Symlink

```bash
cd b4bcore-lib
npm install
cd ../b4bcore-node
npm install
```
**Note**: If you get a message about not being able to download b4bcoin distribution, you'll need to compile b4bd from source, and setup your configuration to use that version.


We now will setup symlinks in `b4bcore-node` *(repeat this for any other modules you're planning on developing)*:
```bash
cd node_modules
rm -rf b4bcore-lib
ln -s ~/b4bcore-lib
rm -rf b4bd-rpc
ln -s ~/b4bd-rpc
```

And if you're compiling or developing b4bcoin:
```bash
cd ../bin
ln -sf ~/b4bcoin/src/b4bd
```

## Run Tests

If you do not already have mocha installed:
```bash
npm install mocha -g
```

To run all test suites:
```bash
cd b4bcore-node
npm run regtest
npm run test
```

To run a specific unit test in watch mode:
```bash
mocha -w -R spec test/services/b4bd.unit.js
```

To run a specific regtest:
```bash
mocha -R spec regtest/b4bd.js
```

## Running a Development Node

To test running the node, you can setup a configuration that will specify development versions of all of the services:

```bash
cd ~
mkdir devnode
cd devnode
mkdir node_modules
touch b4bcore-node.json
touch package.json
```

Edit `b4bcore-node.json` with something similar to:
```json
{
  "network": "livenet",
  "port": 3001,
  "services": [
    "b4bd",
    "web",
    "insight-api",
    "insight-ui",
    "<additional_service>"
  ],
  "servicesConfig": {
    "b4bd": {
      "spawn": {
        "datadir": "/home/<youruser>/.b4bd",
        "exec": "/home/<youruser>/b4bcoin/src/b4bd"
      }
    }
  }
}
```

**Note**: To install services [insight-api](https://github.com/B4Bcoin/insight-api) and [insight-ui](https://github.com/B4Bcoin/insight-ui) you'll need to clone the repositories locally.

Setup symlinks for all of the services and dependencies:

```bash
cd node_modules
ln -s ~/b4bcore-lib
ln -s ~/b4bcore-node
ln -s ~/insight-api
ln -s ~/insight-ui
```

Make sure that the `<datadir>/b4b.conf` has the necessary settings, for example:
```
server=1
whitelist=127.0.0.1
txindex=1
addressindex=1
timestampindex=1
spentindex=1
zmqpubrawtx=tcp://127.0.0.1:28332
zmqpubhashblock=tcp://127.0.0.1:28332
rpcallowip=127.0.0.1
rpcuser=b4bcoin
rpcpassword=local321
```

From within the `devnode` directory with the configuration file, start the node:
```bash
../b4bcore-node/bin/b4bcore-node start
```
