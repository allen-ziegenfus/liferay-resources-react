import React from 'react';
import ResourceHeader from './ResourcesHeader.js';
import Resource from './Resource.js';
import Pagination from './Pagination.js';
import Filter from './Filter.js';
import Categories from './Categories.js';
import FeaturedResources from './FeaturedResources.js';
import Configuration from './Configuration.js';

const RESOURCE_TYPE_FILTER = 'taxonomyCategoryIds/any(id:id eq 93566)';

class Resources extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			error: null,
			isLoaded: false,
			filter: RESOURCE_TYPE_FILTER,
			appliedCategoryIds: {},
			items: [],
			lastPage: 0,
			search: '',
			page: 1,
			pageSize: 0,
			totalCount: 0,
			showFilter: false,
			showFilteredOverview: false,
			activeVocabularyIndex: 0
		};
	}

	linkToCategory(categoryId) {
		//TODO: this works but does not update state on filter
		let categoryIds = {};
		categoryIds[categoryId] = true;
		this.fetchCategories(categoryIds);
	}

	fetchCategories(categoryIds) {
		let category;
		let filters = [];

		for (category in categoryIds) {
			if (categoryIds[category]) {
				filters.push(
					'taxonomyCategoryIds/any(id:id eq ' + category + ')'
				);
			}
		}

		let filter = RESOURCE_TYPE_FILTER;
		if (filters.length > 0) {
			filter = filter + ' and (' + filters.join(' or ') + ')';
		}

		this.fetchData(this.state.page, filter, categoryIds);
	}

	toggleFilter() {
		let currentState = {...this.state};
		currentState.showFilter = !currentState.showFilter;
		this.setState(currentState);
	}

	search(searchText) {
		console.log(searchText);
		this.fetchData(
			this.state.page,
			this.state.filter,
			this.state.appliedCategoryIds,
			searchText
		);
	}

	fetchData(page, filter, categoryIds, search) {
		if (
			page === this.state.page &&
			filter === this.state.filter &&
			search === this.state.search
		) {
			return;
		}

		var server = Configuration.apiServer;

		console.log(server);
		let headers = new Headers();
		const site = 'Guest';

		headers.append('Authorization', 'Basic ' + Configuration.apiAuth);
		let searchParameter = '';
		if (search) {
			searchParameter += '&search=' + encodeURIComponent(search);
		}

		// TODO more intelligent URI set up
		fetch(
			server +
				'/o/headless-assets/v1.0/sites/' +
				site +
				'/content-sets-elements?pageSize=12&page=' +
				page +
				'&filter=' +
				encodeURIComponent(filter) +
				searchParameter,
			{method: 'GET', headers: headers}
		)
			.then((res) => res.json())
			.then(
				(result) => {
					this.setState({
						isLoaded: true,
						items: result.items || [],
						filter: filter,
						// for some reason object.assign does not work here to copy
						appliedCategoryIds: {...categoryIds},
						showFilter: false,
						search: search,
						lastPage: result.lastPage,
						page: result.page,
						pageSize: result.pageSize,
						totalCount: result.totalCount,
						showFilteredOverview: true
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
		// this.fetchData(1, this.state.filter, {}, "");
	}

	navigateVocabulary(index) {
		let currentState = {...this.state};
		currentState.activeVocabularyIndex = index;
		this.setState(currentState);
	}

	render() {
		const {
			error,
			isLoaded,
			items,
			totalCount,
			lastPage,
			page,
			appliedCategoryIds,
			showFilter,
			showFilteredOverview,
			activeVocabularyIndex
		} = this.state;

		if (showFilteredOverview) {
			if (error) {
				return <div>Error: {error.message}</div>;
			} else if (!isLoaded) {
				return <div>Loading...</div>;
			}
			const resourceItems = items.map((resource) => (
				<Resource key={resource.id} resource={resource} />
			));

			let search_notice = [];
			if (this.state.search) {
				search_notice.push(
					<div>Search results for {this.state.search}</div>
				);
			}

			return (
				<div>
					<ResourceHeader totalCount={totalCount} />
					{search_notice}
					<input
						type="text"
						onKeyUp={(evt) => {
							if (evt.key === 'Enter')
								this.search(evt.target.value);
						}}
					/>
					<button
						className="filter-button"
						onClick={() => this.toggleFilter()}
					>
						Filter
					</button>
					<Filter
						showFilter={showFilter}
						onClick={(categoryIds) =>
							this.fetchCategories(categoryIds)
						}
						appliedCategoryIds={appliedCategoryIds}
					/>
					<div className="asset-entries max-full w100">
						<div
							id="resourcesDisplay"
							className="block-container justify-left no-padding-horizontal resources-container"
						>
							{resourceItems}
						</div>
					</div>
					<Pagination
						lastPage={lastPage}
						page={page}
						onClick={(pageNumber) =>
							this.fetchData(
								pageNumber,
								this.state.filter,
								this.state.appliedCategoryIds,
								this.state.search
							)
						}
					/>
				</div>
			);
		} else {
			const vocabularies = Categories.VOCABULARIES.map(
				(vocabulary, index) => (
					<span
						key={index}
						onClick={() => this.navigateVocabulary(index)}
						className={
							activeVocabularyIndex === index
								? 'vocabulary-section active'
								: 'vocabulary-section'
						}
					>
						{vocabulary.name}
					</span>
				)
			);

			const vocabularyCards = Categories.VOCABULARIES[
				activeVocabularyIndex
			].categories.map((category) => (
				<div
					key={category.id}
					className="vocabulary-categories-section block-container"
				>
					<div className="category-cards w50">
						<FeaturedResources
							key={category.id}
							categoryId={category.id}
						/>
					</div>
					<div className="w50 vocabulary-see-all">
						<h2>{category.name}</h2>
						<p>
							Id eget suspendisse in feremntum euismod diam.
							Mauris maecenas id elit
						</p>
						<a
							onClick={() =>
								this.linkToCategory(`${category.id}`)
							}
						>
							{' '}
							See all {category.name}->
						</a>
					</div>
				</div>
			));
			return (
				<div>
					<input
						type="text"
						onKeyUp={(evt) => {
							if (evt.key === 'Enter')
								this.search(evt.target.value);
						}}
					/>
					<button
						className="filter-button"
						onClick={() => this.toggleFilter()}
					>
						Filter
					</button>
					<Filter
						showFilter={showFilter}
						onClick={(categoryIds) =>
							this.fetchCategories(categoryIds)
						}
						appliedCategoryIds={appliedCategoryIds}
					/>
					<div className="vocabulary-container">{vocabularies}</div>
					<div className="vocabulary-cards">{vocabularyCards}</div>
				</div>
			);
		}
	}
}

export default Resources;
