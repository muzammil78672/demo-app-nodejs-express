const { hashSync, genSaltSync } = require("bcrypt-nodejs");

module.exports = (Schema, mongoose) => {
  const user = new Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  });

  user.pre("save", function (next) {
    this.updatedAt = Date.now();
    this.password = hashSync(this.password, genSaltSync(10));
    return next();
  });

  user.set("toJSON", {
    transform(doc, ret, options) {
      ret.id = ret._id;
      delete ret._id;
      delete ret.__v;
    },
  });

  return mongoose.model("user", user);
};
