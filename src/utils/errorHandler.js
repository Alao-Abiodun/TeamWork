class errorHandler extends error {
  constructor(message, status) {
    super();
    this.message = message;
    this.status = status;
  }
}

export default errorHandler;
