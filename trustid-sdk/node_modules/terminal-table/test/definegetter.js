var assert = require("assert");
var Table = require("../");

describe("__defineGetter__", function(){
  it("cols", function(){
    var t = new Table();
    t.cell(1, 5, "foo");
    assert.equal(t.cols, 6);
  });

  it("rows", function(){
    var t = new Table();
    t.cell(3, 0, "foo");
    assert.equal(t.rows, 4);
  });
});
