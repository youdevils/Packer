import { Point } from "./utils.js";

export const PLAYER_STATES = {
  DOWN: 0,
  LEFT: 1,
  UP: 2,
  RIGHT: 3,
  IDLE: 4,
};

class Player_State {
  constructor(current_state, player) {
    this.player = player;
    this.state = current_state;
    this.intended_direction = null;
    this.movement_threshold = 0.1;

    // Defaults
    this.frame_count = 3;
    this.stagger = 15;
    this.sheet_animation = 4;
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
      case PLAYER_STATES.LEFT: {
        let next_x = this.player.current_grid_position.x - 1;
        if (next_x < 0) {
          next_x = grid_width - 1;
        }
        return new Point(next_x, this.player.current_grid_position.y);
      }
      case PLAYER_STATES.RIGHT: {
        let next_x = this.player.current_grid_position.x + 1;
        if (next_x > grid_width - 1) {
          next_x = 0;
        }
        return new Point(next_x, this.player.current_grid_position.y);
      }
      case PLAYER_STATES.UP: {
        let next_y = this.player.current_grid_position.y - 1;
        if (next_y < 0) {
          next_y = grid_height - 1;
        }
        return new Point(this.player.current_grid_position.x, next_y);
      }
      case PLAYER_STATES.DOWN: {
        let next_y = this.player.current_grid_position.y + 1;
        if (next_y > grid_height - 1) {
          next_y = 0;
        }
        return new Point(this.player.current_grid_position.x, next_y);
      }
    }
  }
}

export class Idle extends Player_State {
  constructor(player) {
    super("IDLE", player);
  }

  Enter_State() {
    this.frame_count = 3;
    this.stagger = 15;
    this.sheet_animation = 4;
    this.intended_direction = null;
    this.player.is_transitioning = false;
  }

  Handle_Input(input, level) {
    switch (input.last_key) {
      case "Left Up":
        input.last_key = "";
        this.player.Change_State(PLAYER_STATES.LEFT);
        break;
      case "Right Down":
        input.last_key = "";
        this.player.Change_State(PLAYER_STATES.RIGHT);
        break;
      case "Up Up":
        input.last_key = "";
        this.player.Change_State(PLAYER_STATES.UP);
        break;
      case "Down Down":
        input.last_key = "";
        this.player.Change_State(PLAYER_STATES.DOWN);
        break;
    }
  }

  Handle_Movement(input, level) {}
}

export class Left extends Player_State {
  constructor(player) {
    super("LEFT", player);
  }

  Enter_State() {
    this.frame_count = 3;
    this.stagger = 8;
    this.sheet_animation = 1;
    this.intended_direction = PLAYER_STATES.LEFT;
  }

  Handle_Input(input, level) {
    switch (input.last_key) {
      case "Up Up": {
        input.last_key = "";
        this.intended_direction = PLAYER_STATES.UP;
        break;
      }
      case "Down Up": {
        input.last_key = "";
        this.intended_direction = PLAYER_STATES.DOWN;
        break;
      }
      case "Left Up": {
        input.last_key = "";
        this.intended_direction = PLAYER_STATES.LEFT;
        break;
      }
    }
  }

  Handle_Movement(input, level) {
    const is_at_center = this.player.position_x % level.width === 0;
    const is_changed_direction = this.intended_direction != PLAYER_STATES.LEFT;

    if (is_at_center && !this.player.is_transitioning) {
      this.player.next_grid_position = this.Next_Grid_Position(
        this.intended_direction,
        level.grid_width,
        level.grid_height
      );

      const is_valid_move = this.Is_Valid_Move(this.player.next_grid_position, level);

      if (is_valid_move && is_changed_direction) {
        this.player.Change_State(this.intended_direction);
      } else if (!is_valid_move && is_changed_direction) {
        this.intended_direction = PLAYER_STATES.LEFT;
        input.last_key = "Left Up";
      } else if (is_valid_move && !is_changed_direction) {
        this.player.is_transitioning = true;
      } else if (!is_valid_move && !is_changed_direction) {
        this.player.Change_State(PLAYER_STATES.IDLE);
      }
    }

    if (this.player.is_transitioning) {
      this.player.position_x -= this.player.speed;
      if (
        this.player.position_x - this.player.next_grid_position.x * level.width <
        this.movement_threshold
      ) {
        this.player.position_x = this.player.next_grid_position.x * level.width;
        this.player.current_grid_position = this.player.next_grid_position;
        this.player.is_transitioning = false;
      }
    }
  }
}

export class Right extends Player_State {
  constructor(player) {
    super("RIGHT", player);
  }

  Enter_State() {
    this.frame_count = 3;
    this.stagger = 8;
    this.sheet_animation = 3;
    this.intended_direction = PLAYER_STATES.RIGHT;
  }

  Handle_Input(input, level) {
    switch (input.last_key) {
      case "Up Up": {
        input.last_key = "";
        this.intended_direction = PLAYER_STATES.UP;
        break;
      }
      case "Down Up": {
        input.last_key = "";
        this.intended_direction = PLAYER_STATES.DOWN;
        break;
      }
      case "Right Up": {
        input.last_key = "";
        this.intended_direction = PLAYER_STATES.RIGHT;
        break;
      }
    }
  }

  Handle_Movement(input, level) {
    const is_at_center = this.player.position_x % level.width === 0;
    const is_changed_direction = this.intended_direction != PLAYER_STATES.RIGHT;

    if (is_at_center && !this.player.is_transitioning) {
      this.player.next_grid_position = this.Next_Grid_Position(
        this.intended_direction,
        level.grid_width,
        level.grid_height
      );

      const is_valid_move = this.Is_Valid_Move(this.player.next_grid_position, level);

      if (is_valid_move && is_changed_direction) {
        this.player.Change_State(this.intended_direction);
      } else if (!is_valid_move && is_changed_direction) {
        this.intended_direction = PLAYER_STATES.RIGHT;
        input.last_key = "Right Up";
      } else if (is_valid_move && !is_changed_direction) {
        this.player.is_transitioning = true;
      } else if (!is_valid_move && !is_changed_direction) {
        this.player.Change_State(PLAYER_STATES.IDLE);
      }
    }

    if (this.player.is_transitioning) {
      this.player.position_x += this.player.speed;
      if (
        this.player.position_x - this.player.next_grid_position.x * level.width >
        this.movement_threshold
      ) {
        this.player.position_x = this.player.next_grid_position.x * level.width;
        this.player.current_grid_position = this.player.next_grid_position;
        this.player.is_transitioning = false;
      }
    }
  }
}

export class Up extends Player_State {
  constructor(player) {
    super("UP", player);
  }

  Enter_State() {
    this.frame_count = 3;
    this.stagger = 8;
    this.sheet_animation = 2;
    this.intended_direction = PLAYER_STATES.UP;
  }

  Handle_Input(input, level) {
    switch (input.last_key) {
      case "Left Up": {
        input.last_key = "";
        this.intended_direction = PLAYER_STATES.LEFT;
        break;
      }
      case "Right Up": {
        input.last_key = "";
        this.intended_direction = PLAYER_STATES.RIGHT;
        break;
      }
      case "Up Up": {
        input.last_key = "";
        this.intended_direction = PLAYER_STATES.UP;
        break;
      }
    }
  }

  Handle_Movement(input, level) {
    const is_at_center = this.player.position_y % level.height === 0;
    const is_changed_direction = this.intended_direction != PLAYER_STATES.UP;

    if (is_at_center && !this.player.is_transitioning) {
      this.player.next_grid_position = this.Next_Grid_Position(
        this.intended_direction,
        level.grid_width,
        level.grid_height
      );

      const is_valid_move = this.Is_Valid_Move(this.player.next_grid_position, level);

      if (is_valid_move && is_changed_direction) {
        this.player.Change_State(this.intended_direction);
      } else if (!is_valid_move && is_changed_direction) {
        this.intended_direction = PLAYER_STATES.UP;
        input.last_key = "Up Up";
      } else if (is_valid_move && !is_changed_direction) {
        this.player.is_transitioning = true;
      } else if (!is_valid_move && !is_changed_direction) {
        this.player.Change_State(PLAYER_STATES.IDLE);
      }
    }

    if (this.player.is_transitioning) {
      this.player.position_y -= this.player.speed;
      if (
        this.player.position_y - this.player.next_grid_position.y * level.height <
        this.movement_threshold
      ) {
        this.player.position_y = this.player.next_grid_position.y * level.width;
        this.player.current_grid_position = this.player.next_grid_position;
        this.player.is_transitioning = false;
      }
    }
  }
}

export class Down extends Player_State {
  constructor(player) {
    super("DOWN", player);
  }

  Enter_State() {
    this.frame_count = 3;
    this.stagger = 8;
    this.sheet_animation = 0;
    this.intended_direction = PLAYER_STATES.DOWN;
  }

  Handle_Input(input, level) {
    switch (input.last_key) {
      case "Left Up": {
        input.last_key = "";
        this.intended_direction = PLAYER_STATES.LEFT;
        break;
      }
      case "Right Up": {
        input.last_key = "";
        this.intended_direction = PLAYER_STATES.RIGHT;
        break;
      }
      case "Down Up": {
        input.last_key = "";
        this.intended_direction = PLAYER_STATES.DOWN;
        break;
      }
    }
  }

  Handle_Movement(input, level) {
    const is_at_center = this.player.position_y % level.height === 0;
    const is_changed_direction = this.intended_direction != PLAYER_STATES.DOWN;

    if (is_at_center && !this.player.is_transitioning) {
      this.player.next_grid_position = this.Next_Grid_Position(
        this.intended_direction,
        level.grid_width,
        level.grid_height
      );

      const is_valid_move = this.Is_Valid_Move(this.player.next_grid_position, level);

      if (is_valid_move && is_changed_direction) {
        this.player.Change_State(this.intended_direction);
      } else if (!is_valid_move && is_changed_direction) {
        this.intended_direction = PLAYER_STATES.DOWN;
        input.last_key = "Down Up";
      } else if (is_valid_move && !is_changed_direction) {
        this.player.is_transitioning = true;
      } else if (!is_valid_move && !is_changed_direction) {
        this.player.Change_State(PLAYER_STATES.IDLE);
      }
    }

    if (this.player.is_transitioning) {
      this.player.position_y += this.player.speed;
      if (
        this.player.position_y - this.player.next_grid_position.y * level.height >
        this.movement_threshold
      ) {
        this.player.position_y = this.player.next_grid_position.y * level.width;
        this.player.current_grid_position = this.player.next_grid_position;
        this.player.is_transitioning = false;
      }
    }
  }
}
