import { Resolver, Query, Mutation, Arg, Ctx,ObjectType, Field } from 'type-graphql'
import bcrypt from 'bcryptjs'

import { User, UserModel } from '../entities/User'
import {validateUsername,validateEmail,validatePassword} from '../utils/validate'
import { createToken, sendToken } from '../utils/tokenHandler'
import { isAuthenticated } from '../utils/authHandler'
import { AppContext, RoleOptions } from '../types'

@ObjectType()
export class ResponseMessage {
  @Field()
  message: string
}

@Resolver()
export class AuthResolvers {
  @Query(() => [User], { nullable: 'items' }) 
  async users(@Ctx() { req }: AppContext): Promise<User[] | null> {
    try {
      const user = await isAuthenticated(req)

      const isAuthorized =
        user.roles.includes(RoleOptions.superAdmin) ||
        user.roles.includes(RoleOptions.admin)

      if (!isAuthorized) throw new Error('No Authorization.')

      return UserModel.find().sort({ createdAt: 'desc' })
    } catch (error) {
      throw error
    }
  }

  @Query(() => User, { nullable: true }) 
  async me(@Ctx() { req }: AppContext): Promise<User | null> {
    try {
      const user = await isAuthenticated(req)


      return user
    } catch (error) {
      throw error
    }
  }

  
  @Mutation(() => User, { nullable: true })
  async signup(
    @Arg('username') username: string,
    @Arg('email') email: string,
    @Arg('password') password: string,
    @Ctx() { res }: AppContext
  ): Promise<User | null> {
    try {

      if (!username) throw new Error('Username is required.')
      if (!email) throw new Error('Email is required.')
      if (!password) throw new Error('Password is required.')

      const user = await UserModel.findOne({ email })

      if (user) throw new Error('Email already in use, please sign in instead.')
      
      const isUsernameValid = validateUsername(username)

      if (!isUsernameValid)
        throw new Error('Username must be between 3 - 60 characters.')

      const isEmailValid = validateEmail(email)

      if (!isEmailValid) throw new Error('Email is invalid.')

      const isPasswordValid = validatePassword(password)

      if (!isPasswordValid)
        throw new Error('Password must be between 6 - 50 characters.')

      const hashedPassword = await bcrypt.hash(password, 10)

      const newUser = await UserModel.create<
      Pick<User, 'username' | 'email' | 'password'>
    >({
        username,
        email,
        password: hashedPassword,
      })

      await newUser.save()

      const token = createToken(newUser.id, newUser.tokenVersion)

      sendToken(res, token)

      return newUser
    } catch (error) {
      throw error
    }
  }

  @Mutation(() => User, { nullable: true })
  async signin(
    @Arg('email') email: string,
    @Arg('password') password: string,
    @Ctx() { res }: AppContext
  ): Promise<User | null> {
    try {
      if (!email) throw new Error('Email is required.')
      if (!password) throw new Error('Password is required.')

      const user = await UserModel.findOne({ email })

      if (!user) throw new Error('Email not found.')


      const isPasswordValid = await bcrypt.compare(password, user.password)

      if (!isPasswordValid) throw new Error('Email or password is invalid')

      const token = createToken(user.id, user.tokenVersion)

      sendToken(res, token)

      return user
    } catch (error) {
      throw error
    }
  }

  @Mutation(() => ResponseMessage, { nullable: true })
  async signout(
    @Ctx() { req, res }: AppContext
  ): Promise<ResponseMessage | null> {
    try {
      const user = await UserModel.findById(req.userId)

      if (!user) return null

      user.tokenVersion = user.tokenVersion + 1
      await user.save()

      res.clearCookie(process.env.COOKIE_NAME!)

      return { message: 'Goodbye' }
    } catch (error) {
      throw error
    }
  }

  @Mutation(() => User, { nullable: true })
  async updateRoles(
    @Arg('newRoles', () => [String]) newRoles: RoleOptions[],
    @Arg('userId') userId: string,
    @Ctx() { req }: AppContext
  ) : Promise<User | null>{
    try {

      const admin = await isAuthenticated(req)

      const isSuperAdmin = admin.roles.includes(RoleOptions.superAdmin)

      if (!isSuperAdmin) throw new Error('Not authorized.')

      const user = await UserModel.findById(userId)

      if (!user) throw new Error('User not found.')

      user.roles = newRoles

      await user.save()

      return user
    } catch (error) {
      throw error
    }
  }
  
  @Mutation(() => ResponseMessage, { nullable: true })
  async deleteUser(
    @Arg('userId') userId: string,
    @Ctx() { req }: AppContext
  ): Promise<ResponseMessage | null> {
    try {
      const admin = await isAuthenticated(req)

      const isSuperAdmin = admin.roles.includes(RoleOptions.superAdmin)

      if (!isSuperAdmin) throw new Error('Not authorized.')

      const user = await UserModel.findByIdAndDelete(userId)

      if (!user) throw new Error('Sorry, cannot proceed.')

      return { message: `User id: ${userId} has been deleted.` }
    } catch (error) {
      throw error
    }
  }

}
