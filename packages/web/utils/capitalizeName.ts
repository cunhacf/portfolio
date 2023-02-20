// https://github.com/fonini/jquery-capitalize/blob/master/src/jquery.capitalize.js
const capitalizeName = (name: string): string => {
  const NN_POINT = /\./g;
  const NN_POINT_SPACE = '. ';
  const NN_SPACE = ' ';
  const NN_REGEX_MULTIPLE_SPACES = /\s+/g;
  const NN_REGEX_ROMAN_NUMERAL = /^M{0,4}(CM|CD|D?C{0,3})(XC|XL|L?X{0,3})(IX|IV|V?I{0,3})$/;

  name = name.replace(NN_POINT, NN_POINT_SPACE);
  name = name.replace(NN_REGEX_MULTIPLE_SPACES, NN_SPACE);
  name = name.replace(/[A-Za-z0-9àÀâÂäÄáÁéÉèÈêÊëËìÌîÎïÏòÒôÔöÖùÙûÛüÜçÇ’ñ]*\S*/g, function(txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });

  const parts = name.split(NN_SPACE);
  const exceptions = [
    'de', 'di', 'do', 'da', 'dos', 'das', 'dello', 'della',
    'dalla', 'dal', 'del', 'e', 'em', 'na', 'no', 'nas', 'nos', 'van', 'von',
    'y',
  ];

  for (let i = 0; i < parts.length; ++i) {
    for (let j = 0; j < exceptions.length; j++) {
      if (parts[i].toLowerCase() == exceptions[j].toLowerCase()) {
        parts[i] = exceptions[j];
      }
    }

    if (parts[i].toUpperCase().match(NN_REGEX_ROMAN_NUMERAL)) {
      parts[i] = parts[i].toUpperCase();
    }
  }

  return parts.join(NN_SPACE);
};

export default capitalizeName;
