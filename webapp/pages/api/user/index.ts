import { NextApiRequest, NextApiResponse } from 'next';
import { UserService } from '../../../api/user/service';
import { UserRepository } from '../../../api/user/repository';
import {
  CreateUserRequestType,
  isCreateUserRequestType,
  UpdateUserRequestType,
} from '../../../api/user/type';
import { APIErrorResponseType } from '../../../utils/apiResponseType';
import { PathReporter } from 'io-ts/lib/PathReporter';
import * as T from 'io-ts';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    return Get(req, res);
  }

  if (req.method === 'POST') {
    return Post(req, res);
  }

  return res.status(405).end();
};

const GetQuery = T.partial({
  name: T.union([T.string, T.undefined]),
});

type GetQuery = T.TypeOf<typeof GetQuery>;
const isGetQuery: (w: unknown) => w is GetQuery = GetQuery.is;

const Get = async (req: NextApiRequest, res: NextApiResponse) => {
  if (!isGetQuery(req.query)) {
    const errorResponse: APIErrorResponseType = {
      message: JSON.stringify(
        PathReporter.report(GetQuery.decode(req.query))
      ),
    };
    return res.status(400).json(errorResponse);
  }
  const query:GetQuery = req.query as GetQuery;
  const user_id = query.name
  const userRepository = new UserRepository();
  const userService = new UserService(userRepository);
  const users = await userService.FindUsers(user_id);
  return res.status(200).json(users);
};

const Post = async (req: NextApiRequest, res: NextApiResponse) => {
  const userRepository = new UserRepository();
  const userService = new UserService(userRepository);
  // ボディーに謝った値が入っている場合
  if (!isCreateUserRequestType(req.body)) {
    const errorResponse: APIErrorResponseType = {
      message: JSON.stringify(
        PathReporter.report(CreateUserRequestType.decode(req.body))
      ),
    };
    return res.status(400).json(errorResponse);
  }

  const body: CreateUserRequestType = req.body as CreateUserRequestType;
  const users = await userService.CreateUser(body);
  return res.status(200).json(users);
};

export default handler;
