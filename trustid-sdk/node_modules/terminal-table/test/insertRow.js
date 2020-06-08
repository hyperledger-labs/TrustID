var assert = require("assert");
var Table = require("../");

describe("insertRow()", function(){
  it("basic", function(){
    var t = new Table();
    t.push(
      ["a", "b"],
      ["c"]
    );
    t.insertRow(1, ["n", "n"]);
    var out = [
      "+-+-+",
      "|a|b|",
      "|n|n|",
      "|c| |",
      "+-+-+"
    ];
    assert.equal(t + "", out.join("\n"));
  });

  it("head", function(){
    var t = new Table();
    t.push(
      ["a", "b"]
    );
    t.insertRow(0, ["n", "n"]);
    var out = [
      "+-+-+",
      "|n|n|",
      "|a|b|",
      "+-+-+"
    ];
    assert.equal(t + "", out.join("\n"));

  });
});

