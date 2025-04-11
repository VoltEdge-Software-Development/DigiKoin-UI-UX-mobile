import { TROY_OUNCE_IN_GRAMS_E8 } from "@/constants";
import { toWei } from "thirdweb";

/**
 * Calculates the equivalent ETH amount for a given gold weight in grams
 * @param grams - Weight of gold in grams
 * @param xauUsdPrice - Current gold price per troy ounce in USD
 * @param ethUsdPrice - Current ETH price in USD
 * @returns Equivalent ETH amount (with 18 decimal precision like Ethereum)
 */
export function calculateEthFromGold(
  grams: string,
  xauUsdPrice: bigint,
  ethUsdPrice: bigint
): bigint {
  // Convert grams to BigInt with proper scaling (grams * 1e18 * 1e10)
  const gramsScaled = toWei(grams) * 10n ** 8n;

  // Convert grams to troy ounces
  const troyOunces = gramsScaled / TROY_OUNCE_IN_GRAMS_E8;

  // Calculate USD value of the gold
  const goldValueUsd = troyOunces * xauUsdPrice;

  // Calculate equivalent ETH amount
  const ethAmount = goldValueUsd / ethUsdPrice;

  return ethAmount;
}