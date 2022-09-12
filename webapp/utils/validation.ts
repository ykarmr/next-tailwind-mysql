import * as T from 'io-ts';


const REGEX_EMAIL = /^[a-zA-Z0-9.!#$%&'*+\\/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
interface IEmail {
    readonly Email: unique symbol;
};
export const Email = T.brand(
    T.string,
    (input): input is T.Branded<string, IEmail> => REGEX_EMAIL.test(input),
    'Email'
 );