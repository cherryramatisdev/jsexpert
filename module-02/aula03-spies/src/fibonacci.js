export default class Fibonacci {
  *execute(input, current = 0, next = 1) {
    if (input === 0) return 0;

    // return the value
    yield current;
    // delegate the function, but don't return the value
    yield* this.execute(input - 1, next, current + next);
  }
}
