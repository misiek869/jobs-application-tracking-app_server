import mongoose, { Schema, Document, Model } from 'mongoose'

export interface IUser extends Document {
	name: string
	email: string
	password: string
	lastName: string
	location: string
	role: 'user' | 'admin'
	avatar: string
	avatarPublicId: string
}

const UserSchema: Schema<IUser> = new mongoose.Schema({
	name: String,
	email: String,
	password: String,
	lastName: {
		type: String,
		default: 'lastName',
	},
	location: {
		type: String,
		default: 'city',
	},
	role: {
		type: String,
		enum: ['user', 'admin'],
		default: 'user',
	},
	avatar: String,
	avatarPublicId: String,
})

const User: Model<IUser> = mongoose.model<IUser>('User', UserSchema)

export default User
