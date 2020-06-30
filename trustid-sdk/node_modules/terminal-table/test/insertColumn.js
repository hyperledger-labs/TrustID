var assert = require("assert");
var Table = require("../");


describe("insertColumn()", function(){
  it("basic", function(){
    var t = new Table();
    t.push(
      ["a", "b"],
      ["c", "d"]
    );
    t.insertColumn(0, ["n", "n"]);
    var out = [
      "+-+-+-+",
      "|n|a|b|",
      "|n|c|d|",
      "+-+-+-+"
    ];
    assert.equal(t + "", out.join("\n"));
  });

  it("empty", function(){
    var t = new Table();
    t.insertColumn(3, ["a", "a"]);
    var out = [
      "++++-+",
      "||||a|",
      "||||a|",
      "++++-+"
    ];
    assert.equal(t + "", out.join("\n"));
  });

  it("skip", function(){
    var t = new Table();
    t.push(
      ["a", "b"],
      ["c", "d"],
      ["e", "f"]
    );
    t.insertColumn(1, ["n", null, "n"]);
    var out = [
      "+-+-+-+",
      "|a|n|b|",
      "|c| |d|",
      "|e|n|f|",
      "+-+-+-+"
    ];
    assert.equal(t + "", out.join("\n"));
  });

  it("nothing", function(){
    var t = new Table();
    t.insertColumn(10, []);
    var out = "++\n++";
    assert.equal(t + "", out);
  });
});
