import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

async function connectMongo() {
  if (!MONGODB_URI) {
    throw new Error(
      "Please define the MONGODB_URI environment variable inside .env.local"
    );
  }

  await mongoose.connect(MONGODB_URI);

  // console.log(connection);

  console.log("Connected to Database");

  return;
}

export default connectMongo;

// import mongoose from "mongoose";

// const MONGODB_URI = process.env.MONGODB_URI;

// const cached: {
//   connection?: typeof mongoose;
//   promise?: Promise<typeof mongoose>;
// } = {};

// async function connectMongo() {
//   if (!MONGODB_URI) {
//     throw new Error(
//       "Please define the MONGODB_URI environment variable inside .env.local"
//     );
//   }

//   if (!cached.connection) {
//     return cached.connection;
//   }

//   if (!cached.promise) {
//     const opts = {
//       bufferCommands: false,
//     };
//     cached.promise = mongoose.connect(MONGODB_URI, opts);
//   }

//   try {
//     cached.connection = await cached.promise;
//   } catch (e) {
//     cached.promise = undefined;
//     throw e;
//   }
//   return cached.connection;
// }

// export default connectMongo;
