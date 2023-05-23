const BaseManager = require("./BaseManager");

class ArtManager extends BaseManager {
  constructor(wagner) {
    super(wagner.get("Art"));
    this.wagner = wagner;
  }

  createArt(options) {
    return new Promise((resolve, reject) => {
      this._findOne({ author: options.author, name: options.name })
        .then(async (art) => {
          try {
            if (art)
              return reject(new Error("Art with same name already exists."));

            for (const key of options.topics) {
              const valid = await this.wagner
                .get("ArtTopic")
                .findOne({ topic: key });

              if (!valid) {
                reject(new Error("Invalid topic."));
                return;
              }
            }

            const newArt = await this._createNew(options);

            resolve(newArt);
          } catch (error) {
            reject(error);
          }
        })
        .catch((err) => reject(err));
    });
  }

  paginateArts(options) {
    return new Promise((resolve, reject) => {
      const pageNumber = options.pageNumber;
      const pageSize = options.pageSize;
      const skips = pageSize * (pageNumber - 1);

      this.Table.find(options.query || {})
        .skip(skips)
        .limit(options.pageSize)
        .sort("-published_date")
        .select("name artImage comments favorites -_id")
        .populate("author", "fname lname -_id")
        .then((docs) => {
          const startIndex = (pageNumber - 1) * pageSize;
          const endIndex = startIndex + pageSize;

          if (docs.length) {
            return resolve({
              listOfArts: docs,
              page: pageNumber,
              pageSize,
              startIndex,
              endIndex,
            });
          }
          resolve({ listOfArts: [] });
        })
        .catch((err) => reject(err));
    });
  }

  searchArt(options) {
    return new Promise((resolve, reject) => {
      this.paginateArts({
        pageNumber: options.pageNumber,
        pageSize: 10,
        query: { $text: { $search: options.searchText } },
      })
        .then((result) => resolve(result))
        .catch((error) => reject(error));
    });
  }
}

module.exports = ArtManager;
