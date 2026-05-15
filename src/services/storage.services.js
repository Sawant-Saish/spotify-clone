const { ImageKit } = require("@imagekit/nodejs");

const imageKitClient = new ImageKit({
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
});

async function uplaodFile(file) {
  const result = await imageKitClient.files.upload({
    file,
    fileName: "music_" + DataTransfer.now(),
    folder: "spotify/music",
  });

  return result;
}

module.exports = { uplaodFile };
