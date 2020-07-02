var Table = require("../");

var t = new Table({
  borderStyle: 3,
  horizontalLine: true,
  width: [3, "30%", "20%", "50%"],
  rightPadding: 0,
  leftPadding: 1
});

t.push(["", "IP Address", "Subnet Mask", "Default Gateway"]);
t.push(["✓", "192.168.0.2", "255.255.255.0", "192.168.0.1"]);
t.push(["", "192.168.0.3", "255.255.255.0", "192.168.0.1"]);
t.push(["✓", "192.168.0.4", "255.255.255.0", "192.168.0.1"]);

t.attrRange({row: [0, 1]}, {
  align: "center",
  color: "blue",
  bg: "black"
});

t.attrRange({column: [0, 1]}, {
  color: "green"
});

t.attrRange({
  row: [1],
  column: [1]
}, {
  leftPadding: 5
});

console.log("" + t);
