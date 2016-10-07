import React, {PropTypes} from 'react';
import Table from './Table';
import classNames from 'classnames';

const {bool, string, shape, arrayOf, func} = PropTypes;

const MultiTable = React.createClass({
  propTypes: {
    queries: arrayOf(shape({
      host: arrayOf(string.isRequired).isRequired,
      text: string.isRequired,
    })),
  },

  getInitialState() {
    return {
      activeQueryId: null,
    };
  },

  getActiveQuery() {
    const {queries} = this.props;
    const activeQuery = queries.find((query) => query.id === this.state.activeQueryId);
    const defaultQuery = queries[0];

    return activeQuery || defaultQuery;
  },

  handleSetActiveTable(query) {
    this.setState({activeQueryId: query.id});
  },

  render() {
    return (
      <div>
        {this.renderTabs()}
        {this.renderTable()}
      </div>
    );
  },

  renderTable() {
    const query = this.getActiveQuery();
    const noQuery = !query || !query.text;
    if (noQuery) {
      return null;
    }

    return <Table key={query.text} query={query} />;
  },

  renderTabs() {
    const {queries} = this.props;
    return (
      <div className="multi-table--tabs">
        {queries.map((q) => {
          return (
            <TabItem
              isActive={this.getActiveQuery().id === q.id}
              key={q.id}
              query={q}
              onSelect={this.handleSetActiveTable}
            />
          );
        })}
      </div>
    );
  },
});

const TabItem = React.createClass({
  propTypes: {
    query: shape({
      text: string.isRequired,
      id: string.isRequired,
      host: arrayOf(string.isRequired).isRequired,
    }).isRequired,
    onSelect: func.isRequired,
    isActive: bool.isRequired,
  },

  handleSelect() {
    this.props.onSelect(this.props.query);
  },

  render() {
    const {isActive} = this.props;
    return (
      <div className={classNames("multi-table--tab", {active: isActive})} onClick={this.handleSelect}>
        {"Query"}
      </div>
    );
  },
});

export default MultiTable;
