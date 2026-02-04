
const CURRENCY_FORMATTER = new Intl.NumberFormat(undefined, {
    currency: "KRW",
    style: "currency",
    minimumFractionDigits: 0,
});

export function formatCurrency(number) {
    return CURRENCY_FORMATTER.format(number);
}
