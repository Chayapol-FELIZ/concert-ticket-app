export function formatNumber(number: number) {
    return new Intl.NumberFormat('th-TH').format(number);
};