import { Left, Right, Up, Down, Idle } from "./player_state.js";

export default class Player {
  constructor(animation_sheet, source_size, destination_size, start_position) {
    // Grid Space Position
    this.original_start_position = start_position;
    this.current_grid_position = this.original_start_position;
    this.next_grid_position = this.current_grid_position;

    // Pixel Space Position
    this.position_x = start_position.x * destination_size;
    this.position_y = start_position.y * destination_size;

    // Sizes
    this.width = destination_size;
    this.height = destination_size;
    this.hit_box_size = destination_size - 2;

    // Sprite(s)
    this.spritesheet = animation_sheet;
    this.sprite_width = source_size;
    this.sprite_height = source_size;

    // State Management
    this.is_transitioning = false;
    this.states = [new Down(this), new Left(this), new Up(this), new Right(this), new Idle(this)];
    this.current_state = this.states[4];

    // Gameplay
    this.speed = 2;
    this.max_health = 4;
    this.health = this.max_health;

    // Draw
    this.current_frame_counter = 0;
  }

  Update(input, level) {
    this.current_state.Handle_Input(input, level);
    this.current_state.Handle_Movement(input, level);
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

  Handle_Enemy_Hit() {
    this.position_x = this.original_start_position.x * this.width;
    this.position_y = this.original_start_position.y * this.height;
    this.current_grid_position = this.original_start_position;
    this.next_grid_position = this.current_grid_position;
    this.current_frame_counter = 0;
    this.health--;
    this.current_state = this.states[4];
    this.current_state.Enter_State();
  }
}
