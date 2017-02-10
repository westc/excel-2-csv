var fs = require('fs');
var vm = require('vm');
var path = require('path');
var remote = require('remote');
var mkdirp = require('mkdirp');
var XLSX = require('xlsx');

require('./menu.js');
require('./bootstrap/js/bootstrap.min.js');

var RGX_VALID_WORKBOOK = /\.(xls[bmx]?|ods)$/i,
    MAX_DIR_DEPTH = Infinity;

var BASE_CONSOLE = JS.map(console, function(value, name) {
  return JS.isFunction(value)
    ? function () {
        return console[name].apply(console, arguments);
      }
    : value;
}, true);

var APP_BASE_PATH = path.dirname(require.main.filename);
var APP_SETTINGS_PATH = path.join(APP_BASE_PATH, 'settings.json');
var ctx;

var initDone;
var appSettings = {
  _: (function() {
    var data = { code: '' };
    try {
      fs.openSync(APP_SETTINGS_PATH, 'r+');
      data = JSON.parse(fs.readFileSync(APP_SETTINGS_PATH, 'utf8'));
    }
    catch (e) {
      console.error(e.name + '\n' + e.message + '\n' + e.stack);
    }
    return data;
  })(),
  set: function(keyOrValues, value) {
    var isOneValue = JS.typeOf(keyOrValues, 'String'), data = this._;
    if (isOneValue) {
      data[keyOrValues] = value;
    }
    else {
      JS.walk(keyOrValues, function(value, key) {
        data[key] = value;
      });
    }
    this.save();
    return isOneValue ? value : keyOrValues;
  },
  get: function(key, opt_defaultValue) {
    return JS.has(this._, key) ? this._[key] : opt_defaultValue;
  },
  save: JS.debounce(function() {
    fs.writeFile(APP_SETTINGS_PATH, JSON.stringify(this._, null, 2), 'utf8');
  }, 500)
};

var vueProcs = window.vueProcs = new Vue({
  el: '#body_wrap',
  data: { funcContext: undefined, funcName: undefined, previewList: [], previewTime: undefined },
  methods: {
    selectFuncName: function(e) {
      appSettings.set('funcName', this.funcName = $(e.target).text());
    }
  },
  computed: {
    disabled: function() {
      return !this.funcName;
    },
    funcNames: function() {
      return JS.reduce(this.funcContext, function(funcNames, func, name) {
        if (![BASE_CONSOLE, JS].includes(func)) {
          funcNames.push(name);
        }
        return funcNames;
      }, []).sort();
    },
    func: function() {
      return Object(this.funcContext)[this.funcName];
    }
  },
  watch: {
    funcContext: function() {
      var ctx = Object(this.funcContext), funcName = this.funcName;
      appSettings.set(
        'funcName',
        this.funcName
          = (JS.has(ctx, funcName) && ![BASE_CONSOLE, JS].includes(ctx[funcName]))
            ? funcName
            : undefined
      );
    }
  }
});

var editor = window.editor = ace.edit("editor");
editor.setOptions({
  theme: "ace/theme/monokai",
  mode: "ace/mode/javascript",
  tabSize: 2,
  useSoftTabs: true
});
editor.setValue(appSettings.get('code'));
editor.on("change", JS(function() {
  var value = editor.getValue(),
      oldCtx = ctx;

  vm.createScript(value, { timeout: 3000 }).runInNewContext(ctx = { JS: JS, console: BASE_CONSOLE });
  appSettings.set('code', value);

  if (!initDone) {
    initDone = true;
    vueProcs.funcName = appSettings.get('funcName');
  }

  vueProcs.funcContext = ctx;

// NOTE:  Debounce not only prevents the updated script from being run every
// time a character changes but also prevents a weird error that was causing
// the caret to jump around every time an error was introduced.
}).debounce(500).callReturn().$);

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

$('#collapseCode')
  .on('shown.bs.collapse', function() {
    this.scrollIntoView();
    editor.focus();
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

$('#btnPreview').click(JS.partial(processFiles, false));

$('#btnCreateFiles').click(JS.partial(processFiles, true));

function processFiles(createFiles) {
  vueProcs.previewTime = undefined;

  vueProcs.previewList = [];

  var func = vueProcs.func;
  if (func) {
    var filePaths = getFilePaths();
    filePaths.forEach(function(filePath) {
      var workbook = XLSX.readFileSync(filePath),
          data = path.parse(filePath),
          dir = data.dir,
          sep = path.sep;

      JS.extend(data, {
        sep: sep,
        dirWithSep: dir.endsWith(sep) ? dir : (dir + sep),
        sheets: workbook.SheetNames.slice(),
        path: filePath
      });

      JS.walk(
        workbook.SheetNames,
        function(name, index) {
          var newContents,
              sheet = workbook.Sheets[name],
              newPath,
              newData,
              newDir,
              listItemData = JS.extend({}, data);

          try {
            newPath = func(data, { name: name, index: index, values: sheet });
            newData = path.parse(newPath);
            newDir = newData.dir;
            
            JS.extend(listItemData, {
              newPath: newPath,
              newDirWithSep: newDir.endsWith(sep) ? newDir : (newDir + sep),
              newBase: newData.base
            });

            if (createFiles) {
              if (/\.tsv$/i.test(newPath)) {
                newContents = XLSX.utils.sheet_to_csv(sheet, { FS: '\t' });
              }
              else if (/\.json$/i.test(newPath)) {
                newContents = JSON.stringify(XLSX.utils.sheet_to_json(sheet));
              }
              else {
                newContents = XLSX.utils.sheet_to_csv(sheet);
              }
              mkdirp(path.dirname(newPath));
              fs.writeFileSync(newPath, newContents);
            }
          }
          catch(e) {
            listItemData.errorMessage = e.message;
          }

          if (newPath) {
            vueProcs.previewList.push(listItemData);
          }
        }
      );
    });

    if (filePaths.length) {
      vueProcs.previewTime = JS.formatDate(new Date, "DDDD MMMM D, YYYY 'at' h:mm:ssA");
    }
  }
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