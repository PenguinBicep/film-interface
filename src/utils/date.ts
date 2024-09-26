export function timeElapsed(isoDateString: string) {
  // @ts-expect-error just handling dates
  const timeDifference = new Date() - new Date(isoDateString);

  const hoursDifference = timeDifference / (1000 * 60 * 60);

  if (hoursDifference >= 24) {
    const daysDifference = Math.floor(hoursDifference / 24);
    return `${daysDifference} jour(s)`;
  }
  if (hoursDifference >= 1) {
    const roundedHours = Math.floor(hoursDifference);
    return `${roundedHours} heure(s)`;
  }
  const minutesDifference = Math.floor(timeDifference / (1000 * 60));
  return `${minutesDifference} minute(s)`;
}
