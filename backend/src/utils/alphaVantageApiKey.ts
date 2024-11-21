const alphaVantageApiKeys = process.env.ALPHA_VANTAGE_API_KEYS.split(',');
let currentApiKeyIndex = 0;

export function getCurrentApiKey() {
  return alphaVantageApiKeys[currentApiKeyIndex];
}

export function switchToNextApiKey() {
  currentApiKeyIndex = (currentApiKeyIndex + 1) % alphaVantageApiKeys.length;
}
