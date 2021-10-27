import { Request, Response } from 'express'
import { Profile } from 'passport-facebook'
import { Profile as GoogleProfile } from 'passport-google-oauth20'

export enum RoleOptions {
  client = 'CLIENT',
  itemEditor = 'ITEMEDITOR',
  admin = 'ADMIN',
  superAdmin = 'SUPERADMIN',
}

export interface AppRequest extends Request {
  userId?: string
  tokenVersion?: number
  userProfile?: Profile| GoogleProfile
}

export interface AppContext {
  req: AppRequest
  res: Response
}
