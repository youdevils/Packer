export class Collision_Manager {
  constructor() {}

  // Assumes Player Hit Box is >= to Player Width/Height
  static Has_Coin_Collision(player, level) {
    const player_box = {
      x: player.position_x + (player.width - player.hit_box_size) / 2,
      y: player.position_y + (player.height - player.hit_box_size) / 2,
      width: player.hit_box_size,
      height: player.hit_box_size,
    };

    for (let grid_x = 0; grid_x < level.grid_width; grid_x++) {
      for (let grid_y = 0; grid_y < level.grid_height; grid_y++) {
        const item_id = level.Get_Object_Layer_Item(grid_x, grid_y);
        if (item_id == 1 || item_id == 2) {
          const object_box = {
            x: grid_x * level.width + (level.width - level.width / 2) / 2,
            y: grid_y * level.height + (level.height - level.height / 2) / 2,
            width: level.width / 2,
            height: level.height / 2,
          };

          if (
            player_box.x < object_box.x + object_box.width &&
            player_box.x + player_box.width > object_box.x &&
            player_box.y < object_box.y + object_box.height &&
            player_box.y + player_box.height > object_box.y
          ) {
            // Collision Detected
            level.Set_Object_Layer_Item(grid_x, grid_y, "0");
            return item_id;
          }
        }
      }
    }
    return null;
  }

  static Has_Enemy_Collision(player, enemy) {
    const player_box = {
      x: player.position_x + (player.width - player.hit_box_size) / 2,
      y: player.position_y + (player.height - player.hit_box_size) / 2,
      width: player.hit_box_size,
      height: player.hit_box_size,
    };

    const enemy_box = {
      x: enemy.position_x + (enemy.width - enemy.hit_box_size) / 2,
      y: enemy.position_y + (enemy.height - enemy.hit_box_size) / 2,
      width: enemy.hit_box_size,
      height: enemy.hit_box_size,
    };

    if (
      player_box.x < enemy_box.x + enemy_box.width &&
      player_box.x + player_box.width > enemy_box.x &&
      player_box.y < enemy_box.y + enemy_box.height &&
      player_box.y + player_box.height > enemy_box.y
    ) {
      // Collision Detected
      return true;
    }

    return false;
  }
}

export class Point {
  constructor(row, col) {
    this.x = row;
    this.y = col;
  }
}
