var Table = require("../");

var t = new Table({
  borderStyle: 0,
  border: {
    sep: "║",
    topLeft: "╔", topMid: "╦", top: "═", topRight: "╗",
    midLeft: "╠", midMid: "╬", mid: "═", midRight: "╣",
    botLeft: "╚", botMid: "╩", bot: "═", botRight: "╝"
  },
  horizontalLine: true,
  leftPadding: 1
});

t.push(
  ["Model Number", "Name"],
  ["RX78-2", "Gundam"],
  ["MS-06", "Zaku II"]
);

console.log("" + t);
