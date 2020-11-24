import mongoose from 'mongoose';
const Schema = mongoose.Schema;
import bcrypt from 'bcryptjs';

const UserSchema: Schema = new Schema({
  email: {
    type: String,
    required: true,
    unoque: true,
  },
  created: {
    type: Date,
    default: Date.now(),
  },
  password: String,
  checklists: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Checklist',
    },
  ],
});

UserSchema.pre("save", function(next) {
  const user = this;
  if (!user.isModified('password')) return next();
  return bcrypt.genSalt(10, function(error, salt) {
    if (error) {
      return next(error);
    }
    return bcrypt.hash(this.password, salt, function(error, hash) {
      if (error) {
        return next(error);
      }
      this.password = hash;
      return next();
    });
  });
}

/* bcrypt.compare(req.body.password, user.password, function(err, res) {
  if (err){
    // handle error
  }
  if (res)
    // Send JWT
  } else {
    // response is OutgoingMessage object that server response http request
    return response.json({success: false, message: 'passwords do not match'});
  }
});

https://stackoverflow.com/questions/14588032/mongoose-password-hashing

*/

UserSchema.methods.comparePassword = function(candidatePassword, cb) {
	bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};

export default model<IUser>('User', UserSchema);
