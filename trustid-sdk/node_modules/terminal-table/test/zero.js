var assert = require("assert");
var Table = require("../");

describe("zero", function(){
  it("cell", function(){
    var t = new Table, t2 = new Table;
    t.cell(0, 0, 0);
    t2.cell(0, 0, "0");
    assert.equal(t + "", t2 + "");
  });

  it("push", function(){
    var t = new Table, t2 = new Table;
    t.push([0, 0], [, 0]);
    t2.push(["0", "0"], [, "0"]);
    assert.equal(t + "", t2 + "");
  });
});
