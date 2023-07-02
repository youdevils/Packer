import {
  Active_Left,
  Active_Right,
  Active_Up,
  Active_Down,
  Passive_Left,
  Passive_Right,
  Passive_Up,
  Passive_Down,
  Passive_Idle,
} from "./enemy_state.js";

export default class Enemy {
  constructor(animation_sheet, source_size, destination_size, start_position) {
    // Grid Space Position
    this.original_start_position = start_position;
    this.current_grid_position = this.original_start_position;
    this.next_grid_position = this.current_grid_position;

    // Pixel Space Position
    this.position_x = this.current_grid_position.x * destination_size.width;
    this.position_y = this.current_grid_position.y * destination_size.height;

    // Sizes
    this.width = destination_size.width;
    this.height = destination_size.height;
    this.hit_box_size = this.width - 10;

    // Sprite(s)
    this.spritesheet = animation_sheet;
    this.sheet_frame = 0;
    this.sprite_width = source_size;
    this.sprite_height = source_size;

    // State Management
    this.is_transitioning = false;
    this.states = [
      new Active_Left(this),
      new Active_Right(this),
      new Active_Up(this),
      new Active_Down(this),
      new Passive_Left(this),
      new Passive_Right(this),
      new Passive_Up(this),
      new Passive_Down(this),
      new Passive_Idle(this),
    ];
    this.current_state = this.states[8];

    // Gameplay
    this.level = destination_size;
    this.speed = 2;
    this.current_frame_counter = 0;
  }

  Update(level) {
    this.current_state.Get_Direction(level);
    this.current_state.Handle_Movement(level);
  }

  Draw(context, game_frame, canvas_width, canvas_height) {
    context.drawImage(
      this.spritesheet,
      this.current_frame_counter * this.sprite_width,
      this.current_state.sheet_animation * this.sprite_height,
      this.sprite_width,
      this.sprite_height,
      this.position_x,
      this.position_y,
      this.width,
      this.height
    );

    // Draw Horizontal Wrap
    if (this.position_x + this.width > canvas_width) {
      const offset = this.position_x - canvas_width;

      context.drawImage(
        this.spritesheet,
        this.current_frame_counter * this.sprite_width,
        this.current_state.sheet_animation * this.sprite_height,
        this.sprite_width,
        this.sprite_height,
        0 + offset,
        this.position_y,
        this.width,
        this.height
      );

      if (offset === 0) {
        this.position_x = 0;
      }
    } else if (this.position_x < 0) {
      const offset = this.position_x + canvas_width;
      context.drawImage(
        this.spritesheet,
        this.current_frame_counter * this.sprite_width,
        this.current_state.sheet_animation * this.sprite_height,
        this.sprite_width,
        this.sprite_height,
        offset,
        this.position_y,
        this.width,
        this.height
      );

      if (offset === canvas_width - this.width) {
        this.position_x = canvas_width - this.width;
      }
    }
    // Draw Vertical Wrap
    if (this.position_y + this.height > canvas_height) {
      const offset = this.position_y - canvas_height;

      context.drawImage(
        this.spritesheet,
        this.current_frame_counter * this.sprite_width,
        this.current_state.sheet_animation * this.sprite_height,
        this.sprite_width,
        this.sprite_height,
        this.position_x,
        0 + offset,
        this.width,
        this.height
      );

      if (offset === 0) {
        this.position_y = 0;
      }
    } else if (this.position_y < 0) {
      const offset = this.position_y + canvas_height;
      context.drawImage(
        this.spritesheet,
        this.current_frame_counter * this.sprite_width,
        this.current_state.sheet_animation * this.sprite_height,
        this.sprite_width,
        this.sprite_height,
        this.position_x,
        offset,
        this.width,
        this.height
      );

      if (offset === canvas_height - this.height) {
        this.position_y = canvas_height - this.height;
      }
    }

    // Animation Speed Management
    if (game_frame % this.current_state.stagger === 0) {
      if (this.current_frame_counter < this.current_state.frame_count) {
        this.current_frame_counter++;
      } else {
        this.current_frame_counter = 0;
      }
    }
  }

  Change_State(state) {
    this.current_state = this.states[state];
    this.current_state.Enter_State();
  }

  Check_Is_Vulnerable() {
    if (
      this.current_state.state == "ACT_LEFT" ||
      this.current_state.state == "ACT_RIGHT" ||
      this.current_state.state == "ACT_UP" ||
      this.current_state.state == "ACT_DOWN" ||
      this.current_state.state == "PAS_IDLE"
    ) {
      return false;
    } else {
      return true;
    }
  }

  Handle_Player_Hit() {
    this.position_x = this.original_start_position.x * this.width;
    this.position_y = this.original_start_position.y * this.height;
    this.current_grid_position = this.original_start_position;
    this.next_grid_position = this.current_grid_position;
    this.current_frame_counter = 0;
    this.is_transitioning = false;
    this.Change_State(8);
  }

  Set_Passive() {
    if (this.current_state.state == "ACT_LEFT") {
      this.Change_State(4);
    } else if (this.current_state.state == "ACT_RIGHT") {
      this.Change_State(5);
    } else if (this.current_state.state == "ACT_UP") {
      this.Change_State(6);
    } else if (this.current_state.state == "ACT_DOWN") {
      this.Change_State(7);
    }
  }

  Set_Active() {
    if (this.current_state.state == "PAS_LEFT") {
      this.Change_State(0);
    } else if (this.current_state.state == "PAS_RIGHT") {
      this.Change_State(1);
    } else if (this.current_state.state == "PAS_UP") {
      this.Change_State(2);
    } else if (this.current_state.state == "PAS_DOWN") {
      this.Change_State(3);
    }
  }

  Check_Is_Active() {
    const state = this.current_state.state;
    if (state == "ACT_LEFT" || state == "ACT_RIGHT" || state == "ACT_UP" || state == "ACT_DOWN") {
      return true;
    }
    return false;
  }
}
