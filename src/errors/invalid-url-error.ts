export class InvlaidURLError extends Error {
  constructor(msg: string) {
    super(msg);
    Object.setPrototypeOf(this, InvlaidURLError.prototype);
  }
}