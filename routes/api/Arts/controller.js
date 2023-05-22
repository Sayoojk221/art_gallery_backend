const { check } = require("express-validator");
const wagner = require("wagner-core");
const fs = require("fs");
const sizeOf = require("image-size");
const { status } = require("../../../helper/constants");
const RunValidation = require("../../../middleware/RunValidation");

const controllers = {};

controllers.createTopic = [
  check("topic", "Topic is required").not().isEmpty(),
  RunValidation,
  async (req, res, next) => {
    try {
      const isExists = await wagner
        .get("ArtTopic")
        .findOne({ topic: req.body.topic });
      if (isExists)
        return res
          .status(status.badRequest)
          .json({ error: "Topic already exists." });

      const topic = await new wagner.get("ArtTopic")({
        topic: req.body.topic,
      }).save();

      res.status(status.ok).json(topic);
    } catch (error) {
      next(error);
    }
  },
];

controllers.topics = async (req, res, next) => {
  try {
    const topics = await wagner.get("ArtTopic").find({});
    res.status(status.ok).json(topics);
  } catch (error) {
    next(error);
  }
};

controllers.addArt = [
  check("image", "Art image is required").not().isEmpty(),
  check("tags", "At least one tag is required").not().isEmpty().isArray(),
  check("topics", "At least one topic is required").not().isEmpty().isArray(),
  check("name", "Art name is required").not().isEmpty(),
  RunValidation,
  async (req, res, next) => {
    const fileName = `image-${Date.now()}.png`;
    const filePath = `uploads/${fileName}`;

    // Convert the base64 image data to a buffer
    const imageBuffer = Buffer.from(req.body.image, "base64");

    fs.writeFile(filePath, imageBuffer, async (error) => {
      try {
        if (error) {
          return res
            .status(status.badRequest)
            .json({ error: "Failed to upload image." });
        }

        const dimensions = sizeOf(imageBuffer);

        const width = dimensions.width;
        const height = dimensions.height;

        const newArtDetails = { ...req.body };
        newArtDetails.author = req.customer._id;

        newArtDetails.artImage = fileName;
        newArtDetails.imageDetails = {
          ratio: `${width}x${height}px`,
          size: Buffer.byteLength(imageBuffer),
        };

        const art = await wagner.get("ArtManager").createArt(newArtDetails);

        delete art._id;

        res.status(status.ok).json(art);
      } catch (error) {
        wagner.get("Utils").removeUploadedFile(fileName);
        next(error);
      }
    });
  },
];

controllers.listOfArts = async (req, res, next) => {
  try {
    const pageSize = 10;
    const pageNumber = parseInt(req.params.page) || 1;

    const topics = await wagner
      .get("ArtManager")
      .paginateArts({ pageSize, pageNumber });

    res.status(status.ok).json(topics);
  } catch (error) {
    next(error);
  }
};

controllers.singleArt = async (req, res, next) => {
  try {
    
    const art = await wagner
      .get("ArtManager")
      ._findOne({ name: req.query.name });
    if (!art) {
      return res
        .status(status.badRequest)
        .json({ error: "Invalid art details." });
    }

    res.status(status.ok).json(art);
  } catch (error) {
    next(error);
  }
};

module.exports = controllers;
