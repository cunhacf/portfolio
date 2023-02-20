const formatDate = (timestamp: number, locale = 'pt-BR'): string => {
  const date = new Date(timestamp);
  const dateFormatted = date.toLocaleDateString(locale);
  const timeFormatted = date.toLocaleTimeString(locale, { hour: '2-digit', minute: '2-digit' });

  return `${dateFormatted} às ${timeFormatted}`;
};

export default formatDate;
