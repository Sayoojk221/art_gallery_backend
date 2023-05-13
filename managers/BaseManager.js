class BaseManager {
  constructor(table) {
    this.Table = table;
  }

  _createNew(query) {
    return new Promise((resolve, reject) => {
      new this.Table(query).save()
        .then((result) => resolve(result.toJSON()))
        .catch((error) => reject(error));
      
    });
  }

  _findOne(query) {
    return new Promise((resolve, reject) => {
      this.Table.findOne(query)
        .then((result) => resolve(result))
        .catch((error) => reject(error));
    });
  }

  _deleteOne(query) {
    return new Promise((resolve, reject) => {
      this.Table.deleteOne(query)
        .then((result) => resolve(result))
        .catch((error) => reject(error));
    });
  }

  _updateOne(query,value) {
    return new Promise((resolve, reject) => {
      this.Table.updateOne(query,value)
        .then((result) => resolve(result))
        .catch((error) => reject(error));
    });
  }
}

module.exports = BaseManager;
