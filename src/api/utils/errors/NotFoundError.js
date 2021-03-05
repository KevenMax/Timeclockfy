class NotFoundError {
  constructor(message = "Record not found"){
    this.message = message;
  }
}

module.exports = NotFoundError;