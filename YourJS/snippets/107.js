storeSnippet({"id":107,"name":"apply() & call()","description":"Call functions in a different way.  Mostly useful when chaining calls.","js":"function apply(subject, fn, opt_args) {\r\n  return (typeOf(fn, 'String') ? subject[fn] : fn).apply(subject, opt_args);\r\n}\r\nfunction call(subject, fn) {\r\n  return apply(subject, fn, slice(arguments, 2));\r\n}","post":"<h2><code>apply(...)<\/code> API Documentation<\/h2>\r\n<div style=\"margin: 0 30px 30px\">\r\n  <div>Calls the specified function with the specified arguments.<\/div>\r\n  \r\n  <h3>Parameters<\/h3>\r\n  <ol>\r\n    <li>\r\n      <b><code>subject<\/code> {*}:<\/b><br \/>\r\n      The object to call the function on.\r\n    <\/li>\r\n    <li>\r\n      <b><code>fn<\/code> {Function|string}:<\/b><br \/>\r\n      If this is a string it will be converted to the function at <code class=\"language-javascript\">subject[fn]<\/code>.  This is the function which will be called with the context being <code>subject<\/code>.\r\n    <\/li>\r\n    <li>\r\n      <b><code>opt_args<\/code> {Array}:<\/b><br \/>\r\n      Optional.  If specified these are the arguments that will be passed to the function with each top-level value in the array being passed as an argument.\r\n    <\/li>\r\n  <\/ol>\r\n  \r\n  <h3>Returns<\/h3>\r\n  <div>The return value of the specified <code>fn<\/code> function.<\/div>\r\n<\/div>\r\n\r\n<h2><code>call(...)<\/code> API Documentation<\/h2>\r\n<div style=\"margin: 0 30px 30px\">\r\n  <div>Calls the specified function with the specified arguments.<\/div>\r\n  \r\n  <h3>Parameters<\/h3>\r\n  <ol>\r\n    <li>\r\n      <b><code>subject<\/code> {*}:<\/b><br \/>\r\n      The object to call the function on.\r\n    <\/li>\r\n    <li>\r\n      <b><code>fn<\/code> {Function|string}:<\/b><br \/>\r\n      If this is a string it will be converted to the function at <code class=\"language-javascript\">subject[fn]<\/code>.  This is the function which will be called with the context being <code>subject<\/code>.\r\n    <\/li>\r\n    <li>\r\n      <b><code>...opt_args<\/code> {*}:<\/b><br \/>\r\n      Optional.  Each argument passed will be passed to <code>fn<\/code>.\r\n    <\/li>\r\n  <\/ol>\r\n  \r\n  <h3>Returns<\/h3>\r\n  <div>The return value of the specified <code>fn<\/code> function.<\/div>\r\n<\/div>","required_ids":{},"tags":["Chaining"],"variables":["apply","call"]});