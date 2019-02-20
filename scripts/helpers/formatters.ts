export const date = (value: string | Date, time=true, lang='en') =>
  new Date(value)
    .toLocaleDateString(
      lang === 'fr' ? 'fr-CA' : 'en-us',
      Object.assign(
        {
          year: 'numeric',
          month: 'short',
          day: 'numeric'
        },
        time
          ? {
              hour: '2-digit',
              minute: '2-digit'
            }
          : {}
      )
    )
    .replace(/,/g, '')


export const money = (value: number, currency?: string) => 
  `$${(value / 100).toFixed(2)}${currency ? ` ${currency}` : ''}`
