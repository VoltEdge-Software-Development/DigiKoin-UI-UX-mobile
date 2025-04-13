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

/**
 * Formats a BigInt value with decimal places after division
 * @param value - The BigInt value to format
 * @param divisor - The BigInt divisor (e.g., 100000000n for 8 decimals)
 * @param decimals - Number of decimal places to show (default: 3)
 * @returns Formatted string with whole number and decimal parts
 */
export function formatBigIntDivision(
  value: bigint,
  divisor: bigint,
  decimals: number = 3
): string {
  // Validate inputs
  if (decimals < 0) throw new Error("Decimals must be >= 0");
  if (divisor === 0n) throw new Error("Divisor cannot be zero");

  // Calculate whole number part
  const quotient = value / divisor;

  // Calculate remainder and scale it for decimals
  const remainder = value % divisor;
  const scaleFactor = 10n ** BigInt(decimals);
  const scaledRemainder = (remainder * scaleFactor) / divisor;

  // Format decimal part with leading zeros
  const decimalStr = scaledRemainder.toString()
    .padStart(decimals, '0')       // Pad with leading zeros
    .slice(0, decimals);           // Ensure exact decimal places

  return `${quotient}.${decimalStr}`;
}