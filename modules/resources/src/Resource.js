import React from 'react';
import Configuration from './Configuration.js';
import Categories from './Categories.js';

let UNDEFINED_VOCBAULARY = 'Other';

function getBadgeText(categories, content) {
	let badgeText = '';
	if (isFeatured(categories)) {
		// TODO: translate this
		badgeText = 'Featured';
	} else if (isNew(content)) {
		badgeText = 'New';
	}

	return badgeText;
}

function getCustomFields(content) {
	let customFields = {};

	if (content.customFields) {
		customFields = content.customFields.reduce(
			(map, field) => ({
				...map,
				[field.name]: field.customValue.data || ''
			}),
			{}
		);
	}
	return customFields;
}

function getCategories(content) {
	let categories = {};
	if (content.taxonomyCategories) {
		categories = content.taxonomyCategories.reduce((map, category) => {
			let property = [
				Categories.categoryToVocab[category.taxonomyCategoryId] ||
					UNDEFINED_VOCBAULARY
			];
			let value = category.taxonomyCategoryName;
			if (map[property]) {
				value = value + ' ' + map[property];
			}

			return {...map, [property]: value || ''};
		}, {});
	}
	return categories;
}

function getUrl(content) {
	let server = Configuration.resourceServer;
	if (content.friendlyUrlPath) {
		return server + '/-/' + content.friendlyUrlPath;
	} else if (content.id) {
		return server + '/d/' + content.id;
	}

	// TODO: error handling if cannot create URL
	return '';
}

function isFeatured(categories) {
	// TODO: Q...Should we be really relying on language here?
	return (
		categories[UNDEFINED_VOCBAULARY] &&
		categories[UNDEFINED_VOCBAULARY].indexOf('Featured') != -1
	);
}

function isNew(content) {
	const dateCreated = Date.parse(content.dateCreated);
	const daysSinceCreated = (new Date() - dateCreated) / (1000 * 3600 * 24);

	return daysSinceCreated < 30;
}

function Resource(props) {
	const resource = props.resource;

	const categories = getCategories(resource.content);
	const customFields = getCustomFields(resource.content);

	const badgeText = getBadgeText(categories, resource.content);

	return (
		<div
			className={
				'asset-entry block resource standard-padding ' +
				(isFeatured(categories) ? 'featured' : '') +
				(badgeText ? ' has-resource-badge' : '')
			}
		>
			<span className="resource-badge">{badgeText}</span>
			<a
				className="element-border font-color no-padding w100"
				href={getUrl(resource.content)}
			>
				<div className="flex flex-column resource-wrapper-recent resource-wrapper">
					<img
						src={
							customFields['idio_small_image'] ||
							Configuration.resourceServer +
								Configuration.defaultResourceImgUrl
						}
					/>
					<div className="small-caps">{categories['Type'] || ''}</div>
					<p className="asset-entry-title">{resource.title}</p>
				</div>
			</a>
		</div>
	);
}

export default Resource;
