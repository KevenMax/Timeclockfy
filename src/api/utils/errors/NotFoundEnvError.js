class NotFoundEnvError {
  constructor(message = "Not found environment"){
    this.message = message;
  }
}

module.exports = NotFoundEnvError;