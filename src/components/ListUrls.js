import React from 'react';

const ListUrls = ({ data, loading, loadingDots, error }) => (
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
                {url.longUrl}
              </a>
            ))}
          </ul>
        )}
      </div>
    )}
  </div>
);

export default ListUrls;
