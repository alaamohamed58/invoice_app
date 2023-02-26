class ApiFeatures {
  constructor(queryString, query) {
    this.queryString = queryString;
    this.query = query;
  }
  //ordering
  ordering() {
    if (this.queryString.order) {
      this.query = this.query
        .find({})
        .sort({ _id: this.queryString.order * 1 });
    }
    return this;
  }
  //filtering
  filtering() {
    const queryObj = { ...this.queryString };
    const excludedFields = ["page", "sort", "limit", "fields"];
    excludedFields.forEach((el) => delete queryObj[el]);

    // 1B) Advanced filtering
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

    this.query = this.query.find(JSON.parse(queryStr));

    return this;
  }

  //sorting
  sort() {
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(",").join(" ");
      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort("-createdAt");
    }

    return this;
  }
  //limit fields
  limitFields() {
    if (this.queryString.fields) {
      const fields = this.queryString.fields.split(",").join(" ");
      this.query = this.query.select(fields);
    } else {
      this.query = this.query.select("-__v");
    }
    return this;
  }

  //pagination
  paginate() {
    const page = this.queryString.page * 1 || 1;
    const limit = 10;
    this.query = this.query.skip(limit * (page - 1)).limit(limit);
    return this;
  }
}

module.exports = ApiFeatures;
