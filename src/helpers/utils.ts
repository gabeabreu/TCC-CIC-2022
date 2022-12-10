export function debounce(fn: Function, ms = 300) {
  let timeoutId: ReturnType<typeof setTimeout>;
  return function (this: any, ...args: any[]) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn.apply(this, args), ms);
  };
}

export function formatAddres(address: string) {
  return `${address?.substring(0, 5)}...${address?.substring(address.length - 5, address.length)}`;
}
