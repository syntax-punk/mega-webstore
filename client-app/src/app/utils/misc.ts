function getCookie(key: string): string {
  const b = document.cookie.match("(^|;)\\s*" + key + "\\s*=\\s*([^;]+)");
  const result = b?.pop() ?? "";
  return result
}

function currencyFormat(amount: number): string {
  return `$${(amount / 100).toFixed(2)}`;
}

export { 
  getCookie,
  currencyFormat
}