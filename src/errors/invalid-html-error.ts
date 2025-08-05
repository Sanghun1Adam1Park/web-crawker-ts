export class InvlaidHTMLError extends Error {
  constructor(msg: string) {
    super(msg);
    Object.setPrototypeOf(this, InvlaidHTMLError.prototype);
  }
}