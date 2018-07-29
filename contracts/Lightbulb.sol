pragma solidity ^0.4.18;

contract Lightbulb {
  bool onoff;
  string statustracker;
  constructor() public{
    onoff = true;
    statustracker = "truck";
  }

  function change() public {
    onoff = !onoff;
    statustracker = "tuna";
  }

  function get() public returns (bool) {
    return onoff;
  }
  function gettracker() public returns (string){
    return statustracker;
  }
}
