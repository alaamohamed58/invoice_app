class ApiFeatures {
  constructor(queryString, query) {
    this.queryString = queryString;
    this.query = query;
  }

  ordering() {
    if (this.queryString.order) {
      this.query = this.query
        .find({})
        .sort({ _id: this.queryString.order * 1 });
    }
    return this;
  }
}

module.exports = ApiFeatures;
