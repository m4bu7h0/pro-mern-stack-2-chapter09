import React from 'react';

import IssueFilter from './IssueFilter.jsx';
import IssueTable from './IssueTable.jsx';
import IssueAdd from './IssueAdd.jsx';
import IssueDetail from './IssueDetail.jsx';
import graphQLFetch from './graphQLFetch.js';
import URLSearchParams from 'url-search-params';
import { Route } from 'react-router-dom';

export default class IssueList extends React.Component {
    constructor() {
        super();
        this.state = { issues: [] };
        this.createIssue = this.createIssue.bind(this);
    }

    componentDidUpdate(prevProps) {
        const { location: { search: prevSearch } } = prevProps;
        const { location: { search } } = this.props;
        if (prevProps !== search) {
            this.loadData();
        }
    }

    componentDidMount() {
        this.loadData();
    }

    async loadData() {
        const { location: { search } } = this.props;
        const params = new URLSearchParams(search);
        const vars = {};
        if (params.get('status')) vars.status = params.get('status');

        const query = `query($status: StatusType){
        issueList (status: $status) {
          id title status owner created effort due
        }
      }`;

        const data = await graphQLFetch(query, vars);
        if (data) {
            this.setState({ issues: data.issueList });
        }
    }

    async createIssue(issue) {

        const query = `mutation issueAdd($issue: IssueInputs!){
        issueAdd(issue: $issue){id}
      }`;

        const data = await graphQLFetch(query, { issue });
        if (data) {
            this.loadData();
        }
    }

    render() {
        const { issues } = this.state;
        const { match } = this.props;
        return (
            <React.Fragment>
                <h1>Issue Tracker</h1>
                <IssueFilter />
                <hr />
                <IssueTable issues={issues} />
                <hr />
                <IssueAdd createIssue={this.createIssue} />
                <hr />
                <Route path={`${match.path}/:id`}
                    component={IssueDetail} />
            </React.Fragment>
        );
    }
}