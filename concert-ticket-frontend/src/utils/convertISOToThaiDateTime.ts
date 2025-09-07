export function convertISOToThaiDateTime(isoString: string): string {
    const date = new Date(isoString);
  
    const localDate = new Date(date.getTime() + 7 * 60 * 60 * 1000);
  
    const pad = (n: number) => n.toString().padStart(2, '0');
  
    const day = pad(localDate.getUTCDate());
    const month = pad(localDate.getUTCMonth() + 1);
    const year = localDate.getUTCFullYear();
    const hours = pad(localDate.getUTCHours());
    const minutes = pad(localDate.getUTCMinutes());
    const seconds = pad(localDate.getUTCSeconds());
  
    return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
  }