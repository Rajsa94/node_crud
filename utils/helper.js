class NotFoundError extends Error {
    constructor(message) {
      super(message);
      this.name = 'ValidationError';
      this.errorcode = 404;
    }
  }
  
  class InternalError extends Error {
    constructor(message) {
      super(message);
      this.name = 'InternalError';
      this.errorcode = 500;
    }
  }
  
  class UnAuthorisedError extends Error {
    constructor(message) {
      super(message);
      this.name = 'UnAuthorisedError';
      this.errorcode = 401;
    }
  }
  
  class BadRequestError extends Error {
    constructor(message) {
      super(message);
      this.name = 'BadRequestError';
      this.errorcode = 400;
    }
  }
  
  class SQLError extends Error {
    constructor(error) {
      if (error.original) {
        switch (error.original.code) {
          case 'ER_DUP_ENTRY':
            super('Resource already exists');
            this.name = 'SQLError';
            this.errorcode = 409;
            break;
          default:
            super(error.message);
            this.name = 'InternalError';
            this.errorcode = 500;
            break;
        }
      } else {
        super(error.message);
        this.name = 'InternalError';
        this.errorcode = 500;
      }
    }
  }
  
  class DBError extends Error {
    constructor(message, code) {
      super(message);
      this.name = 'DBError';
      this.errorcode = 500;
      this.code = code;
    }
  }
  
  module.exports = {
    NotFoundError,
    InternalError,
    UnAuthorisedError,
    BadRequestError,
    DBError,
    SQLError,
  };
  