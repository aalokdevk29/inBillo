const isDateBetween = (from, to, date) => {
  const fDate = Date.parse(from);
  const lDate = Date.parse(to);
  const cDate = Date.parse(date);

  return cDate <= lDate && cDate >= fDate;
};

module.exports = { isDateBetween };
