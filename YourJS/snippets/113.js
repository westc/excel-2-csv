storeSnippet({"id":113,"name":"isError()","description":"Determines if something is an Error object.","js":"function isError(obj, opt_testForAnyError) {\r\n  return typeOf(obj).slice(opt_testForAnyError ? -5 : 0) == 'Error';\r\n}","post":"<h2><code>isError(obj)<\/code> API Documentation<\/h2>\r\n<div style=\"margin: 0 30px 30px;\">\r\n  <h3>Description<\/h3>\r\n  <div>Determines if something is an <code>Error<\/code> object.<\/div>\r\n  \r\n  <h3>Parameters<\/h3>\r\n  <ol>\r\n    <li><code>obj<\/code> {*}:<br \/>The value to be checked.<\/li>\r\n    <li><code>opt_testForAnyError<\/code> {boolean}:<br \/>Optional.  Defaults to <code class=\"language-javascript\">false<\/code>.  Determines whether or not the function will check to see if <code>obj<\/code> is any type of <code>Error<\/code> object or only the basic <code>Error<\/code> object.<\/li>\r\n  <\/ol>\r\n  \r\n  <h3>Returns<\/h3>\r\n  <div>Returns <code>true<\/code> if <code>obj<\/code> is an <code>Error<\/code> object, otherwise <code>false<\/code> is returned.  If <code>opt_testForAnyError<\/code> is <code class=\"language-javascript\">true<\/code> then <code class=\"language-javascript\">true<\/code> will be returned as long as <code class=\"language-javascript\">YourJS.typeOf(obj)<\/code> ends in <code class=\"language-javascript\">\"Error\"<\/code>.<\/div>\r\n  \r\n  <h3>Example<\/h3>\r\n  <pre class=\"language-javascript\"><code>console.log(YourJS.isError(new Error));  \/\/ -> true\r\nconsole.log(YourJS.isError(new SyntaxError));  \/\/ -> false\r\n\r\nconsole.log(YourJS.isError(new SyntaxError, true));  \/\/ -> true\r\nconsole.log(YourJS.isError(new TypeError, true));  \/\/ -> true\r\nconsole.log(YourJS.isError(new ReferenceError, true));  \/\/ -> true\r\nconsole.log(YourJS.isError(new URIError, true));  \/\/ -> true\r\nconsole.log(YourJS.isError(new RangeError, true));  \/\/ -> true\r\nconsole.log(YourJS.isError(new EvalError, true));  \/\/ -> true<\/code><\/pre>\r\n<\/div>","required_ids":{},"tags":["Boolean","Type Checking"],"variables":["isError"]});