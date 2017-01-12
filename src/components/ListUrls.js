import React from 'react';
import { truncateText } from '../helpers';

const ListUrls = ({ data, loading, loadingDots, error, windowSmall }) => (
  <div className="col-xs-12 col-sm-12 col-md-8 col-md-offset-2 col-lg-8 col-lg-offset-2" id="list-urls">
    <hr />
    <h5 className="text-center">Last 5 ShortNeed urls.</h5>
    <br />
    {loading ? (
      <h1 className="text-center">
        Loading{loadingDots}
      </h1>
    ) : (
      <div>
        {error ? (
          <div className="alert alert-danger" role="alert">
            Something wrong happen! Plz Refresh!
          </div>
        ) : (
          <ul className="list-group">
            {data.map((url, i) => (
              <a href={url.shortUrl} className="list-group-item" key={i}>
                <div className="row">
                  <div className="col-md-10 col-sm-10 col-xs-9">
                    {windowSmall ? truncateText(url.longUrl, 35) : url.longUrl}
                  </div>
                  <div className="col-md-2 col-sm-2 col-xs-3">
                    {url.visits} <i className="fa fa-line-chart" />
                  </div>
                </div>
              </a>
            ))}
          </ul>
        )}
      </div>
    )}
  </div>
);

export default ListUrls;
