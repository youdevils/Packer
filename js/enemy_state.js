import { Point } from "./utils.js";

export const ENEMY_STATES = {
  ACT_LEFT: 0,
  ACT_RIGHT: 1,
  ACT_UP: 2,
  ACT_DOWN: 3,
  PAS_LEFT: 4,
  PAS_RIGHT: 5,
  PAS_UP: 6,
  PAS_DOWN: 7,
  PAS_IDLE: 8,
};

class Enemy_State {
  constructor(current_state, enemy) {
    this.enemy = enemy;
    this.state = current_state;
    this.movement_threshold = 0.1;

    // Defaults
    this.frame_count = 2;
    this.stagger = 8;
    this.sheet_animation = 1;
  }

  Is_Valid_Move(point, level) {
    if (level.Get_Tile_Layer_Item(point.x, point.y) == 4) {
      return true;
    } else {
      return false;
    }
  }

  Next_Grid_Position(state, grid_width, grid_height) {
    switch (state) {
      case ENEMY_STATES.ACT_LEFT: {
        let new_x = this.enemy.current_grid_position.x - 1;
        if (new_x < 0) {
          new_x = grid_width - 1;
        }
        return new Point(new_x, this.enemy.current_grid_position.y);
      }
      case ENEMY_STATES.ACT_RIGHT: {
        let new_x = this.enemy.current_grid_position.x + 1;
        if (new_x > grid_width - 1) {
          new_x = 0;
        }
        return new Point(new_x, this.enemy.current_grid_position.y);
      }
      case ENEMY_STATES.ACT_UP: {
        let new_y = this.enemy.current_grid_position.y - 1;
        if (new_y < 0) {
          new_y = grid_height - 1;
        }
        return new Point(this.enemy.current_grid_position.x, new_y);
      }
      case ENEMY_STATES.ACT_DOWN: {
        let new_y = this.enemy.current_grid_position.y + 1;
        if (new_y > grid_height - 1) {
          new_y = 0;
        }
        return new Point(this.enemy.current_grid_position.x, new_y);
      }
      case ENEMY_STATES.PAS_LEFT: {
        let new_x = this.enemy.current_grid_position.x - 1;
        if (new_x < 0) {
          new_x = grid_width - 1;
        }
        return new Point(new_x, this.enemy.current_grid_position.y);
      }
      case ENEMY_STATES.PAS_RIGHT: {
        let new_x = this.enemy.current_grid_position.x + 1;
        if (new_x > grid_width - 1) {
          new_x = 0;
        }
        return new Point(new_x, this.enemy.current_grid_position.y);
      }
      case ENEMY_STATES.PAS_UP: {
        let new_y = this.enemy.current_grid_position.y - 1;
        if (new_y < 0) {
          new_y = grid_height - 1;
        }
        return new Point(this.enemy.current_grid_position.x, new_y);
      }
      case ENEMY_STATES.PAS_DOWN: {
        let new_y = this.enemy.current_grid_position.y + 1;
        if (new_y > grid_height - 1) {
          new_y = 0;
        }
        return new Point(this.enemy.current_grid_position.x, new_y);
      }
    }
  }

  Get_Next_State(level) {
    const next_left = this.Next_Grid_Position(
      ENEMY_STATES.ACT_LEFT,
      level.grid_width,
      level.grid_height
    );
    const next_right = this.Next_Grid_Position(
      ENEMY_STATES.ACT_RIGHT,
      level.grid_width,
      level.grid_height
    );
    const next_up = this.Next_Grid_Position(
      ENEMY_STATES.ACT_UP,
      level.grid_width,
      level.grid_height
    );
    const next_down = this.Next_Grid_Position(
      ENEMY_STATES.ACT_DOWN,
      level.grid_width,
      level.grid_height
    );

    let valid_directions = [];

    switch (this.state) {
      case "ACT_LEFT": {
        if (this.Is_Valid_Move(next_left, level)) {
          valid_directions.push(ENEMY_STATES.ACT_LEFT);
        }
        if (this.Is_Valid_Move(next_up, level)) {
          valid_directions.push(ENEMY_STATES.ACT_UP);
        }
        if (this.Is_Valid_Move(next_down, level)) {
          valid_directions.push(ENEMY_STATES.ACT_DOWN);
        }
        break;
      }
      case "ACT_RIGHT": {
        if (this.Is_Valid_Move(next_right, level)) {
          valid_directions.push(ENEMY_STATES.ACT_RIGHT);
        }
        if (this.Is_Valid_Move(next_up, level)) {
          valid_directions.push(ENEMY_STATES.ACT_UP);
        }
        if (this.Is_Valid_Move(next_down, level)) {
          valid_directions.push(ENEMY_STATES.ACT_DOWN);
        }
        break;
      }
      case "ACT_UP": {
        if (this.Is_Valid_Move(next_up, level)) {
          valid_directions.push(ENEMY_STATES.ACT_UP);
        }
        if (this.Is_Valid_Move(next_left, level)) {
          valid_directions.push(ENEMY_STATES.ACT_LEFT);
        }
        if (this.Is_Valid_Move(next_right, level)) {
          valid_directions.push(ENEMY_STATES.ACT_RIGHT);
        }
        break;
      }
      case "ACT_DOWN": {
        if (this.Is_Valid_Move(next_down, level)) {
          valid_directions.push(ENEMY_STATES.ACT_DOWN);
        }
        if (this.Is_Valid_Move(next_left, level)) {
          valid_directions.push(ENEMY_STATES.ACT_LEFT);
        }
        if (this.Is_Valid_Move(next_right, level)) {
          valid_directions.push(ENEMY_STATES.ACT_RIGHT);
        }
        break;
      }
      case "PAS_LEFT": {
        if (this.Is_Valid_Move(next_left, level)) {
          valid_directions.push(ENEMY_STATES.PAS_LEFT);
        }
        if (this.Is_Valid_Move(next_up, level)) {
          valid_directions.push(ENEMY_STATES.PAS_UP);
        }
        if (this.Is_Valid_Move(next_down, level)) {
          valid_directions.push(ENEMY_STATES.PAS_DOWN);
        }
        break;
      }
      case "PAS_RIGHT": {
        if (this.Is_Valid_Move(next_right, level)) {
          valid_directions.push(ENEMY_STATES.PAS_RIGHT);
        }
        if (this.Is_Valid_Move(next_up, level)) {
          valid_directions.push(ENEMY_STATES.PAS_UP);
        }
        if (this.Is_Valid_Move(next_down, level)) {
          valid_directions.push(ENEMY_STATES.PAS_DOWN);
        }
        break;
      }
      case "PAS_UP": {
        if (this.Is_Valid_Move(next_up, level)) {
          valid_directions.push(ENEMY_STATES.PAS_UP);
        }
        if (this.Is_Valid_Move(next_left, level)) {
          valid_directions.push(ENEMY_STATES.PAS_LEFT);
        }
        if (this.Is_Valid_Move(next_right, level)) {
          valid_directions.push(ENEMY_STATES.PAS_RIGHT);
        }
        break;
      }
      case "PAS_DOWN": {
        if (this.Is_Valid_Move(next_down, level)) {
          valid_directions.push(ENEMY_STATES.PAS_DOWN);
        }
        if (this.Is_Valid_Move(next_left, level)) {
          valid_directions.push(ENEMY_STATES.PAS_LEFT);
        }
        if (this.Is_Valid_Move(next_right, level)) {
          valid_directions.push(ENEMY_STATES.PAS_RIGHT);
        }
        break;
      }
    }

    let random_direction_choice = Math.floor(Math.random() * valid_directions.length);

    return valid_directions[random_direction_choice];
  }
}

export class Active_Left extends Enemy_State {
  constructor(enemy) {
    super("ACT_LEFT", enemy);
  }

  Enter_State() {
    this.frame_count = 2;
    this.stagger = 8;
    this.sheet_animation = 0;
    this.enemy.speed = 2;
    this.state = "ACT_LEFT";
  }

  Get_Direction(level) {
    if (this.enemy.is_transitioning == false) {
      const next_state = this.Get_Next_State(level);
      if (next_state != ENEMY_STATES.ACT_LEFT) {
        this.enemy.Change_State(next_state);
      }
    }
  }

  Handle_Movement(level) {
    const is_at_center = this.enemy.position_x % level.width === 0;

    if (is_at_center && !this.enemy.is_transitioning && this.state == "ACT_LEFT") {
      this.enemy.is_transitioning = true;
      this.enemy.next_grid_position = this.Next_Grid_Position(
        ENEMY_STATES.ACT_LEFT,
        level.grid_width,
        level.grid_height
      );
    }

    if (this.enemy.is_transitioning) {
      this.enemy.position_x -= this.enemy.speed;
      if (
        this.enemy.position_x - this.enemy.next_grid_position.x * level.width <
        this.movement_threshold
      ) {
        this.enemy.position_x = this.enemy.next_grid_position.x * level.width;
        this.enemy.current_grid_position = this.enemy.next_grid_position;
        this.enemy.is_transitioning = false;
      }
    }
  }
}

export class Passive_Left extends Enemy_State {
  constructor(enemy) {
    super("PAS_LEFT", enemy);
  }

  Enter_State() {
    this.frame_count = 2;
    this.stagger = 8;
    this.sheet_animation = 1;
    this.enemy.speed = 1;
    this.state = "PAS_LEFT";
  }

  Get_Direction(level) {
    if (this.enemy.is_transitioning == false) {
      const next_state = this.Get_Next_State(level);
      if (next_state != ENEMY_STATES.PAS_LEFT) {
        this.enemy.Change_State(next_state);
      }
    }
  }

  Handle_Movement(level) {
    const is_at_center = this.enemy.position_x % level.width === 0;

    if (is_at_center && !this.enemy.is_transitioning && this.state == "PAS_LEFT") {
      this.enemy.is_transitioning = true;
      this.enemy.next_grid_position = this.Next_Grid_Position(
        ENEMY_STATES.PAS_LEFT,
        level.grid_width,
        level.grid_height
      );
    }

    if (this.enemy.is_transitioning) {
      this.enemy.position_x -= this.enemy.speed;
      if (
        this.enemy.position_x - this.enemy.next_grid_position.x * level.width <
        this.movement_threshold
      ) {
        this.enemy.position_x = this.enemy.next_grid_position.x * level.width;
        this.enemy.current_grid_position = this.enemy.next_grid_position;
        this.enemy.is_transitioning = false;
      }
    }
  }
}

export class Active_Right extends Enemy_State {
  constructor(enemy) {
    super("ACT_RIGHT", enemy);
  }

  Enter_State() {
    this.frame_count = 2;
    this.stagger = 8;
    this.sheet_animation = 0;
    this.enemy.speed = 2;
    this.state = "ACT_RIGHT";
  }

  Get_Direction(level) {
    if (this.enemy.is_transitioning == false) {
      const next_state = this.Get_Next_State(level);
      if (next_state != ENEMY_STATES.ACT_RIGHT) {
        this.enemy.Change_State(next_state);
      }
    }
  }

  Handle_Movement(level) {
    const is_at_center = this.enemy.position_x % level.width === 0;

    if (is_at_center && !this.enemy.is_transitioning && this.state == "ACT_RIGHT") {
      this.enemy.is_transitioning = true;
      this.enemy.next_grid_position = this.Next_Grid_Position(
        ENEMY_STATES.ACT_RIGHT,
        level.grid_width,
        level.grid_height
      );
    }

    if (this.enemy.is_transitioning) {
      this.enemy.position_x += this.enemy.speed;
      if (
        this.enemy.position_x - this.enemy.next_grid_position.x * level.width >
        this.movement_threshold
      ) {
        this.enemy.position_x = this.enemy.next_grid_position.x * level.width;
        this.enemy.current_grid_position = this.enemy.next_grid_position;
        this.enemy.is_transitioning = false;
      }
    }
  }
}

export class Passive_Right extends Enemy_State {
  constructor(enemy) {
    super("PAS_RIGHT", enemy);
  }

  Enter_State() {
    this.frame_count = 2;
    this.stagger = 8;
    this.sheet_animation = 1;
    this.enemy.speed = 1;
    this.state = "PAS_RIGHT";
  }

  Get_Direction(level) {
    if (this.enemy.is_transitioning == false) {
      const next_state = this.Get_Next_State(level);
      if (next_state != ENEMY_STATES.PAS_RIGHT) {
        this.enemy.Change_State(next_state);
      }
    }
  }

  Handle_Movement(level) {
    const is_at_center = this.enemy.position_x % level.width === 0;

    if (is_at_center && !this.enemy.is_transitioning && this.state == "PAS_RIGHT") {
      this.enemy.is_transitioning = true;
      this.enemy.next_grid_position = this.Next_Grid_Position(
        ENEMY_STATES.PAS_RIGHT,
        level.grid_width,
        level.grid_height
      );
    }

    if (this.enemy.is_transitioning) {
      this.enemy.position_x += this.enemy.speed;
      if (
        this.enemy.position_x - this.enemy.next_grid_position.x * level.width >
        this.movement_threshold
      ) {
        this.enemy.position_x = this.enemy.next_grid_position.x * level.width;
        this.enemy.current_grid_position = this.enemy.next_grid_position;
        this.enemy.is_transitioning = false;
      }
    }
  }
}

export class Active_Up extends Enemy_State {
  constructor(enemy) {
    super("ACT_UP", enemy);
  }

  Enter_State() {
    this.frame_count = 2;
    this.stagger = 8;
    this.sheet_animation = 0;
    this.enemy.speed = 2;
    this.state = "ACT_UP";
  }

  Get_Direction(level) {
    if (this.enemy.is_transitioning == false) {
      const next_state = this.Get_Next_State(level);
      if (next_state != ENEMY_STATES.ACT_UP) {
        this.enemy.Change_State(next_state);
      }
    }
  }

  Handle_Movement(level) {
    const is_at_center = this.enemy.position_y % level.height === 0;

    if (is_at_center && !this.enemy.is_transitioning && this.state == "ACT_UP") {
      this.enemy.is_transitioning = true;
      this.enemy.next_grid_position = this.Next_Grid_Position(
        ENEMY_STATES.ACT_UP,
        level.grid_width,
        level.grid_height
      );
    }

    if (this.enemy.is_transitioning) {
      this.enemy.position_y -= this.enemy.speed;
      if (
        this.enemy.position_y - this.enemy.next_grid_position.y * level.height <
        this.movement_threshold
      ) {
        this.enemy.position_y = this.enemy.next_grid_position.y * level.width;
        this.enemy.current_grid_position = this.enemy.next_grid_position;
        this.enemy.is_transitioning = false;
      }
    }
  }
}

export class Passive_Up extends Enemy_State {
  constructor(enemy) {
    super("PAS_UP", enemy);
  }

  Enter_State() {
    this.frame_count = 2;
    this.stagger = 8;
    this.sheet_animation = 1;
    this.enemy.speed = 1;
    this.state = "PAS_UP";
  }

  Get_Direction(level) {
    if (this.enemy.is_transitioning == false) {
      const next_state = this.Get_Next_State(level);
      if (next_state != ENEMY_STATES.PAS_UP) {
        this.enemy.Change_State(next_state);
      }
    }
  }

  Handle_Movement(level) {
    const is_at_center = this.enemy.position_y % level.height === 0;

    if (is_at_center && !this.enemy.is_transitioning && this.state == "PAS_UP") {
      this.enemy.is_transitioning = true;
      this.enemy.next_grid_position = this.Next_Grid_Position(
        ENEMY_STATES.PAS_UP,
        level.grid_width,
        level.grid_height
      );
    }

    if (this.enemy.is_transitioning) {
      this.enemy.position_y -= this.enemy.speed;
      if (
        this.enemy.position_y - this.enemy.next_grid_position.y * level.height <
        this.movement_threshold
      ) {
        this.enemy.position_y = this.enemy.next_grid_position.y * level.width;
        this.enemy.current_grid_position = this.enemy.next_grid_position;
        this.enemy.is_transitioning = false;
      }
    }
  }
}

export class Active_Down extends Enemy_State {
  constructor(enemy) {
    super("ACT_DOWN", enemy);
  }

  Enter_State() {
    this.frame_count = 2;
    this.stagger = 8;
    this.sheet_animation = 0;
    this.enemy.speed = 2;
    this.state = "ACT_DOWN";
  }

  Get_Direction(level) {
    if (this.enemy.is_transitioning == false) {
      const next_state = this.Get_Next_State(level);
      if (next_state != ENEMY_STATES.ACT_DOWN) {
        this.enemy.Change_State(next_state);
      }
    }
  }

  Handle_Movement(level) {
    const is_at_center = this.enemy.position_y % level.height === 0;

    if (is_at_center && !this.enemy.is_transitioning && this.state == "ACT_DOWN") {
      this.enemy.is_transitioning = true;
      this.enemy.next_grid_position = this.Next_Grid_Position(
        ENEMY_STATES.ACT_DOWN,
        level.grid_width,
        level.grid_height
      );
    }

    if (this.enemy.is_transitioning) {
      this.enemy.position_y += this.enemy.speed;
      if (
        this.enemy.position_y - this.enemy.next_grid_position.y * level.height >
        this.movement_threshold
      ) {
        this.enemy.position_y = this.enemy.next_grid_position.y * level.width;
        this.enemy.current_grid_position = this.enemy.next_grid_position;
        this.enemy.is_transitioning = false;
      }
    }
  }
}

export class Passive_Down extends Enemy_State {
  constructor(enemy) {
    super("PAS_DOWN", enemy);
  }

  Enter_State() {
    this.frame_count = 2;
    this.stagger = 8;
    this.sheet_animation = 1;
    this.enemy.speed = 1;
    this.state = "PAS_DOWN";
  }

  Get_Direction(level) {
    if (this.enemy.is_transitioning == false) {
      const next_state = this.Get_Next_State(level);
      if (next_state != ENEMY_STATES.PAS_DOWN) {
        this.enemy.Change_State(next_state);
      }
    }
  }

  Handle_Movement(level) {
    const is_at_center = this.enemy.position_y % level.height === 0;

    if (is_at_center && !this.enemy.is_transitioning && this.state == "PAS_DOWN") {
      this.enemy.is_transitioning = true;
      this.enemy.next_grid_position = this.Next_Grid_Position(
        ENEMY_STATES.PAS_DOWN,
        level.grid_width,
        level.grid_height
      );
    }

    if (this.enemy.is_transitioning) {
      this.enemy.position_y += this.enemy.speed;
      if (
        this.enemy.position_y - this.enemy.next_grid_position.y * level.height >
        this.movement_threshold
      ) {
        this.enemy.position_y = this.enemy.next_grid_position.y * level.width;
        this.enemy.current_grid_position = this.enemy.next_grid_position;
        this.enemy.is_transitioning = false;
      }
    }
  }
}

export class Passive_Idle extends Enemy_State {
  constructor(enemy) {
    super("PAS_IDLE", enemy);
  }

  Enter_State() {
    this.frame_count = 2;
    this.stagger = 8;
    this.sheet_animation = 1;
    this.state = "PAS_IDLE";
  }

  Get_Direction(level) {
    this.enemy.Change_State(ENEMY_STATES.ACT_UP);
  }

  Handle_Movement(level) {}
}
