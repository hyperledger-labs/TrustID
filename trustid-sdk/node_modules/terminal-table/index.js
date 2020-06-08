var eaw = require("eastasianwidth");
var colors = require("colors/safe");

function Table(options){
  options = options || {};
  this.table = [];
  this.attrMap = [];
  this.borderStyle = options.borderStyle;
  this.horizontalLine = options.horizontalLine || false;
  this.width = options.width || [];
  this.rightPadding = options.rightPadding || 0;
  this.leftPadding = options.leftPadding || 0;

  if(this.borderStyle === 0){
    this.border = options.border;
  }
  else if(this.borderStyle === 2){
    this.border = {
      sep: "│",
      topLeft: "┌", topMid: "┬", top: "─", topRight: "┐",
      midLeft: "├", midMid: "┼", mid: "─", midRight: "┤",
      botLeft: "└", botMid: "┴", bot: "─", botRight: "┘"
    };
  }
  else if(this.borderStyle === 3){
    this.border = {
      sep: "┃",
      topLeft: "┏", topMid: "┳", top: "━", topRight: "┓",
      midLeft: "┣", midMid: "╋", mid: "━", midRight: "┫",
      botLeft: "┗", botMid: "┻", bot: "━", botRight: "┛"
    };
  }
  else{
    this.border = {
      sep: "|",
      topLeft: "+", topMid: "+", top: "-", topRight: "+",
      midLeft: "|", midMid: "+", mid: "-", midRight: "|",
      botLeft: "+", botMid: "+", bot: "-", botRight: "+"
    };
  }
}


Table.prototype.space = function(n){
  return new Array(n + 1).join(" ");
};


Table.prototype.strlen = function(text){
  return eaw.length(text.replace(/\x1b\[[\d;]*m/g, ""));
};


Table.prototype.pad = function(text, n, align){
  var l = this.strlen(text);
  if(n > l){
    var d = n - l;
    if(align === 2){
      text = this.space(d) + text;
    }
    else if(align === 1){
      text = this.space((d / 2 | 0) + (d % 2)) + text + this.space((d / 2 | 0));
    }
    else{
      text += this.space(d);
    }
  }
  return text;
};


Table.prototype.format = function(row, column, size){
  var t = this.table;
  var str = (!t[row] || !t[row][column]) ? "" : t[row][column].text;
  var lp = this.space(this.getAttr(row, column, "leftPadding") || this.leftPadding);
  var rp = this.space(this.getAttr(row, column, "rightPadding") || this.rightPadding);
  var align = this.getAttr(row, column, "align");
  var color = this.getAttr(row, column, "color");
  var bg = this.getAttr(row, column, "bg");
  if(color){
    str = colors[color](str);
  }

  if(this.strlen(lp + str + rp) <= size){
    str = lp + str + rp;
  }
  if(this.strlen(str) > size){
    // ajust
    str = str.slice(0, size);
  }

  str = this.pad(str, size, align === "right" ? 2 : align === "center" ? 1 : 0);
  if(bg){
    str = colors[bg + "BG"](str);
  }
  return str;
};


Table.prototype.maxcell = function(column){
  var ps = this.leftPadding + this.rightPadding;
  var m = 0;
  for(var i = 0, l = this.table.length;i < l;i++){
    if(!this.table[i] || !this.table[i][column]){
      continue;
    }
    m = Math.max(m, this.strlen(this.table[i][column].text) + ps);
  }
  return m;
};


Table.prototype.calcWidth = function(){
  var integer = [], percent = [];
  var screenWidth;
  var sum = function(){
    return integer.reduce(function(m, n){return m + n;}, 0);
  };

  for(var i = 0, l = this.horlen();i < l;i++){
    if(!this.width[i]){
      integer[i] = this.maxcell(i);
    }
    else if(1 <= this.width[i]){
      integer[i] = this.width[i] | 0;
    }
    else{
      percent.push(i);
    }
  }

  screenWidth = process.stdout.columns - sum();

  for(var p, i = 0, l = percent.length;i < l;i++){
    p = this.width[percent[i]];

    // "xx%" -> 0.xx
    if(/\d+%/.test(p)){
      p = parseInt(p, 10) / 100;
    }

    integer[percent[i]] = screenWidth * p | 0;
  }

  var borderSize = this.horlen() + 1;
  if(percent.length && (process.stdout.columns < sum() + borderSize)){
    var bpl = borderSize / percent.length | 0;
    var ex = borderSize % percent.length;
    for(var d, i = 0, l = percent.length;i < l;i++){
      d = bpl;
      ex && (d += ex, ex = 0);
      integer[percent[i]] -= d;
    }
  }

  return integer;
};


// Horizontal Length ->
Table.prototype.horlen = function(){
  return Math.max.apply(null, this.table.reduce(function(arr, row){
    arr[arr.length] = row.length;
    return arr;
  }, []));
};


Table.prototype.init = function(row, column){
  if(!this.table[row]){
    this.table[row] = [];
  }
  this.table[row][column] = {
    text: ""
  };
};


Table.prototype.attr = function(row, column, attr){
  if(!this.table[row] || !this.table[row][column]){
    return;
  }
  var cell = this.table[row][column];
  Object.keys(attr).forEach(function(key){
    cell[key] = attr[key];
  });
};


/*
 * attrRange({row: [start(, end)]}, {attr})
 */
Table.prototype.attrRange = function(range, attr){
  this.attrMap.push({
    row: range.row || [],
    column: range.column || [],
    attr: attr
  });
};


Table.prototype.getRange = function(row, column, attr){
  for(var i = this.attrMap.length, m, s;i--;){
    m = this.attrMap[i];
    var startRow = m.row[0] < 0 ? this.table.length + m.row[0] : m.row[0];
    var endRow = m.row[1] < 0 ? this.table.length + m.row[1] : m.row[1];
    if(startRow > endRow){
      s = startRow;
      startRow = endRow;
      endRow = s;
    }

    var startCol = m.column[0] < 0 ? this.horlen() + m.column[0] : m.column[0];
    var endCol = m.column[1] < 0 ? this.horlen() + m.column[1] : m.column[1];
    if(startCol > endCol){
      s = startCol;
      startCol = endCol;
      endRow = s;
    }

    var r = ((startRow || 0) <= row && row < (endRow || Infinity)) ? 1 : 0;
    var c = ((startCol || 0) <= column && column < (endCol || Infinity)) ? 1 : 0;

    if((r & c) && m.attr[attr]){
      return m.attr[attr];
    }
  }
  return null;
};


Table.prototype.getAttr = function(row, column, attr){
  var val = null;
  if(this.table[row] && this.table[row][column] && (val = this.table[row][column][attr] || null)){
    return val;
  }
  else{
    return this.getRange(row, column, attr);
  }
};


Table.prototype.cell = function(row, column, text){
  this.init(row, column);
  if(!text && text !== 0){
    return;
  }
  this.table[row][column].text = text + "";
};


Table.prototype.insertRow = function(rowIndex, items){
  if(this.table[rowIndex]){
    this.table.splice(rowIndex, 0, []);
  }
  for(var i = 0, l = items.length;i < l;i++){
    this.cell(rowIndex, i, items[i]);
  }
};


Table.prototype.insertColumn = function(columnIndex, items){
  var l = Math.max(this.table.length, items.length);
  for(var i = 0;i < l;i++){
    if(!this.table[i]){
      this.table[i] = [];
    }
    else{
      this.table[i].splice(columnIndex, 0, "");
    }
    if(items[i]){
      this.cell(i, columnIndex, items[i]);
    }
  }
};


Table.prototype.removeCell = function(row, column){
  this.init(row, column);
};


Table.prototype.removeRow = function(row, n){
  this.table.splice(row, n || 1);
};


Table.prototype.removeColumn = function(column, n){
  for(var i = 0, l = this.table.length;i < l;i++){
    if(!this.table[i]){
      continue;
    }
    this.table[i].splice(column, n || 1);
  }
};


Table.prototype.push = function(items){
  if(1 < arguments.length){
    for(var i = 0, l = arguments.length;i < l;i++){
      Array.isArray(arguments[i]) && this.push(arguments[i]);
    }
    return;
  }

  var row = this.table.length;
  for(var i = 0, l = items.length;i < l;i++){
    this.cell(row, i, items[i]);
  }
};


Table.prototype.output = Table.prototype.toString = function(){
  var text = "";
  var mcCache = [];
  var hlen = this.horlen();

  mcCache = this.calcWidth();
  //for(var i = 0, m;i < hlen;i++){
  //  m = mcCache[i] = this.maxcell(i);
  //}

  var b = this.border;
  var topBorder = b.topLeft + mcCache.map(function(n){
    return new Array(n + 1).join(b.top);
  }).join(b.topMid) + b.topRight;
  var midBorder = b.midLeft + mcCache.map(function(n){
    return new Array(n + 1).join(b.mid);
  }).join(b.midMid) + b.midRight;
  var botBorder = b.botLeft + mcCache.map(function(n){
    return new Array(n + 1).join(b.bot);
  }).join(b.botMid) + b.botRight;

  text += topBorder + "\n";

  var t = this.table;
  for(var row = 0, rowlen = t.length;row < rowlen;row++){
    if(row != 0 && this.horizontalLine){
      text += midBorder + "\n";
    }
    text += b.sep;
    for(var column = 0, str;column < hlen;column++){
      text += this.format(row, column, mcCache[column]) + b.sep;
    }
    text += "\n";
  }

  text += botBorder;

  return text;
};


Table.prototype.__defineGetter__("cols", function(){
  return this.horlen();
});


Table.prototype.__defineGetter__("rows", function(){
  return this.table.length;
});


module.exports = Table;
