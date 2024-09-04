export function formatDate(dateString: string): any {
  const date = new Date(dateString)

  const timeOptions: Intl.DateTimeFormatOptions = {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  }

  const dateOptions: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }

  return {
    time: date.toLocaleString('en-US', timeOptions),
    date: date.toLocaleString('en-US', dateOptions),
  }
}
