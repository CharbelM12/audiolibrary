const mongoose = require("mongoose");
const config = require("./src/configs/config");
const AlbumService = require("./src/album/album.service");
const albumService = new AlbumService();
const SongService = require("./src/song/song.service");
const songService = new SongService();
const CategoryService = require("./src/category/category.service");
const categoryService = new CategoryService();

async function connect() {
  try {
    await mongoose.connect(config.mongodbConnectionString);
    console.log("Mongodb connected");
  } catch (error) {
    throw error;
  }
}

async function testFunction() {
  try {
    const popCategory = await categoryService.addCategory({
      name: "pop",
      description:
        "Pop music is an abbreviation of the word 'popular.It's a contemporary form of music that appeals to a very wide audience. It often includes a danceable tempo, easy to remember lyrics, and simple notation.",
    });
    const jazzCategory = await categoryService.addCategory({
      name: "jazz",
      description:
        "American music developed especially from ragtime and blues and characterized by propulsive syncopated rhythms, polyphonic ensemble playing, varying degrees of improvisation, and often deliberate distortions of pitch and timbre.",
    });
    const myAlbum = await albumService.addAlbum({
      name: "My Album",
      description: "this album contains my favorite songs",
      showNbTracks: true,
    });
    await songService.addSong(myAlbum._id, {
      name: "Beat it",
      singer: "Michael Jackson",
      categoryId: popCategory._id,
    });
    await songService.addSong(myAlbum._id, {
      name: "Rolling in the deep",
      singer: "Adele",
      categoryId: popCategory._id,
    });
    const myAlbumSong3 = await songService.addSong(myAlbum._id, {
      name: "Imagine",
      singer: "John Lennon",
      categoryId: popCategory._id,
    });
    const tempAlbum = await albumService.addAlbum({
      name: "Temp Album",
      description: "this is a temporary album.",
      showNbTracks: true,
    });
    await songService.addSong(tempAlbum._id, {
      name: "All blues",
      singer: "Miles Davis",
      categoryId: jazzCategory._id,
    });
    await songService.addSong(tempAlbum._id, {
      name: "Take Five",
      singer: "Dave Brubeck",
      categoryId: jazzCategory._id,
    });
    await songService.addSong(tempAlbum._id, {
      name: "Strange Fruit",
      singer: "Billie Holiday",
      categoryId: jazzCategory._id,
    });
    await albumService.deleteAlbum(tempAlbum._id);
    await songService.deleteSong(myAlbumSong3._id);
  } catch (error) {
    throw error;
  }
}
connect();
testFunction();
