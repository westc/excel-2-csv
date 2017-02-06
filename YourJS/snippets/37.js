storeSnippet({"id":37,"name":"getTimeAgo() - Relative Time Strings","description":"Indicates how long ago a specific date was.","js":"function getTimeAgo(dateTime, opt_currDateTime) {\r\n  opt_currDateTime = new Date(opt_currDateTime || new Date) - new Date(dateTime);\r\n  return '31536e6year2592e6month864e5day36e5hour6e4minute1e3second'.replace(\/(\\d+e\\d)([a-z]+)\/g, function(m, ms, interval) {\r\n    if (dateTime != undefined) {\r\n      ms = Math.round(opt_currDateTime \/ +ms);\r\n      if (ms >= 1 || interval == 'second') {\r\n        dateTime = undefined;\r\n        return ms + ' ' + interval + (ms - 1 ? 's' : '') + ' ago';\r\n      }\r\n    }\r\n    return '';\r\n  }) || undefined;\r\n}","post":"At times you may stumble across sites which indicate how long ago some piece of content was created or edited.  <a href=\"http:\/\/stackoverflow.com\/a\/14339355\/657132\" target=\"_blank\">This function<\/a> is used by some to accomplish this task in PHP.  In JavaScript we have this YourJS snippet which allows us to basically do the same thing.\r\n\r\n<h2><code>getTimeAgo(...)<\/code> API Documentation<\/h2>\r\n<div style=\"margin: 0 30px 30px;\">\r\n  <h3>Description<\/h3>\r\n  <div>Indicates how long ago a specified date was.<\/div>\r\n  \r\n  <h3>Parameters<\/h3>\r\n  <ol>\r\n    <li>\r\n      <b><code>dateTime<\/code> {Date|number}:<\/b><br \/>\r\n      The <code>Date<\/code> or <code>number<\/code> (milliseconds since midnight January 1, 1970) representing the date\/time that we want to compare to the current time.\r\n    <\/li>\r\n    <li>\r\n      <b><code>opt_currDateTime<\/code> {Date|number}:<\/b><br \/>\r\n      Optional.  Defaults to the current date\/time.  The <code>Date<\/code> or <code>number<\/code> (milliseconds since midnight January 1, 1970) used as the current time.\r\n    <\/li>\r\n  <\/ol>\r\n  \r\n  <h3>Returns<\/h3>\r\n  <div>Returns a string indicating how many years or months or days or hours or minutes or seconds <code>dateTime<\/code> is ahead of <code>opt_currDateTime<\/code>.  Eg. <code>\"5 minutes ago\"<\/code><\/div>\r\n<\/div>","required_ids":{},"tags":["Date","String"],"variables":["getTimeAgo"]});