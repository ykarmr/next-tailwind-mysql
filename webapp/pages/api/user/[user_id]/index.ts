import { NextApiRequest, NextApiResponse } from 'next';
import { useRouter } from 'next/router';
import { UserRepository } from '../../../../api/user/repository';
import { UserService } from '../../../../api/user/service';
import * as T from 'io-ts';
import {
  isUpdateUserRequestType,
  UpdateUserRequestType,
} from '../../../../api/user/type';
import { PathReporter } from 'io-ts/lib/PathReporter';
import { ErrorResponseType } from '../../../../utils/error/errorResponseType';
import { APIErrorResponseType } from '../../../../utils/apiResponseType';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    return Get(req, res);
  }

  if (req.method === 'PUT') {
    return Put(req, res);
  }

  if (req.method === 'DELETE') {
    return Delete(req, res);
  }

  return res.status(405).end();
};

const GetQuery = T.type({
  user_id: T.string,
});
type GetQuery = T.TypeOf<typeof GetQuery>;
const isGetQuery: (w: unknown) => w is GetQuery = GetQuery.is;

const Get = async (req: NextApiRequest, res: NextApiResponse) => {
  const userRepository = new UserRepository();
  const userService = new UserService(userRepository);
  // パスまたはクエリーに謝った値が入っている場合
  if (!isGetQuery(req.query)) {
    const errorResponse: APIErrorResponseType = {
      message: JSON.stringify(PathReporter.report(GetQuery.decode(req.query))),
    };
  }
  const query: GetQuery = req.query as GetQuery;
  const user_id = query.user_id;
  const user = await userService.FindUser(user_id);

  if (!user) {
    return res.status(204).end();
  }

  return res.status(200).json(user);
};

const PutQuery = T.type({
  user_id: T.string,
});
type PutQuery = T.TypeOf<typeof PutQuery>;

const isPutQuery: (w: unknown) => w is PutQuery = PutQuery.is;

const Put = async (req: NextApiRequest, res: NextApiResponse) => {
  const userRepository = new UserRepository();
  const userService = new UserService(userRepository);
  // パスまたはクエリーに謝った値が入っている場合
  if (!isPutQuery(req.query)) {
    const errorResponse: APIErrorResponseType = {
      message: JSON.stringify(PathReporter.report(PutQuery.decode(req.query))),
    };
    return res.status(400).json(errorResponse);
  }

  const query: PutQuery = req.query as PutQuery;
  const user_id = query.user_id;

  // ボディーに謝った値が入っている場合
  if (!isUpdateUserRequestType(req.body)) {
    const errorResponse: APIErrorResponseType = {
      message: JSON.stringify(
        PathReporter.report(UpdateUserRequestType.decode(req.body))
      ),
    };
    return res.status(400).json(errorResponse);
  }
  const body: UpdateUserRequestType = req.body as UpdateUserRequestType;
  const user = await userService.UpdateUser(user_id, body);
  return res.status(200).json(user);
};

const DeleteQuery = T.type({
  user_id: T.string,
});
type DeleteQuery = T.TypeOf<typeof DeleteQuery>;

const isDeleteQuery: (w: unknown) => w is PutQuery = PutQuery.is;

const Delete = async (req: NextApiRequest, res: NextApiResponse) => {
  const userRepository = new UserRepository();
  const userService = new UserService(userRepository);
  // パスまたはクエリーに謝った値が入っている場合
  if (!isDeleteQuery(req.query)) {
    const errorResponse: APIErrorResponseType = {
      message: JSON.stringify(
        PathReporter.report(DeleteQuery.decode(req.query))
      ),
    };
    return res.status(400).json(errorResponse);
  }
  const query: DeleteQuery = req.query as DeleteQuery;
  const user_id = query.user_id;

  const deleteUser = await userService.DeleteUser(user_id);
  return res.status(200).json(deleteUser);
};
export default handler;
