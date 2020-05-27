import React from 'react';
import {render} from '@testing-library/react';
import Resource from '../src/Resource';
import Configuration from '../src/Configuration';
import '@testing-library/jest-dom';
import {generateImage} from 'jsdom-screenshot';
import renderer from 'react-test-renderer';
import {toMatchImageSnapshot} from 'jest-image-snapshot';
import '../build/css/styles.css';
expect.extend({toMatchImageSnapshot});

afterEach(() => {
	document.getElementsByTagName('body')[0].innerHTML = '';
});

test('Renders basic web content resource', async () => {
	let resource = {
		content: {
			friendlyUrlPath: 'case-study',
			taxonomyCategories: [
				{
					taxonomyCategoryId: 93352,
					taxonomyCategoryName: 'Case Studies'
				}
			]
		},
		title: 'Test Title'
	};
	const {getByText, queryByText} = render(<Resource resource={resource} />);
	expect(getByText('Test Title')).toBeInTheDocument();
	expect(getByText('Case Studies')).toBeInTheDocument();
	expect(queryByText('Featured')).not.toBeInTheDocument();
	expect(queryByText('New')).not.toBeInTheDocument();
	expect(document.querySelector('a').getAttribute('href')).toBe(
		Configuration.resourceServer + '/-/case-study'
	);
	expect(document.querySelector('img').getAttribute('src')).toBe(
		Configuration.resourceServer + Configuration.defaultResourceImgUrl
	);

	const tree = renderer.create(<Resource resource={resource} />).toJSON();
	expect(tree).toMatchSnapshot();

	const screenshot = await generateImage();
	expect(screenshot).toMatchImageSnapshot();
});

test('Renders featured document resource', async () => {
	const testImageUrl =
		'https://www-dev.liferay.com/documents/10182/244411454/test-image.jpg/41687a03-6722-602f-82e9-21d46f0ad060/test-image.jpg?t=1590459595501';
	let resource = {
		content: {
			dateCreated: new Date(),
			id: 12345,
			customFields: [
				{
					name: 'idio_small_image',
					customValue: {
						data: testImageUrl
					}
				}
			],
			taxonomyCategories: [
				{
					taxonomyCategoryId: 123,
					taxonomyCategoryName: 'Featured'
				},
				{
					taxonomyCategoryId: 174033029,
					taxonomyCategoryName: 'Product Info'
				}
			]
		},
		title: 'Test Featured Title'
	};
	const {getByText, queryByText} = render(<Resource resource={resource} />);
	expect(getByText('Test Featured Title')).toBeInTheDocument();
	expect(getByText('Featured')).toBeInTheDocument();
	expect(getByText('Product Info')).toBeInTheDocument();
	expect(queryByText('New')).not.toBeInTheDocument();
	expect(document.querySelector('a').getAttribute('href')).toBe(
		Configuration.resourceServer + '/d/12345'
	);
	expect(document.querySelector('img').getAttribute('src')).toBe(
		testImageUrl
	);

	const tree = renderer.create(<Resource resource={resource} />).toJSON();
	expect(tree).toMatchSnapshot();

	const screenshot = await generateImage();
	expect(screenshot).toMatchImageSnapshot();
});

test('Renders new resource', async () => {
	let resource = {
		content: {
			dateCreated: new Date(),
			taxonomyCategories: [
				{
					taxonomyCategoryId: 93359,
					taxonomyCategoryName: 'Migration Guides'
				}
			]
		},
		title: 'Test New Title'
	};
	const {getByText, queryByText} = render(<Resource resource={resource} />);
	expect(getByText('Test New Title')).toBeInTheDocument();
	expect(queryByText('Featured')).not.toBeInTheDocument();
	expect(getByText('New')).toBeInTheDocument();

	const tree = renderer.create(<Resource resource={resource} />).toJSON();
	expect(tree).toMatchSnapshot();

	const screenshot = await generateImage();
	expect(screenshot).toMatchImageSnapshot();
});
