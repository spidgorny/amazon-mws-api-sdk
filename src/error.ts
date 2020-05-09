/* eslint-disable max-classes-per-file */
export class MWSError extends Error {
  constructor(...parameters: string[]) {
    // Propagate some vendor-specific arguments
    super(...parameters)

    // If someone downlevels the compilation target to es5
    Object.setPrototypeOf(this, MWSError.prototype)

    // Maintains proper stack trace (only available on V8)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, MWSError)
    }
  }
}

export class HttpError extends MWSError {
  public message = 'MWS: Encountered an error while sending a request: '

  constructor(public error: Error, ...parameters: string[]) {
    super(...parameters)
    this.message += error.message
    Object.setPrototypeOf(this, HttpError.prototype)

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, HttpError)
    }
  }
}

export class ParsingError extends MWSError {
  public message = 'MWS: Encountered an error while parsing a response: '

  constructor(public error: string, ...parameters: string[]) {
    super(...parameters)
    this.message += error
    Object.setPrototypeOf(this, ParsingError.prototype)

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ParsingError)
    }
  }
}
/* eslint-enable max-classes-per-file */
