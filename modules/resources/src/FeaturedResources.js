import React from 'react';
import Resource from './Resource.js';
import Configuration from './Configuration.js';

const RESOURCE_TYPE_FILTER = 'taxonomyCategoryIds/any(id:id eq 93566)';
// TODO: language selections
// TODO: Featured category
class FeaturedResources extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			error: null,
			isLoaded: false,
			items: []
		};
	}
	fetchData() {
		var server = Configuration.apiServer;

		let headers = new Headers();
		const site = 'Guest';
		const sort = 'dateModified:desc';

		let filters = [];
		filters.push(
			'taxonomyCategoryIds/any(id:id eq ' + this.props.categoryId + ')'
		);

		let filter = RESOURCE_TYPE_FILTER;
		if (filters.length > 0) {
			filter = filter + ' and (' + filters.join(' or ') + ')';
		}

		headers.append('Authorization', 'Basic ' + Configuration.apiAuth);
		fetch(
			server +
				'/o/headless-assets/v1.0/sites/' +
				site +
				'/content-sets-elements?pageSize=4&page=1&filter=' +
				encodeURIComponent(filter) +
				'&sort=' +
				encodeURIComponent(sort),
			{method: 'GET', headers: headers}
		)
			.then((res) => res.json())
			.then(
				(result) => {
					this.setState({
						isLoaded: true,
						items: result.items || []
					});
				},
				// Note: it's important to handle errors here
				// instead of a catch() block so that we don't swallow
				// exceptions from actual bugs in components.
				(error) => {
					this.setState({
						isLoaded: true,
						error
					});
				}
			);
	}
	componentDidMount() {
		this.fetchData();
	}

	render() {
		const {error, isLoaded, items} = this.state;

		if (error) {
			return <div>Error: {error.message}</div>;
		} else if (!isLoaded) {
			return <div>Loading...</div>;
		}

		const resourceItems = items.map((resource) => (
			<Resource key={resource.id} resource={resource} />
		));

		return (
			<div>
				<div className="asset-entries max-full w100">
					<div
						id="resourcesDisplay"
						className="featured-resources block-container justify-left no-padding-horizontal resources-container"
					>
						{resourceItems}
					</div>
				</div>
			</div>
		);
	}
}

export default FeaturedResources;
