import mongoose, { Schema } from "mongoose";
import bcrypt from "bcryptjs";

const userModel = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        lowercase: true,
        trim: true,
        match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
    },
    otp: {
        type: Number,
        default: null,
        min: [100000, 'OTP must be 6 digits'],
        max: [999999, 'OTP must be 6 digits']
    },
    otpExpiry: {
        type: Date,
        default: null
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: [8, 'Password must be at least 8 characters long']
    },
    refreshToken: {
        type: String,
        default: null
    },
    patientDetails: {
        type: Schema.Types.ObjectId,
        ref: "Patients"    
    },
    doctorDetails: {
        type: Schema.Types.ObjectId,
        ref: "Doctor"
    },
    isDoctor: {
        type: Boolean,
        default: false
    },
    lastLogin: {
        type: Date,
        default: null
    },
    isActive: {
        type: Boolean,
        default: true
    },
    loginAttempts: {
        type: Number,
        default: 0
    },
    lockUntil: {
        type: Date,
        default: null
    },
    passwordChangedAt: {
        type: Date,
        default: null
    },
    passwordResetToken: {
        type: String,
        default: null
    },
    passwordResetExpires: {
        type: Date,
        default: null
    }
}, {
    timestamps: true
});

// Index for better query performance
userModel.index({ email: 1 });
userModel.index({ refreshToken: 1 });
userModel.index({ isActive: 1 });
userModel.index({ isVerified: 1 });

// Virtual for checking if account is locked
userModel.virtual('isLocked').get(function() {
    return !!(this.lockUntil && this.lockUntil > Date.now());
});

// Pre-save middleware to hash password
userModel.pre('save', async function(next) {
    // Only hash the password if it has been modified (or is new)
    if (!this.isModified('password')) return next();
    
    try {
        // Hash password with cost of 12
        this.password = await bcrypt.hash(this.password, 12);
        this.passwordChangedAt = Date.now() - 1000; // Subtract 1 second to ensure token was created after password change
        next();
    } catch (error) {
        next(error);
    }
});

// Instance method to check password
userModel.methods.comparePassword = async function(candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
};

// Instance method to increment login attempts
userModel.methods.incLoginAttempts = function() {
    // If we have a previous lock that has expired, restart at 1
    if (this.lockUntil && this.lockUntil < Date.now()) {
        return this.updateOne({
            $unset: { lockUntil: 1 },
            $set: { loginAttempts: 1 }
        });
    }
    
    const updates = { $inc: { loginAttempts: 1 } };
    
    // Lock account after 5 failed attempts
    if (this.loginAttempts + 1 >= 5 && !this.isLocked) {
        updates.$set = { lockUntil: Date.now() + 15 * 60 * 1000 }; // 15 minutes
    }
    
    return this.updateOne(updates);
};

// Instance method to reset login attempts
userModel.methods.resetLoginAttempts = function() {
    return this.updateOne({
        $unset: { loginAttempts: 1, lockUntil: 1 }
    });
};

// Static method to find user by email (case insensitive)
userModel.statics.findByEmail = function(email) {
    return this.findOne({ email: email.toLowerCase() });
};

// Method to check if password was changed after token was issued
userModel.methods.changedPasswordAfter = function(JWTTimestamp) {
    if (this.passwordChangedAt) {
        const changedTimestamp = parseInt(this.passwordChangedAt.getTime() / 1000, 10);
        return JWTTimestamp < changedTimestamp;
    }
    return false;
};

// Ensure virtual fields are serialized
userModel.set('toJSON', {
    virtuals: true,
    transform: function(doc, ret) {
        delete ret.password;
        delete ret.refreshToken;
        delete ret.otp;
        delete ret.otpExpiry;
        delete ret.passwordResetToken;
        delete ret.passwordResetExpires;
        delete ret.loginAttempts;
        delete ret.lockUntil;
        return ret;
    }
});

export default mongoose.model("User", userModel);
