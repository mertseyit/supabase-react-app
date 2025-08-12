const dateFormater = (isoString) => {
  const date = new Date(isoString);

  const options = {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  };

  return date.toLocaleString('tr-TR', options).replace(/\./g, '');
};

export default dateFormater;
