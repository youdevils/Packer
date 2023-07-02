import { Point } from "./utils.js";

export class Layer {
  constructor(data, spritesheet, size, stagger, frames) {
    this.layer_data = data;
    this.sprite_sheet = spritesheet;
    this.sprite_size = size;
    this.global_stagger = stagger;
    this.global_frames = frames;
  }
}

export class Level {
  constructor(level_data) {
    this.grid_width = level_data[0];
    this.grid_height = level_data[1];
    this.layers = [];
    this.width = level_data[4];
    this.height = level_data[4];
    this.object_frame_counter = 0;

    const tilesheet = new Image();
    tilesheet.src = level_data[2];

    const objectsheet = new Image();
    objectsheet.src = level_data[3];

    this.layers.push(new Layer(level_data[5], tilesheet, 32, 0, 0));
    this.layers.push(new Layer(level_data[6], objectsheet, 64, 9, 15));
  }

  Draw(context, game_frame) {
    for (let grid_x = 0; grid_x < this.grid_width; grid_x++) {
      for (let grid_y = 0; grid_y < this.grid_height; grid_y++) {
        context.drawImage(
          this.layers[0].sprite_sheet,
          this.layers[0].layer_data[grid_y][grid_x] * this.layers[0].sprite_size,
          0,
          this.layers[0].sprite_size,
          this.layers[0].sprite_size,
          grid_x * this.width,
          grid_y * this.height,
          this.width,
          this.height
        );
      }
    }
    
    for (let grid_x = 0; grid_x < this.grid_width; grid_x++) {
      for (let grid_y = 0; grid_y < this.grid_height; grid_y++) {
        if(this.layers[1].layer_data[grid_y][grid_x] == 1){
          context.drawImage(
            this.layers[1].sprite_sheet,
            this.object_frame_counter * this.layers[1].sprite_size,
            0,
            this.layers[1].sprite_size,
            this.layers[1].sprite_size,
            grid_x * this.width + 8,
            grid_y * this.height + 8,
            this.width / 2,
            this.height / 2,
          );
        } else if(this.layers[1].layer_data[grid_y][grid_x] == 2){
          context.drawImage(
            this.layers[1].sprite_sheet,
            this.object_frame_counter * this.layers[1].sprite_size,
            64,
            this.layers[1].sprite_size,
            this.layers[1].sprite_size,
            grid_x * this.width + 8,
            grid_y * this.height + 8,
            this.width / 2,
            this.height / 2,
          );
        }
      
      }
    }

    // Animate Over Selected Frame. Slow Animation Based on Stagger Value
    if (game_frame % this.layers[1].global_stagger === 0) {
      if (this.object_frame_counter < this.layers[1].global_frames) {
        this.object_frame_counter++;
      } else {
        this.object_frame_counter = 0;
      }
    }
  }

  Get_Tile_Layer_Item(x, y){
    return this.layers[0].layer_data[y][x];
  }

  Get_Object_Layer_Item(x, y){
    return this.layers[1].layer_data[y][x];
  }

  Set_Tile_Layer_Item(x, y, value){
    this.layers[0].layer_data[y][x] = value;
  }

  Set_Object_Layer_Item(x, y, value){
    this.layers[1].layer_data[y][x] = value;
  }

  Get_Total_Yellow_Coins(){
    let count = 0;
    for (let grid_x = 0; grid_x < this.grid_width; grid_x++) {
      for (let grid_y = 0; grid_y < this.grid_height; grid_y++) {
        if(this.Get_Object_Layer_Item(grid_x, grid_y) == 1){
          count++;
        } 
      }
    }
    return count;
  }

  Get_Total_Red_Coins(){
    let count = 0;
    for (let grid_x = 0; grid_x < this.grid_width; grid_x++) {
      for (let grid_y = 0; grid_y < this.grid_height; grid_y++) {
        if(this.Get_Object_Layer_Item(grid_x, grid_y) == 2){
          count++;
        } 
      }
    }
    return count;
  }

  Get_Enemy_Start_Points(){
    let enemy_starting_points = [];
    for (let grid_x = 0; grid_x < this.grid_width; grid_x++) {
      for (let grid_y = 0; grid_y < this.grid_height; grid_y++) {
        if(this.Get_Object_Layer_Item(grid_x, grid_y) == 'E'){
          enemy_starting_points.push(new Point(grid_x, grid_y));
        } 
      }
    }
    return enemy_starting_points;
  }

  Get_Player_Start_Position(){
    for (let grid_x = 0; grid_x < this.grid_width; grid_x++) {
      for (let grid_y = 0; grid_y < this.grid_height; grid_y++) {
        if(this.Get_Object_Layer_Item(grid_x, grid_y) == 'P'){
          return new Point(grid_x, grid_y);
        } 
      }
    }
  }
}


