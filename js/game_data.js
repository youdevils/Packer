/*
    Level Data Structure

    ID[0]:
        [0]Grid Width,
        [1]Grid Height,
        [2]Tile Spritesheet Filename, 
        [3]Object Spritesheet Filename,
        [4]Size(Width/Height) of Tile in Pixels,
        [5]Level Tile Data Array,
        [6]Level Object Data Array
*/

export const Level_Data = {
    0: [25,
        19,
        "./assets/levelsheet.png",
        "./assets/objectsheet.png",
        32,
        [
        ["0", "1", "1", "1", "12", "4", "11", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "12", "4", "11", "1", "1", "1", "2"],
        ["3", "4", "4", "4", "4", "4", "4", "4", "4", "4", "4", "4", "4", "4", "4", "4", "4", "4", "4", "4", "4", "4", "4", "4", "3"],
        ["3", "4", "0", "1", "12", "4", "11", "1", "1", "1", "1", "2", "4", "0", "1", "1", "1", "1", "12", "4", "11", "1", "2", "4", "3"],
        ["10", "4", "3", "4", "4", "4", "4", "4", "4", "4", "4", "3", "4", "3", "4", "4", "4", "4", "4", "4", "4", "4", "3", "4", "10"],
        ["4", "4", "3", "4", "0", "1", "1", "1", "1", "12", "4", "3", "4", "3", "4", "11", "1", "1", "1", "1", "2", "4", "3", "4", "4"],
        ["9", "4", "3", "4", "3", "4", "4", "4", "4", "4", "4", "3", "4", "3", "4", "4", "4", "4", "4", "4", "3", "4", "3", "4", "9"],
        ["3", "4", "3", "4", "3", "4", "9", "4", "9", "4", "11", "8", "4", "6", "12", "4", "9", "4", "9", "4", "3", "4", "3", "4", "3"],
        ["3", "4", "10", "4", "3", "4", "3", "4", "3", "4", "4", "4", "4", "4", "4", "4", "3", "4", "3", "4", "3", "4", "10", "4", "3"],
        ["3", "4", "4", "4", "3", "4", "3", "4", "3", "4", "9", "5", "5", "5", "9", "4", "3", "4", "3", "4", "3", "4", "4", "4", "3"],
        ["3", "4", "13", "4", "3", "4", "3", "4", "3", "4", "6", "1", "1", "1", "8", "4", "3", "4", "3", "4", "3", "4", "13", "4", "3"],
        ["3", "4", "4", "4", "3", "4", "3", "4", "3", "4", "4", "4", "4", "4", "4", "4", "3", "4", "3", "4", "3", "4", "4", "4", "3"],
        ["3", "4", "9", "4", "3", "4", "3", "4", "3", "4", "9", "4", "9", "4", "9", "4", "3", "4", "3", "4", "3", "4", "9", "4", "3"],
        ["10", "4", "3", "4", "3", "4", "10", "4", "10", "4", "3", "4", "3", "4", "3", "4", "10", "4", "10", "4", "3", "4", "3", "4", "10"],
        ["4", "4", "3", "4", "3", "4", "4", "4", "4", "4", "3", "4", "3", "4", "3", "4", "4", "4", "4", "4", "3", "4", "3", "4", "4"],
        ["9", "4", "3", "4", "6", "1", "1", "1", "12", "4", "3", "4", "3", "4", "3", "4", "11", "1", "1", "1", "8", "4", "3", "4", "9"],
        ["3", "4", "3", "4", "4", "4", "4", "4", "4", "4", "3", "4", "3", "4", "3", "4", "4", "4", "4", "4", "4", "4", "3", "4", "3"],
        ["3", "4", "6", "1", "12", "4", "11", "1", "1", "1", "8", "4", "10", "4", "6", "1", "1", "1", "12", "4", "11", "1", "8", "4", "3"],
        ["3", "4", "4", "4", "4", "4", "4", "4", "4", "4", "4", "4", "4", "4", "4", "4", "4", "4", "4", "4", "4", "4", "4", "4", "3"],
        ["6", "1", "1", "1", "12", "4", "11", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "12", "4", "11", "1", "1", "1", "8"]
      ], 
      [
        ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"],
        ["0", "P", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "0"],
        ["0", "1", "0", "0", "0", "1", "0", "0", "0", "0", "0", "0", "1", "0", "0", "0", "0", "0", "0", "1", "0", "0", "0", "1", "0"],
        ["0", "1", "0", "2", "1", "1", "1", "1", "1", "1", "1", "0", "1", "0", "1", "1", "1", "1", "1", "1", "1", "2", "0", "1", "0"],
        ["0", "1", "0", "1", "0", "0", "0", "0", "0", "0", "1", "0", "1", "0", "1", "0", "0", "0", "0", "0", "0", "1", "0", "1", "0"],
        ["0", "1", "0", "1", "0", "1", "1", "1", "1", "1", "1", "0", "1", "0", "1", "1", "1", "1", "1", "1", "0", "1", "0", "1", "0"],
        ["0", "1", "0", "1", "0", "1", "0", "1", "0", "1", "0", "0", "1", "0", "0", "1", "0", "1", "0", "1", "0", "1", "0", "1", "0"],
        ["0", "1", "0", "1", "0", "1", "0", "1", "0", "1", "1", "1", "1", "1", "1", "1", "0", "1", "0", "1", "0", "1", "0", "1", "0"],
        ["0", "1", "1", "1", "0", "1", "0", "1", "0", "1", "0", "E", "E", "E", "0", "1", "0", "1", "0", "1", "0", "1", "1", "1", "0"],
        ["0", "1", "0", "1", "0", "1", "0", "1", "0", "1", "0", "0", "0", "0", "0", "1", "0", "1", "0", "1", "0", "1", "0", "1", "0"],
        ["0", "1", "1", "1", "0", "1", "0", "1", "0", "1", "1", "1", "1", "1", "1", "1", "0", "1", "0", "1", "0", "1", "1", "1", "0"],
        ["0", "1", "0", "1", "0", "1", "0", "1", "0", "1", "0", "1", "0", "1", "0", "1", "0", "1", "0", "1", "0", "1", "0", "1", "0"],
        ["0", "1", "0", "1", "0", "1", "0", "1", "0", "1", "0", "1", "0", "1", "0", "1", "0", "1", "0", "1", "0", "1", "0", "1", "0"],
        ["0", "1", "0", "1", "0", "1", "1", "1", "1", "1", "0", "1", "0", "1", "0", "1", "1", "1", "1", "1", "0", "1", "0", "1", "0"],
        ["0", "1", "0", "1", "0", "0", "0", "0", "0", "1", "0", "1", "0", "1", "0", "1", "0", "0", "0", "0", "0", "1", "0", "1", "0"],
        ["0", "1", "0", "2", "1", "1", "1", "1", "1", "1", "0", "1", "0", "1", "0", "1", "1", "1", "1", "1", "1", "2", "0", "1", "0"],
        ["0", "1", "0", "0", "0", "1", "0", "0", "0", "0", "0", "1", "0", "1", "0", "0", "0", "0", "0", "1", "0", "0", "0", "1", "0"],
        ["0", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "0"],
        ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"]
      ]]
};

