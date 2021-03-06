class AlreadyExistError {
  constructor(message = "Record already exist"){
    this.message = message;
  }
}

module.exports = AlreadyExistError;