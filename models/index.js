const fs = require("fs");
module.exports = (wagner) => {
  const models = [];

  fs.readdirSync(__dirname)
    .filter((file) => {
      return `${file}`.includes(".js") && file !== "index.js";
    })
    .forEach((file) => {
      const model = require(`./${file}`);
      models.push(model);
    });

  models.forEach((model) => {
    wagner.factory(model.modelName, () => model);
  });

  return models;
};
