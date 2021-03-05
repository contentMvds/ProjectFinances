import mongoose from 'mongoose';

export default () => {
  mongoose.connect(
    process.env.MONGO_DB,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    },
    (err) => {
      if (err) {
        console.log(`====>  Error connecting to ${process.env.MONGO_DB}`);
        console.log(`Reason: ${err}`);
      } else {
        console.log('===> Connection with MongoDB established');
      }
    },
  );
  mongoose.set('debug', true);
};
