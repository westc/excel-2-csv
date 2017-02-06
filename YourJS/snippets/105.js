storeSnippet({"id":105,"name":"count()","description":"Count the items in an array or an object or count the characters in a string.","js":"function count(subject, opt_fnFilter) {\r\n  opt_fnFilter = getSimpleCallback(opt_fnFilter);\r\n  var count = 0, noFilter = arguments.length < 2, isStr = typeOf(subject, 'String');\r\n  if (noFilter && isStr) {\r\n    return subject.length;\r\n  }\r\n  walk(isStr ? subject.split('') : subject, function() {\r\n    count += noFilter || !!opt_fnFilter.apply(this, arguments);\r\n  });\r\n  return count;\r\n}","post":"<h2><code>count(...)<\/code> API Documentation<\/h2>\r\n<div style=\"margin: 0 30px 30px\">\r\n  <div>Count the items in an array or an object or count the characters in a string.<\/div>\r\n  \r\n  <h3>Parameters<\/h3>\r\n  <ol>\r\n    <li>\r\n      <b><code>subject<\/code> {Array|Object|string}:<\/b><br \/>\r\n      The array, object or string to count parts of.\r\n    <\/li>\r\n    <li>\r\n      <b><code>opt_fnFilter<\/code> {Function}:<\/b><br \/>\r\n      <div>Optional.  If specified, this function will be called for each item (or character in the case that <code>subject<\/code> is a string) of <code>subject<\/code>.  This function will be passed the following arguments:<\/div>\r\n      <ol>\r\n        <li>\r\n          <b><code>value<\/code> {*}:<\/b><br \/>\r\n          In the case that <code>subject<\/code> is an array or an object this will be an individual value defined.  In the case that <code>subject<\/code> is a string this will be a single character.\r\n        <\/li>\r\n        <li>\r\n          <b><code>key<\/code> {number|string}:<\/b><br \/>\r\n          In the case that <code>subject<\/code> is an array or a string this will be the index of the <code>value<\/code>.  In the case that <code>subject<\/code> is an object this will be key of the <code>value<\/code>.\r\n        <\/li>\r\n        <li>\r\n          <b><code>subject<\/code> {Array|Object|string}:<\/b><br \/>\r\n          The <code>subject<\/code> passed into <code>count()<\/code>.\r\n        <\/li>\r\n      <\/ol>\r\n      <div>The return value of this function will be evaluated to determine whether or not to count the item in question.  A <code class=\"language-javascript\">true<\/code>-ish value will cause the item to be counted.<\/div>\r\n    <\/li>\r\n  <\/ol>\r\n  \r\n  <h3>Returns<\/h3>\r\n  <div>The number of items counted.  If no <code>opt_fnFilter<\/code> is given all items in <code>subject<\/code> will be counted.<\/div>\r\n<\/div>\r\n\r\n<h2>Example<\/h2>\r\n```javascript\r\nconsole.log(count(new Array(36)));  \/\/ -> 0\r\nconsole.log(count({fName:'Chris',lName:'West'}));  \/\/ -> 2\r\nconsole.log(count('hello'));  \/\/ -> 5\r\nconsole.log(count([3,'sd',null,undefined]));  \/\/ -> 4\r\n```","required_ids":{"20":"walk() - Traverse Array\/Object Values","109":"getSimpleCallback() - Get Callbacks By Name"},"tags":["Array","Object","String"],"variables":["count"]});