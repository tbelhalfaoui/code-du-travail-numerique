import React from "react";
import Router from "next/router";
import { withRouter } from "next/router";

import api from "../conf/api.js";
import ErrorXhr from "./ErrorXhr";
import SearchResult from "./SearchResult";
import SearchResults from "./SearchResults";


class Search extends React.Component {

  state = {
    query: "",
    data: null,
    error: null,
    pendingXHR: false
  };

  componentDidMount() {
    if (Router.query && Router.query.q) {
      this.setState({ query: decodeURI(Router.query.q) }, () => {
        this.fetchResults();
      });
    }
  }

  reset() {
    this.setState({ data: null, query: "" });
  }

  handleChange = event => {
    this.setState({ query: event.target.value });
  };

  handleSubmit = event => {
    event.preventDefault();
    if (!this.state.query) {
      return this.reset();
    }
    Router.push({ pathname: "/", query: { q: encodeURI(this.state.query) } });
    this.fetchResults();
  };

  handleKeyDown = event => {
    if (event.keyCode === 27) {
      this.reset();
    }
  };

  fetchResults = () => {
    this.setState({ pendingXHR: true, error: null }, () => {
      fetch(`${api.BASE_URL}/search?q=${this.state.query}`)
        .then(response => {
          if (response.ok) {
            return response.json();
          }
          throw new Error(api.ERROR_MSG);
        })
        .then(data => this.setState({ data, pendingXHR: false }))
        .catch(error => this.setState({ error, pendingXHR: false }));
    });
  };

  render() {
    const { data, error, pendingXHR, query } = this.state;
    const { router } = this.props;

    const errorJsx = error ? <ErrorXhr error={error.message} /> : null;
    const loadingJsx = pendingXHR ? <p>Chargement…</p> : null;
    const showSingleResult = router.query && router.query.type === "questions";
    let content = showSingleResult ? (
      <SearchResult data={data} id={router.query.id} />
    ) : (
      <SearchResults data={data} query={query} />
    );

    return (
      <div>
        <section class="section-light shadow-bottom">
          <div class="container">
            <div class="search">
              <header>
                <h1 class="no-margin">Posez votre question sur le droit du travail</h1>
              </header>
              <form class="search__form" onSubmit={this.handleSubmit}>
                <input
                  type="search"
                  name="search"
                  placeholder="Posez votre question"
                  className="search__input"
                  value={query}
                  onChange={this.handleChange}
                  onKeyDown={this.handleKeyDown}
                />
                <button type="submit" class="btn btn__img btn__img__search">
                    <span class="hidden">Rechercher</span>
                </button>
              </form>
              {loadingJsx}
              {errorJsx}
            </div>
          </div>
        </section>
        {content}
      </div>
    );
  }
}

export default withRouter(Search);
