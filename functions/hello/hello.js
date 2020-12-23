const mongoose = require('mongoose')
let connection = null

databaseConnection = async() => {
  console.log('connections exists = ',connection !== null);
  if(!connection){
    try{
      mongoose.connect(process.env.MONGODB_QUERY_STRING, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        bufferCommands: false,
        bufferMaxEntries: 0
      });
      connection = mongoose.connection;
      await connection
      console.log('db connection successfull')

      const studentSchema = new mongoose.Schema({
        name: String,
        age: Number
      });

      mongoose.models.Student || mongoose.model('Student', studentSchema);

    } catch(err){
      console.log(err)
    }
  }
  return connection
}


const handler = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false;
  await databaseConnection();
  try {
    const Student = mongoose.models.Student

    const result = await Student.findById({ _id: '5fe1c6c3a1b7fd69a71b7078' });

    console.log('Result = ',result);

    return {
      statusCode: 200,
      body: JSON.stringify(result),
    }
  } catch (error) {
    return { statusCode: 500, body: error.toString() }
  }
}

module.exports = { handler }
