storeSnippet({"id":86,"name":"toggle() - Toggling Array Values","description":"If specific values are in an array they are removed but if they are not in the array they are added.","js":"function toggle(array, valuesToToggle, opt_fnTestEquality) {\r\n  array = slice(array);\r\n  valuesToToggle = slice(valuesToToggle);\r\n  for (var j, i = array.length, valuesCount = valuesToToggle.length; i--;) {\r\n    for (j = valuesCount; j--;) {\r\n      if (opt_fnTestEquality ? opt_fnTestEquality(array[i], valuesToToggle[j]) : (array[i] === valuesToToggle[j])) {\r\n        array.splice(i, 1);\r\n        valuesToToggle.splice(j, 1);\r\n        valuesCount--;\r\n      }\r\n    }\r\n  }\r\n  return array.concat(valuesToToggle);\r\n}","post":"<h2><code>toggle(...)<\/code> API Documentation<\/h2>\r\n<div style=\"margin: 0 30px 30px\">\r\n  <div>Toggles values in an array, adding the values that are missing from the array and removing those that are there.<\/div>\r\n  \r\n  <h3>Parameters<\/h3>\r\n  <ol>\r\n    <li>\r\n      <b><code>array<\/code> {Array}:<\/b><br \/>\r\n      The array whose values should be toggled.  A copy of this array with the values toggled will be returned.\r\n    <\/li>\r\n    <li>\r\n      <b><code>valuesToToggle<\/code> {Array}:<\/b><br \/>\r\n      The array of values to either add to (if they are present) or remove from (if they are missing) <code>array<\/code>.\r\n    <\/li>\r\n    <li>\r\n      <b><code>opt_fnTestEquality<\/code> {Function}:<\/b><br \/>\r\n      Optional.  If not given strict equality (<code>===<\/code>) will be used to compare values.  If specified, this function will be used to determine if two values are equal.  The first argument will be the value within <code>array<\/code> to be tested and the second will be the value within <code>valuesToToggle<\/code> to be tested.\r\n    <\/li>\r\n  <\/ol>\r\n  \r\n  <h3>Returns<\/h3>\r\n  <div>A duplicate of <code>array<\/code> with the common values of <code>valuesToToggle<\/code> removed and the missing values added.<\/div>\r\n<\/div>","required_ids":{},"tags":["Array"],"variables":["toggle"]});