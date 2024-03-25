export const currencyFormatter = (value: number) => {
  return new Intl.NumberFormat('en-us', {
    currency: 'usd',
    style: 'currency',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}