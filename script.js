import Player from "./js/player.js";
import InputHandler from "./js/input.js";
import { Level } from "./js/level.js";
import { Level_Data } from "./js/game_data.js";
import { Collision_Manager } from "./js/utils.js";
import Enemy from "./js/enemy.js";

window.addEventListener("load", function () {
  // ----- HTML Elements
  const canvas_element = document.getElementById("canvas1");
  const life_text_element = document.getElementById("lifeText");
  const yellow_text_element = document.getElementById("yellowText");
  const red_text_element = document.getElementById("redText");
  const score_text_element = document.getElementById("scoreText");
  const in_game_overlay_element = this.document.getElementById("inGameOverlay");
  const countdown_image_element = this.document.getElementById("countdown_image");

  // ----- Canvas Setup
  const canvas_context = canvas_element.getContext("2d");
  const canvas_width = (canvas_element.width = 800);
  const canvas_height = (canvas_element.height = 608);

  // ----- Input Manager
  const input_manager = new InputHandler();

  // ----- Level Setup
  const level = new Level(Level_Data[0]);

  // ----- Gameplay
  const yellow_value = 10;
  const red_value = 100;
  const enemy_value = 500;
  const total_yellow_coins = level.Get_Total_Yellow_Coins();
  const total_red_coins = level.Get_Total_Red_Coins();

  let game_frame_counter = 0;
  let game_started = false;
  let game_over = false;

  const start_countdown_time = 3;
  let start_round_timer = Math.floor(Date.now() / 1000);
  const enemy_vulnerability_time = 8;
  let vulnerability_timer = Math.floor(Date.now() / 1000);

  let yellow_gathered_counter = 0;
  let red_gathered_counter = 0;
  let total_score = 0;

  // ----- Player Setup
  const player_sprite = new Image();
  player_sprite.src = "./assets/playersheet.png";
  const player_sprite_size = 32;
  const player_start_position = level.Get_Player_Start_Position();
  let player_one = new Player(player_sprite, player_sprite_size, 32, player_start_position);

  // ----- Enemy Setup
  let enemy_list = [];
  const enemy_start_points = level.Get_Enemy_Start_Points();
  const total_enemies = enemy_start_points.length;
  const enemy_sprite = new Image();
  enemy_sprite.src = "./assets/enemysheet.png";
  const enemy_sprite_size = 32;
  for (let index = 0; index < total_enemies; index++) {
    enemy_list.push(new Enemy(enemy_sprite, enemy_sprite_size, level, enemy_start_points[index]));
  }

  // ----- Setup Dynamic Values Before New Game
  yellow_text_element.textContent = yellow_gathered_counter + " / " + total_yellow_coins + " Found";
  red_text_element.textContent = red_gathered_counter + " / " + total_red_coins + " Used";
  score_text_element.textContent = total_score;

  function Game_Loop() {
    // ----- Game Start Countdown (Game Entry and On Hit without Game Over)
    if (game_started == false && game_over == false) {
      const current_start_time = Math.floor(Date.now() / 1000);
      const time_elapsed = current_start_time - start_round_timer;
      const counter = 3 - time_elapsed;
      if (counter >= 0) {
        in_game_overlay_element.style.display = "block";
        countdown_image_element.src = "./assets/" + (3 - time_elapsed) + ".png";
      }
      if (time_elapsed > start_countdown_time) {
        game_started = true;
        in_game_overlay_element.style.display = "none";
      }
    }

    if (game_over == true) {
      in_game_overlay_element.style.display = "block";
    }

    /***************
     * UPDATE GAME *
     ***************/

    if (game_started == true && game_over == false) {
      // ----- Update Player
      player_one.Update(input_manager, level);
      // ----- Update Enemy
      for (let index = 0; index < total_enemies; index++) {
        enemy_list[index].Update(level);
      }

      // ----- Handle Item Collison
      let collision_outcome = Collision_Manager.Has_Coin_Collision(player_one, level);
      if (collision_outcome == 1) {
        // Hit Yellow Coin
        yellow_gathered_counter++;
        total_score += yellow_value;
        yellow_text_element.textContent =
          yellow_gathered_counter + " / " + total_yellow_coins + " Found";
        score_text_element.textContent = total_score;

        // ----- GAME OVER (WIN)
        if (yellow_gathered_counter == total_yellow_coins) {
          game_over = true;
          countdown_image_element.src = "./assets/gameWin.png";
        }
      } else if (collision_outcome == 2) {
        // Hit Red Coin
        red_gathered_counter++;
        total_score += red_value;
        red_text_element.textContent = red_gathered_counter + " / " + total_red_coins + " Used";
        score_text_element.textContent = total_score;
        // Enemy Vulnerability Reset
        vulnerability_timer = Math.floor(Date.now() / 1000);
        for (let index = 0; index < total_enemies; index++) {
          if (enemy_list[index].Check_Is_Active()) {
            enemy_list[index].Set_Passive();
          }
        }
      }

      // ----- Handle Enemy Vulnerable State Countdown
      const currentTime = Math.floor(Date.now() / 1000);
      const elapsedTime = currentTime - vulnerability_timer;
      if (elapsedTime >= enemy_vulnerability_time) {
        for (let index = 0; index < total_enemies; index++) {
          if (!enemy_list[index].Check_Is_Active()) {
            enemy_list[index].Set_Active();
          }
        }
      }

      // ----- Handle Enemy Collison
      for (let index = 0; index < total_enemies; index++) {
        if (Collision_Manager.Has_Enemy_Collision(player_one, enemy_list[index])) {
          if (enemy_list[index].Check_Is_Active()) {
            player_one.Handle_Enemy_Hit();

            // ----- GAME OVER (LOSSED)
            if (player_one.health <= 0) {
              game_over = true;
              countdown_image_element.src = "./assets/gameLoss.png";
            }
            for (let index = 0; index < total_enemies; index++) {
              enemy_list[index].Handle_Player_Hit();
            }
            life_text_element.textContent = player_one.health + " / " + " 4 Left";
            game_started = false;
            start_round_timer = Math.floor(Date.now() / 1000);
            break;
          } else {
            total_score += enemy_value;
            score_text_element.textContent = total_score;
            enemy_list[index].Handle_Player_Hit();
            break;
          }
        }
      }
    }

    /*************
     * DRAW GAME *
     *************/

    // ----- Clear Canvas
    canvas_context.clearRect(0, 0, canvas_width, canvas_height);

    // ----- Draw Level
    level.Draw(canvas_context, game_frame_counter);
    // ----- Draw Enemy
    for (let index = 0; index < total_enemies; index++) {
      enemy_list[index].Draw(canvas_context, game_frame_counter, canvas_width, canvas_height);
    }

    // ----- Draw Player
    player_one.Draw(canvas_context, game_frame_counter, canvas_width, canvas_height);

    if (game_started == false || game_over == true) {
      canvas_context.fillStyle = "rgba(0, 0, 0, 0.3)";
      canvas_context.fillRect(0, 0, canvas_width, canvas_height);
    }

    // ----- Increment Game Frame Counter
    game_frame_counter++;

    // ----- Call Next Game Loop
    requestAnimationFrame(Game_Loop);
  }
  Game_Loop();
});
