storeSnippet({"id":40,"name":"isSafeInt() ES6 Style","description":"Determines if the argument that is passed in is an integer in the range of -9007199254740991 and 9007199254740991.","js":"function isSafeInt(value) {\r\n  return typeOf(value, 'Number') && value % 1 == 0 && Math.abs(value) <= (Math.pow(2,53) - 1);\r\n}","post":"<h2><code>isSafeInt()<\/code> API Documentation<\/h2>\r\n<div style=\"margin: 0 30px 30px\">\r\n  <h3>Description<\/h3>\r\n  <div>Determines if the argument that is passed in is an integer in the range of <code>-2<sup>53<\/sup>+1<\/code> and <code>2<sup>53<\/sup>-1<\/code>.<\/div>\r\n  \r\n  <h3>Parameters<\/h3>\r\n  <ol>\r\n    <li>\r\n      <b><code>value<\/code> {number}:<\/b><br \/>\r\n      The value to be tested to see if it is an integer in the range of <code>-2<sup>53<\/sup>+1<\/code> and <code>2<sup>53<\/sup>-1<\/code>.\r\n    <\/li>\r\n  <\/ol>\r\n  \r\n  <h3>Returns<\/h3>\r\n  <div>Returns <code>true<\/code> if <code>value<\/code> is an integer within the range of <code>-2<sup>53<\/sup>+1<\/code> and <code>2<sup>53<\/sup>-1<\/code>.  In all other cases <code>false<\/code> is returned.<\/div>\r\n<\/div>","required_ids":{},"tags":["Boolean","Number","Type Checking"],"variables":["isSafeInt"]});