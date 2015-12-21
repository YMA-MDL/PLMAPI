var User = {
  // Enforce model schema in the case of schemaless databases
  schema: true,

  attributes: {
    username  : { type: 'string', unique: true },
    email     : { type: 'email',  unique: true },
    passports : { collection: 'Passport', via: 'user' },
    usertype : {
      type: 'string',
      enum: ['apiAdmin','accountAdmin', 'user', 'viewer'],
      defaultsTo: 'viewer'
    },
    account:{
      model: 'account'
    }
  }
};

module.exports = User;
