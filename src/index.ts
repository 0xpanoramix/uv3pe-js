import * as uv3pool from './uniswapv3pool.json';
import Web3 from 'web3';
import JSBI from 'jsbi';
import { AbiItem } from 'web3-utils';

export interface Params {
    web3: Web3;
    poolAddress: string;
    numberOfDecimalsToken1: number;
    numberOfDecimalsToken2: number;
}

export async function GetUniswapV3Price({web3, poolAddress, numberOfDecimalsToken1, numberOfDecimalsToken2} : Params): Promise<JSBI> {
    let multiplier = 1;

    // Instantiate the UniswapV3Pool contract using the provided address.
    const contract = new web3.eth.Contract(uv3pool.abi as never as AbiItem[], poolAddress);

    // Get the contract's members.
    const slot0 = await contract.methods.slot0().call();
    const sqrtPriceX96 = slot0['sqrtPriceX96'] as number;

    for (let i = 0; i < numberOfDecimalsToken1 - numberOfDecimalsToken2; i++) {
        multiplier *= 10;
    }

    return JSBI.multiply(
        JSBI.exponentiate(
            JSBI.divide(
                JSBI.BigInt(sqrtPriceX96 * sqrtPriceX96),
                JSBI.BigInt(2)),
            JSBI.BigInt(192),
            ),
        JSBI.BigInt(multiplier)
    );
}
