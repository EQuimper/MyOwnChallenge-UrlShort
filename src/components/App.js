import React from 'react';
import { FormGroup, FormControl, ControlLabel, Button, InputGroup, Tooltip } from 'react-bootstrap';
import { isURL } from 'validator';
import CopyToClipboard from 'react-copy-to-clipboard';
import { getTop5, submitLink } from '../helpers';
import ListUrls from './ListUrls';

class App extends React.Component {
  static defaultProps = {
    getTop5,
    submitLink
  }
  state = {
    url: {
      longUrl: '',
      error: false,
      valid: false,
      loading: false
    },
    list: {
      data: [],
      error: false,
      loading: false,
      loadingDots: []
    },
    urlSubmit: false,
    copied: false,
  }
  componentWillMount() {
    this.setState({ list: { ...this.state.list, loading: true } });
    this.int = setInterval(() => {
      if (this.state.list.loadingDots.length === 3) {
        this.setState({ list: { ...this.state.list, loadingDots: [] } });
      }
      this.setState({
        list: { ...this.state.list, loadingDots: [...this.state.list.loadingDots, '.'] }
      });
    }, 300);
    return setTimeout(() => {
      this.props.getTop5()
        .then(
          res => {
            this.setState({
              list: { ...this.state.list, data: res.data.urls, loading: false, loadingDots: [] },
            });
            clearInterval(this.int);
          },
          () => this.setState({ list: { ...this.state.list, error: true, loading: false } })
        );
    }, 2000);
  }
  _handleSubmit = e => {
    e.preventDefault();
    this.setState({ url: { ...this.state.url, loading: true } });
    if (!isURL(this.state.url.longUrl)) {
      console.log('Hello');
      return this.setState({
        url: { ...this.state.url, error: true },
        urlSubmit: true
      });
    }
    return setTimeout(() => {
      this.props.submitLink(this.state.url.longUrl)
        .then(
          res => {
            this.setState({
              urlSubmit: true,
              url: {
                ...this.state.url,
                longUrl: `http://shneed.com/${res.data.url.shortUrl}`,
                loading: false,
                valid: true
              },
            });
          },
          () => this.setState({
            url: { ...this.state.url, error: true, loading: false },
          })
        );
    }, 3000);
  }
  _handleChange = e => {
    this.setState({
      url: {
        ...this.state.url,
        longUrl: e.target.value
      }
    });
  }
  _checkUrlState = () => {
    if (this.state.url.error) {
      return 'error';
    }
    return;
  }
  _handleReset = () =>
    this.setState({
      urlSubmit: false,
      url: { ...this.state.url, error: false, longUrl: '', valid: false },
      copied: false
    })
  _handleCopy = () => {
    this.setState({ copied: true });
    setTimeout(() => {
      this.setState({ copied: false });
    }, 1250);
  }
  _checkButtonText = (error, loading) => {
    if (error) {
      return 'Error';
    } else if (loading) {
      return <span className="glyphicon glyphicon-refresh" id="loading-spinner" />;
    }
    return 'ShortNeed';
  }
  render() {
    const { url, urlSubmit, copied, list } = this.state;
    return (
      <div className="container input-wrapper">
        <div className="row">
          <div className="col-xs-12 col-sm-12 col-md-8 col-md-offset-2">
            <form onSubmit={this._handleSubmit}>
              <FormGroup validationState={this._checkUrlState()} bsSize="lg">
                {url.error && (
                  <ControlLabel>Url not valid, try again!</ControlLabel>
                )}
                <InputGroup>
                  <FormControl
                    disabled={urlSubmit}
                    value={url.longUrl}
                    onChange={this._handleChange}
                    type="text"
                    placeholder="Paste your url..."
                  />
                  {url.valid ? (
                    <CopyToClipboard text={this.state.url.longUrl} onCopy={this._handleCopy}>
                      <InputGroup.Button>
                        <Button
                          type="submit"
                          bsStyle="success"
                          bsSize="lg"
                        >
                          Copy
                        </Button>
                        {copied && (
                          <Tooltip placement="bottom" className="in" id="tooltip-bottom">
                            Copied
                          </Tooltip>
                        )}
                      </InputGroup.Button>
                    </CopyToClipboard>
                  ) : (
                    <InputGroup.Button>
                      <Button
                        type="submit"
                        disabled={url.loading}
                        bsStyle={url.error ? 'danger' : 'primary'}
                        bsSize="lg"
                        disabled={url.longUrl.length === 0 || url.error}
                      >
                        {this._checkButtonText(url.error, url.loading)}
                      </Button>
                    </InputGroup.Button>
                  )}
                </InputGroup>
              </FormGroup>
            </form>
          </div>
          {urlSubmit && (
            <div className="col-xs-12 col-sm-12 col-md-8 col-md-offset-2 text-center">
              <Button bsSize="lg" onClick={this._handleReset} bsStyle="warning">Reset</Button>
            </div>
          )}
          <ListUrls {...list} />
        </div>
      </div>
    );
  }
}

export default App;
