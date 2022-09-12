import { User } from "@prisma/client";
import * as T from 'io-ts';
import { Email } from "../../utils/validation";

 export const CreateUserRequestType = T.intersection([
    T.type({email: Email}),
    T.partial({name: T.string}),
  ])
export type CreateUserRequestType = T.TypeOf<typeof CreateUserRequestType>;
export const isCreateUserRequestType: (w: unknown) => w is CreateUserRequestType = CreateUserRequestType.is;



export const UpdateUserRequestType = T.intersection([
    T.type({email: Email}),
    T.partial({name: T.string}),
  ])
export type UpdateUserRequestType = T.TypeOf<typeof CreateUserRequestType>;
export const isUpdateUserRequestType: (w: unknown) => w is UpdateUserRequestType = UpdateUserRequestType.is;


