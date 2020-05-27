import React from 'react';
import Categories from './Categories.js';

// fetch pages?

function FilterCategory(props) {
	return (
		<li key={props.id}>
			<input
				checked={props.checked}
				type="checkbox"
				value={props.id}
				id={props.id}
				onChange={props.onClick}
			/>
			<label htmlFor={props.id}>{props.name} </label>
		</li>
	);
}

function FilterVocabulary(props) {
	return (
		<div className="resources-filter-vocabulary">
			<h5>{props.name}</h5>
			<ul>{props.categories}</ul>
		</div>
	);
}

class Filter extends React.Component {
	constructor(props) {
		super(props);

		// Reduce arrays to object with properties
		const defaultCategoryIdStates = Categories.allCategoryIds.reduce(
			(map, categoryId) => ({...map, [categoryId]: false}),
			{}
		);
		this.state = {
			clickedCategories: defaultCategoryIdStates
		};
	}

	handleBadgeClick(categoryId) {
		this.handleClick(categoryId, false);
		this.props.onClick(this.state.clickedCategories);
	}

	handleClick(categoryId, checked) {
		// changing this to spread operator does strange things... why is that?
		const currentState = Object.assign(this.state.clickedCategories);
		currentState[categoryId] = checked;
		this.setState({
			clickedCategories: currentState
		});
	}

	render() {
		const currentState = this.state.clickedCategories;

		//include this in the functions above?
		const topics = Categories.TOPICS.map((category) => (
			<FilterCategory
				key={category.id}
				id={category.id}
				name={category.name}
				checked={currentState[category.id]}
				onClick={(evt) => {
					this.handleClick(`${category.id}`, evt.target.checked);
				}}
			/>
		));

		const resourceTypes = Categories.RESOURCE_TYPES.map((category) => (
			<FilterCategory
				key={category.id}
				id={category.id}
				name={category.name}
				checked={currentState[category.id]}
				onClick={(evt) => {
					this.handleClick(`${category.id}`, evt.target.checked);
				}}
			/>
		));

		const solutionTypes = Categories.SOLUTIONS.map((category) => (
			<FilterCategory
				key={category.id}
				id={category.id}
				name={category.name}
				checked={currentState[category.id]}
				onClick={(evt) => {
					this.handleClick(`${category.id}`, evt.target.checked);
				}}
			/>
		));

		const industryTypes = Categories.INDUSTRIES.map((category) => (
			<FilterCategory
				key={category.id}
				id={category.id}
				name={category.name}
				checked={currentState[category.id]}
				onClick={(evt) => {
					this.handleClick(`${category.id}`, evt.target.checked);
				}}
			/>
		));

		let categoryId;
		let badge,
			badges = [];
		const appliedCategoryIds = this.props.appliedCategoryIds;
		for (categoryId in appliedCategoryIds) {
			if (appliedCategoryIds[categoryId]) {
				let clickCategoryId = categoryId;
				badge = (
					<span
						key={categoryId}
						onClick={() =>
							this.handleBadgeClick(`${clickCategoryId}`)
						}
						className="applied-category-badge"
					>
						{Categories.allCategories[categoryId]}
					</span>
				);
				badges.push(badge);
			}
		}

		let filterClass = 'hide';
		if (this.props.showFilter) {
			filterClass = '';
		}

		return (
			<div className="resources-filter-wrapper">
				<div className={filterClass}>
					<div className="resources-filter block-container">
						<FilterVocabulary
							key="0"
							name="Topics"
							categories={topics}
						/>
						<FilterVocabulary
							key="1"
							name="Resource Types"
							categories={resourceTypes}
						/>
						<FilterVocabulary
							key="2"
							name="Solutions"
							categories={solutionTypes}
						/>
						<FilterVocabulary
							key="3"
							name="Industries"
							categories={industryTypes}
						/>

						<button
							onClick={() =>
								this.props.onClick(this.state.clickedCategories)
							}
						>
							Apply
						</button>
					</div>
				</div>
				<div className="badge-section">{badges}</div>
			</div>
		);
	}
}

export default Filter;
