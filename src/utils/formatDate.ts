const formatDate = (dateString: string) => {
  const date = new Date(dateString);

  const day = date.getDate();
  const month = date.toLocaleString('uk-UA', { month: 'long' });
  const year = date.getFullYear();

  return `${day} ${month} ${year}`;
};

export default formatDate;
