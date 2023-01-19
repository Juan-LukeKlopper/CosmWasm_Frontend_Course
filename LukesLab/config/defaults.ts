import { assets } from 'chain-registry';
import { AssetList, Asset } from '@chain-registry/types';

export const chainName = 'cosmwasmtestnet';
export const stakingDenom = 'umlg';
export const feeDenom = 'uand';

export const cw20ContractAddress = 'wasm1lr7rngr9x3ssgle3xv0rgtndzz05e92p6q0zlvd0w8pm8al08r0sw90t9u'

export const chainassets: AssetList = assets.find(
    (chain) => chain.chain_name === chainName
) as AssetList;

export const coin: Asset = chainassets.assets.find(
    (asset) => asset.base === stakingDenom
) as Asset;