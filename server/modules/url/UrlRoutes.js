import { Router } from 'express';
import * as Url from './UrlController';

const urlRoute = new Router();

urlRoute.route('/api/v1/shorten').post(Url.createShort);
urlRoute.route('/:shortUrl').get(Url.redirectLong);
urlRoute.route('/api/v1/getTop5').get(Url.getTop5);

export default urlRoute;
