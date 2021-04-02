const urlValidator = (value, helpers) => {
  const regex = /^http(s)?:\/\/(www\.)?\S+\.\w{2,}(\S+)?$/i;
  if (regex.test(value)) {
    return value;
  }
  return helpers.error('any.invalid');
};

module.exports = urlValidator;
