function getCookie(key: string): string {
  const b = document.cookie.match("(^|;)\\s*" + key + "\\s*=\\s*([^;]+)");
  const result = b?.pop() ?? "";
  return result
}

export { getCookie }