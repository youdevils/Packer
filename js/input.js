export default class InputHandler {
  constructor() {
    this.last_key = "";
    window.addEventListener("keydown", (e) => {
      switch (e.key) {
        case "ArrowLeft":
          this.last_key = "Left Down";
          break;
        case "ArrowRight":
          this.last_key = "Right Down";
          break;
        case "ArrowUp":
          this.last_key = "Up Down";
          break;
        case "ArrowDown":
          this.last_key = "Down Down";
          break;
      }
    });
    window.addEventListener("keyup", (e) => {
      switch (e.key) {
        case "ArrowLeft":
          this.last_key = "Left Up";
          break;
        case "ArrowRight":
          this.last_key = "Right Up";
          break;
        case "ArrowUp":
          this.last_key = "Up Up";
          break;
        case "ArrowDown":
          this.last_key = "Down Up";
          break;
      }
    });
  }
}
