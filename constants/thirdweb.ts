import { createThirdwebClient, getContract } from "thirdweb";
import { ethereum, sepolia } from "thirdweb/chains";
import { setThirdwebDomains } from "thirdweb/utils";

const clientId = process.env.EXPO_PUBLIC_THIRDWEB_CLIENT_ID!;

if (!clientId) {
  throw new Error(
    "Missing EXPO_PUBLIC_THIRDWEB_CLIENT_ID - make sure to set it in your .env file"
  );
}

export const client = createThirdwebClient({
  clientId,
});

export const chain = sepolia;

export const dgkTokenContract = getContract({
  client,
  address: "0xc7B40D9D5cBbE8137Af59aAEb8ab6D495826c7D4",
  chain,
});

export const priceFeedContract = getContract({
  client,
  address: "0xDE37B387871E2b83624C0ad9B5F969A3eA08fda2",
  chain,
});

export const dividendManagerContract = getContract({
  client,
  address: "0x108E568Ce1343f6858a52Ba660862Ed1fbE7D126",
  chain,
});

export const goldReserveManagerContract = getContract({
  client,
  address: "0xa62630aB71ae5059A72869149C4685F2739f5fBC",
  chain,
});
