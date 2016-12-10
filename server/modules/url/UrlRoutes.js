import { Router } from 'express';
import * as Url from './UrlController';

const urlRoute = new Router();

urlRoute.route('/shorten').post(Url.createShort);

export default urlRoute;
