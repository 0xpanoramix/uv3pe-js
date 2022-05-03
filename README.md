# uv3pe-js

This package lets you retrieve the price of a token in an Uniswap V3 token pair.
For example, you can get the price of one WBTC in the WBTC/USDT pool.

## How does it work ?

It instantiates the UniswapV3Pool of the two tokens, located at a provided address on the Ethereum blockchain.

Then, it retrieves the price from the smart contract storage and perform weird computation so that you can use the decimal price in your project !

## Getting started !

### Installation

You just have to run the following command:

```shell
yarn add uv3pe-js
```

### Quickstart

You must have a running web3 instance. Then provide the pool address and the number of decimals of both tokens, that [you can retrieve here](https://etherscan.io/tokens).
```typescript
const poolAddress = '0x9db9e0e53058c89e5b94e29621a205198648425b';
const numberOfDecimalsToken1 = 8;
const numberOfDecimalsToken2 = 6;

const WBTCPrice = await GetUniswapV3Price({
    web3,
    poolAddress,
    numberOfDecimalsToken1,
    numberOfDecimalsToken2,
});
```

Output:
```typescript
console.log(WBTCPrice); // ---> 39300
```

## Author

Made with ❤️ by 🤖 [Luca Georges François](https://github.com/0xpanoramix) 🤖
