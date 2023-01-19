import { Contract, getMnemonic } from "./helpers/utils";
import { connect } from "./helpers/connect";
import { malagaConfig } from "./networks";
import { hitFaucet } from "./helpers/hitFaucet";
import { uploadContracts } from "./helpers/uploadContracts";
import { initToken } from "./helpers/initToken";

const contracts: Contract[] = [
  {
    name: "cw20_base",
    wasmFile: "./contracts/cw20_base.wasm",
  },
];

async function main(): Promise<void> {
  
  // Get mnemonic from env
  const mnemonic = getMnemonic();

  // get client
  const { client, address } = await connect(mnemonic, malagaConfig);

  // check if wallet is funded
  const { amount } = await client.getBalance(address, malagaConfig.feeToken);

  // call faucet
  if (amount === "0") {
    console.warn("Wallet is not funded. Funding wallet...");
    await hitFaucet(address, malagaConfig.feeToken, malagaConfig.faucetUrl);

    const { amount }  = await client.getBalance(address, malagaConfig.feeToken);
    console.log(`Wallet is funded with ${amount} ${malagaConfig.feeToken}`);
  }

  // upload contract
  const codeID = await uploadContracts(client, address, contracts);


  // instantiate contract
  const contractAddress = await initToken(client, address, codeID.cw20_base);

  console.log(`Contract address: ${contractAddress}`);
}

main().then(
  () => {
    process.exit(0);
  },
  (error) => {
    console.error(error);
    process.exit(1);
  }
);