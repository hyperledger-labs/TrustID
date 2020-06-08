var assert = require("assert");
var Table = require("../");

describe("attrRange()", function(){
  it("basic", function(){
    var t = new Table();
    t.attrRange({row: [1, 3], column: [0, 10]}, {color: "red"});
    t.cell(2, 1, "a");
    assert.equal(t.getAttr(2, 1, "color"), "red");
  });

  it("footer", function(){
    var t = new Table();
    t.push(["head"], ["body"], ["foot"]);
    t.attrRange({row: [-1]}, {color: "blue"});
    assert.equal(t.getAttr(2, 0, "color"), "blue");
  });

  it("right", function(){
    var t = new Table();
    t.push(["a", "b", "c", "d"], ["1", "2"]);
    t.attrRange({column: [-1]}, {color: "red"});
    assert.equal(t.getAttr(0, 3, "color"), "red");
  });
});
