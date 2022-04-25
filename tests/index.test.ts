import {GetUniswapV3Price} from '../src';
import Web3 from 'web3';
import { get } from 'env-var';
import {expect} from 'chai';

describe('Uniswap V3 token pair price', (): void => {
    const env = (key: string, required = true) => get(key).required(required);
    const web3Provider = new Web3.providers.WebsocketProvider(env('INFURA_ENDPOINT').asString());
    const web3 = new Web3(web3Provider);

    it('Can extract the WBTC/USDT price', async (): Promise<void> => {
        const poolAddress = '0x9db9e0e53058c89e5b94e29621a205198648425b';
        const numberOfDecimalsToken1 = 8;
        const numberOfDecimalsToken2 = 6;

        const WBTCPrice = await GetUniswapV3Price({
            web3,
            poolAddress,
            numberOfDecimalsToken1,
            numberOfDecimalsToken2,
        });

        expect(String(WBTCPrice)).not.to.be.empty;
    });
});
