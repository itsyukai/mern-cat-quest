class Player {
  #name;
  #health;
  #maxHealth;

  get name() {
    return this.#name;
  }

  set name(newValue) {
    this.#name = newValue;
  }

  get health() {
    return this.#health;
  }

  set health(newValue) {
    this.#health = newValue;
  }

  get maxHealth() {
    return this.#maxHealth;
  }

  set maxHealth(newValue) {
    this.#maxHealth = newValue;
  }

  damage(val) {
    this.#health -= val;
    console.log(this.health);
  }

  constructor(name) {
    this.#name = name;
    this.#health = 10;
    this.#maxHealth = 10;
  }
}
export default Player;
