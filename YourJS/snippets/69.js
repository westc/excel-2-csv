storeSnippet({"id":69,"name":"formatDate() - Date Formatter","description":"Creates a string representation of the date using the specified format string.","js":"var formatDate;\r\n(function(dayNames, monthNames, RGX_FORMAT, RGX_QUOTE, RGX_2_CHARS) {\r\n  formatDate = function(date, format, opt_dayNames, opt_monthNames) {\r\n    return format.replace(RGX_FORMAT, function(str) {\r\n      var c1 = str.charAt(0),\r\n          ret = str.charAt(0) == \"'\"\r\n          ? (c1=0) || str.slice(1, -1).replace(RGX_QUOTE, \"'\")\r\n          : str == \"a\"\r\n            ? (date.getHours() < 12 ? \"am\" : \"pm\")\r\n            : str == \"A\"\r\n              ? (date.getHours() < 12 ? \"AM\" : \"PM\")\r\n              : str == \"Z\"\r\n                ? ((\"+\" + -date.getTimezoneOffset() \/ 60).replace('+-', \"-\").replace(RGX_2_CHARS, \"$10$2\") + \"00\")\r\n                : c1 == \"S\"\r\n                  ? date.getMilliseconds()\r\n                  : c1 == \"s\"\r\n                    ? date.getSeconds()\r\n                    : c1 == \"H\"\r\n                      ? date.getHours()\r\n                      : c1 == \"h\"\r\n                        ? (date.getHours() % 12) || 12\r\n                        : (c1 == \"D\" && str.length > 2)\r\n                          ? (opt_dayNames || dayNames)[date.getDay()].slice(0, str.length > 3 ? 9 : 3)\r\n                          : c1 == \"D\"\r\n                            ? date.getDate()\r\n                            : (c1 == \"M\" && str.length > 2)\r\n                              ? (opt_monthNames || monthNames)[date.getMonth()].slice(0, str.length > 3 ? 9 : 3)\r\n                              : c1 == \"m\"\r\n                                ? date.getMinutes()\r\n                                : c1 == \"M\"\r\n                                  ? date.getMonth() + 1\r\n                                  : (\"\" + date.getFullYear()).slice(-str.length);\r\n      return c1 && str.length < 4 && (\"\" + ret).length < str.length\r\n        ? (\"00\" + ret).slice(-str.length)\r\n        : ret;\r\n    });\r\n  };\r\n})(\r\n  \"Sunday,Monday,Tuesday,Wednesday,Thursday,Friday,Saturday\".split(\",\"),\r\n  \"January,February,March,April,May,June,July,August,September,October,November,December\".split(\",\"),\r\n  \/a|A|Z|S(SS)?|ss?|mm?|HH?|hh?|D{1,4}|M{1,4}|YY(YY)?|'([^']|'')*'\/g,\r\n  \/''\/g,\r\n  \/^(.)(.)$\/\r\n);","post":"<h2><code>formatDate(...)<\/code> API Documentation<\/h2>\r\n<div style=\"margin: 0 30px 30px\">\r\n  <h3>Description<\/h3>\r\n  <div>Creates a string representation of the date using the specified format string.<\/div>\r\n  \r\n  <h3>Parameters<\/h3>\r\n  <ol>\r\n    <li>\r\n      <b><code>date<\/code> {Date}:<\/b><br \/>\r\n      The date to be represented as a string.\r\n    <\/li>\r\n    <li>\r\n      <b><code>format<\/code> {string}:<\/b><br \/>\r\n      <div>The format string indicating how to represent <code>date<\/code> as a string.  A combination of any of the formats in the follow table can be used to get the desired result:<\/div>\r\n      <table style=\"border: 1px solid #CCC; border-collapse: collapse; margin: 15px; box-shadow: 0 5px 10px -3px #333;\" border=\"1\">\r\n        <tbody>\r\n          <tr>\r\n            <th>Format<\/th>\r\n            <th>Output<\/th>\r\n            <th>Meaning<\/th>\r\n          <\/tr>\r\n          <tr>\r\n            <td><code>YYYY<\/code><\/td>\r\n            <td><code>2012<\/code><\/td>\r\n            <td>Four-digit representation of the year.<\/td>\r\n          <\/tr>\r\n          <tr>\r\n            <td><code>YY<\/code><\/td>\r\n            <td><code>12<\/code><\/td>\r\n            <td>Two-digit representation of the year.<\/td>\r\n          <\/tr>\r\n          <tr>\r\n            <td><code>MMMM<\/code><\/td>\r\n            <td><code>September<\/code><\/td>\r\n            <td>Full textual representation of the month.<\/td>\r\n          <\/tr>\r\n          <tr>\r\n            <td><code>MMM<\/code><\/td>\r\n            <td><code>Sep<\/code><\/td>\r\n            <td>Three letter representation of the month.<\/td>\r\n          <\/tr>\r\n          <tr>\r\n            <td><code>MM<\/code><\/td>\r\n            <td><code>09<\/code><\/td>\r\n            <td>Month with the leading zero (two digits long).<\/td>\r\n          <\/tr>\r\n          <tr>\r\n            <td><code>M<\/code><\/td>\r\n            <td><code>9<\/code><\/td>\r\n            <td>Month without the leading zero.<\/td>\r\n          <\/tr>\r\n          <tr>\r\n            <td><code>DDDD<\/code><\/td>\r\n            <td><code>Wednesday<\/code><\/td>\r\n            <td>Full textual representation of the day of the week.<\/td>\r\n          <\/tr>\r\n          <tr>\r\n            <td><code>DDD<\/code><\/td>\r\n            <td><code>Wed<\/code><\/td>\r\n            <td>Three letter representation of the day of the week.<\/td>\r\n          <\/tr>\r\n          <tr>\r\n            <td><code>DD<\/code><\/td>\r\n            <td><code>03<\/code><\/td>\r\n            <td>Day of the month with leading zero (two digits long).<\/td>\r\n          <\/tr>\r\n          <tr>\r\n            <td><code>D<\/code><\/td>\r\n            <td><code>3<\/code><\/td>\r\n            <td>Day of the month without leading zeros.<\/td>\r\n          <\/tr>\r\n          <tr>\r\n            <td><code>HH<\/code><\/td>\r\n            <td><code>19<\/code><\/td>\r\n            <td>24-hour format of hour with leading zero (two digits long).<\/td>\r\n          <\/tr>\r\n          <tr>\r\n            <td><code>hh<\/code><\/td>\r\n            <td><code>07<\/code><\/td>\r\n            <td>12-hour format of hour with leading zero (two digits long).<\/td>\r\n          <\/tr>\r\n          <tr>\r\n            <td><code>H<\/code><\/td>\r\n            <td><code>19<\/code><\/td>\r\n            <td>24-hour format of hour without leading zeros.<\/td>\r\n          <\/tr>\r\n          <tr>\r\n            <td><code>h<\/code><\/td>\r\n            <td><code>7<\/code><\/td>\r\n            <td>12-hour format of hour without leading zeros.<\/td>\r\n          <\/tr>\r\n          <tr>\r\n            <td><code>mm<\/code><\/td>\r\n            <td><code>01<\/code><\/td>\r\n            <td>Minutes with the leading zero (two digits long).<\/td>\r\n          <\/tr>\r\n          <tr>\r\n            <td><code>m<\/code><\/td>\r\n            <td><code>1<\/code><\/td>\r\n            <td>Minutes without the leading zero.<\/td>\r\n          <\/tr>\r\n          <tr>\r\n            <td><code>ss<\/code><\/td>\r\n            <td><code>08<\/code><\/td>\r\n            <td>Seconds with the leading zero (two digits long).<\/td>\r\n          <\/tr>\r\n          <tr>\r\n            <td><code>s<\/code><\/td>\r\n            <td><code>8<\/code><\/td>\r\n            <td>Seconds without the leading zero.<\/td>\r\n          <\/tr>\r\n          <tr>\r\n            <td><code>a<\/code><\/td>\r\n            <td><code>pm<\/code><\/td>\r\n            <td>Lowercase am or pm.<\/td>\r\n          <\/tr>\r\n          <tr>\r\n            <td><code>A<\/code><\/td>\r\n            <td><code>PM<\/code><\/td>\r\n            <td>Uppercase AM or PM.<\/td>\r\n          <\/tr>\r\n          <tr>\r\n            <td><code>SSS<\/code><\/td>\r\n            <td><code>095<\/code><\/td>\r\n            <td>Milliseconds with leading zeros (three digits long).<\/td>\r\n          <\/tr>\r\n          <tr>\r\n            <td><code>S<\/code><\/td>\r\n            <td><code>95<\/code><\/td>\r\n            <td>Milliseconds without leading zeros.<\/td>\r\n          <\/tr>\r\n          <tr>\r\n            <td><code>Z<\/code><\/td>\r\n            <td><code>-0400<\/code><\/td>\r\n            <td>Difference to Greenwich time (GMT) in hours.<\/td>\r\n          <\/tr>\r\n          <tr>\r\n            <td><code>'NO ''FORMAT'' HERE'<\/code><\/td>\r\n            <td><code>NO 'FORMAT' HERE<\/code><\/td>\r\n            <td>The specified string within the single quotes printed literally.  To escape a single quote, you must prepend it with another single quote.<\/td>\r\n          <\/tr>\r\n          <tr>\r\n            <td colspan=\"3\"><strong>Date Used:<\/strong>  Wednesday September 3, 2012 19:01:08.095 GMT-0400 (EDT)<\/td>\r\n          <\/tr>\r\n        <\/tbody>\r\n      <\/table>\r\n    <\/li>\r\n    <li>\r\n      <b><code>opt_dayNames<\/code> {Array.&lt;string&gt;}:<\/b><br \/>\r\n      Optional.  Defaults to <code class=\"language-javascript\">[\"Sunday\",\"Monday\",\"Tuesday\",\"Wednesday\",\"Thursday\",\"Friday\",\"Saturday\"]<\/code>.  If given, the day names in this array will be used as the name of the corresponding day in the returned string.\r\n    <\/li>\r\n    <li>\r\n      <b><code>opt_monthNames<\/code> {Array.&lt;string&gt;}:<\/b><br \/>\r\n      Optional.  Defaults to <code class=\"language-javascript\">[\"January\",\"February\",\"March\",\"April\",\"May\",\"June\",\"July\",\"August\",\"September\",\"October\",\"November\",\"December\"]<\/code>.  If given, the month names in this array will be used as the name of the corresponding month in the returned string.\r\n    <\/li>\r\n  <\/ol>\r\n  \r\n  <h3>Returns<\/h3>\r\n  <div>The date formatted as specified by <code>format<\/code>.<\/div>\r\n<\/div>","required_ids":{},"tags":["Date","String"],"variables":["formatDate"]});