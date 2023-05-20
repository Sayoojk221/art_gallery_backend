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
}

module.exports = ArtManager;
