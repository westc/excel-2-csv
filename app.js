var fs = require('fs');
var vm = require('vm');
var path = require('path');
var remote = require('remote');

require('./menu.js');
require('./bootstrap/js/bootstrap.min.js');

var RGX_VALID_WORKBOOK = /\.(xls[bmx]?|ods)$/i,
    MAX_DIR_DEPTH = 3;

$(function() {
  var editor = ace.edit("editor");
  editor.setOptions({
    theme: "ace/theme/monokai",
    mode: "ace/mode/javascript",
    tabSize: 2,
    useSoftTabs: true
  });
});

$(document)
  .on('dragover', function(e) {
    e.preventDefault();
  });
$('#dropzone').on('drop', (e) => {
  e.preventDefault();

  addFilesAndFolders(JS.map(
    e.originalEvent.dataTransfer.files,
    function(file) { return file.path; }
  ));
});

function addFilesAndFolders(paths) {
  addFilesToList(paths.reduce(function(carry, strPath) {
    var stats = fs.statSync(strPath);
    if (stats.isFile() && RGX_VALID_WORKBOOK.test(strPath)) {
      carry.push(strPath);
    }
    else if (stats.isDirectory()) {
      carry = carry.concat(
        JS.unnest(
          [recurseDirSync(strPath, MAX_DIR_DEPTH)],
          function(file, index, add, recurse) {
            if (file.isFile && RGX_VALID_WORKBOOK.test(file.path)) {
              add(file.path);
            }
            else if (file.files) {
              recurse(file.files);
            }
          }
        )
      );
    }
    return carry;
  }, []));
}

$('#btnAddFiles').click(function() {
  remote.dialog.showOpenDialog(
    {
      properties: ['openFile', 'multiSelections'],
      filters: [
        {
          name: 'Workbooks',
          extensions: ['xls', 'xlsb', 'xlsm', 'xlsx', 'ods']
        }
      ]
    },
    function(paths) {
      addFilesAndFolders(paths);
    }
  );
});

$('#btnAddFolders').click(function() {
  remote.dialog.showOpenDialog(
    { properties: ['openDirectory', 'multiSelections'] },
    function(paths) {
      addFilesAndFolders(paths);
    }
  );
});

$('#btnClearFiles').click(clearFiles);

function clearFiles() {
  $('#filesList').html('');
}

function addFilesToList(arrPaths) {
  var lastDir,
      arrCurrPaths = getFilePaths(),
      td, tr, tbl = $('#filesList').html('')[0];
  JS.uniquify(arrCurrPaths.concat(arrPaths))
    .map(function(strPath) {
      return JS.extend(path.parse(strPath), { path: strPath });
    })
    .sort(function(a, b) {
      return a.dir != b.dir
        ? (a.dir < b.dir ? -1 : 1)
        : (a.base < b.base ? -1 : 1);
    })
    .forEach(function(pathParts) {
      var dir = pathParts.dir;
      if (lastDir != dir) {
        $(tr = tbl.insertRow(tbl.length)).addClass('dirname');
        $(tr.insertCell(0))
          .addClass('icon')
          .append(JS.dom({
            _: 'span',
            cls: 'glyphicon glyphicon-folder-open',
            'aria-hidden': 'true'
          }));
        $(tr.insertCell(1))
          .addClass('text')
          .text(lastDir = dir);
      $(tr.insertCell(2))
        .addClass('options')
        .append(JS.dom({
          _: 'a',
          cls: 'glyphicon glyphicon-trash',
          'aria-hidden': 'true',
          onclick: function() {
            var dir = pathParts.dir;
            if (dir.slice(-path.sep.length) != path.sep) {
              dir += path.sep;
            }

            var rgx = new RegExp('^' + JS.quoteRegExp(dir) + '[^' + JS.quoteRegExp(path.sep) + ']+$');
            var filePaths = getFilePaths().filter(filterize(rgx, true));
            clearFiles();
            addFilesToList(filePaths);
          }
        }));
      }

      $(tr = tbl.insertRow(tbl.length)).addClass('basename');
      $(tr.insertCell(0))
        .addClass('icon')
        .append(JS.dom({
          _: 'span',
          cls: 'glyphicon glyphicon-file',
          'aria-hidden': 'true'
        }));
      $(tr.insertCell(1))
        .addClass('text')
        .append(JS.dom({
          _: 'input',
          type: 'text',
          value: pathParts.base,
          title: pathParts.path,
          readOnly: true
        }));
      $(tr.insertCell(2))
        .addClass('options')
        .append(JS.dom({
          _: 'a',
          cls: 'glyphicon glyphicon-trash',
          'aria-hidden': 'true',
          onclick: function() {
            var filePaths = getFilePaths().filter(filterize(pathParts.path, true));
            clearFiles();
            addFilesToList(filePaths);
          }
        }));
    });
}

function filterize(strOrRgx, opt_negate) {
  return 'string' == typeof strOrRgx
    ? function(s) { return (s === strOrRgx) == !opt_negate; }
    : function (s) { return strOrRgx.test(s) == !opt_negate; };
}

function getFilePaths() {
  return $('#filesList .basename input[type=text]')
    .map(function() { return this.title; })
    .toArray();
}

function recurseDirSync(currentDirPath, depthLeft, opt_filter) {
  depthLeft--;

  var result = {
    isFile: false,
    path: currentDirPath,
    stat: fs.statSync(currentDirPath),
    files: []
  };

  fs.readdirSync(currentDirPath).forEach(function (name) {
    var filePath = path.join(currentDirPath, name),
      stat = fs.statSync(filePath),
      isFile = stat.isFile();
    if ((isFile || stat.isDirectory()) && (!opt_filter || opt_filter(filePath, isFile, stat))) {
      result.files.push(
        (isFile || depthLeft <= 0)
          ? { isFile: isFile, path: filePath, stat: stat }
          : recurseDirSync(filePath, depthLeft, opt_filter)
      );
    }
  });
  return result;
}