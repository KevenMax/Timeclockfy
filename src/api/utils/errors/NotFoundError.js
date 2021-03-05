class NotFoundError {
  constructor(message = "Record Not Found"){
    this.message = message;
  }
}

module.exports = NotFoundError;