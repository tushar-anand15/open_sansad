import { format, formatDistanceToNow } from 'date-fns';

// Date formatters
export function fDate(date: string | Date, newFormat?: string) {
  const fm = newFormat || 'dd MMM yyyy';
  return date ? format(new Date(date), fm) : '';
}

export function fDateTime(date: string | Date, newFormat?: string) {
  const fm = newFormat || 'dd MMM yyyy p';
  return date ? format(new Date(date), fm) : '';
}

export function fTimestamp(date: string | Date) {
  return date ? new Date(date).getTime() : 0;
}

export function fToNow(date: string | Date) {
  return date
    ? formatDistanceToNow(new Date(date), {
        addSuffix: true,
      })
    : '';
}

// Number formatters
export function fNumber(number: string | number) {
  return Number(number).toLocaleString();
}

export function fCurrency(number: string | number) {
  const format = Number(number).toLocaleString('en-IN', {
    style: 'currency',
    currency: 'INR',
  });

  return format;
}

export function fPercent(number: number) {
  return Number(number).toFixed(2) + '%';
}

export function fShortenNumber(number: string | number) {
  const format = (num: number) => {
    if (num >= 10000000) {
      return `${(num / 10000000).toFixed(2)}Cr`;
    }
    if (num >= 100000) {
      return `${(num / 100000).toFixed(2)}L`;
    }
    if (num >= 1000) {
      return `${(num / 1000).toFixed(2)}K`;
    }
    return num.toString();
  };

  return format(Number(number));
}

export function fData(number: string | number) {
  const format = (num: number) => {
    if (num >= 1073741824) {
      return `${(num / 1073741824).toFixed(2)} GB`;
    }
    if (num >= 1048576) {
      return `${(num / 1048576).toFixed(2)} MB`;
    }
    if (num >= 1024) {
      return `${(num / 1024).toFixed(2)} KB`;
    }
    return `${num} bytes`;
  };

  return format(Number(number));
}
