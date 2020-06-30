var Table = require("../");

var t = new Table({
  borderStyle: 2,
  horizontalLine: true,
  rightPadding: 0,
  leftPadding: 1
});

t.push(["Model Number", "Name"]);
t.push(["RX-178", "GUNDAM Mk-II"]);
t.push(["MSN-00100", "百式"]);
t.push(["MSZ-006", "Zeta Gundam"]);

/* Range */
t.attrRange({
  row: [0, 1]
}, {
  align: "center"
});

/* Direct */
t.attr(2, 0, {align: "right"});

console.log("" + t);
