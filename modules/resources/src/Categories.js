const RESOURCE_TYPES = [
	{id: 93352, name: 'Case Studies'},
	{id: 93355, name: 'Technical Whitepapers'},
	{id: 93356, name: 'Business Whitepapers'},
	{id: 93358, name: 'E-books'},
	{id: 93359, name: 'Migration Guides'},
	{id: 171892447, name: 'Research Reports'},
	{id: 174033029, name: 'Product Info'}
];

const TOPICS = [
	{id: 232148895, name: 'Customer Experience'},
	{id: 232148894, name: 'Digital Strategy'},
	{id: 232148893, name: 'Digital Transformation'}
];

const SOLUTIONS = [
	{id: 258877981, name: 'Cloud Solutions'},
	{id: 17991, name: 'Collaboration Platforms'},
	{id: 17992, name: 'Content Management Solutions'},
	{id: 17993, name: 'Customer Portals'},
	{id: 18053, name: 'E-commerce Websites'},
	{id: 18054, name: 'Employee Portals'},
	{id: 18055, name: 'Extranets'},
	{id: 93364, name: 'Intranets'},
	{id: 1671868, name: 'Knowledge Management Platforms'},
	{id: 93365, name: 'Mobile'},
	{id: 93362, name: 'Partner Portals'},
	{id: 93363, name: 'Public Websites'},
	{id: 18060, name: 'Social Networks'},
	{id: 18061, name: 'Student Portals'}
];

const INDUSTRIES = [
	{id: 1671843, name: 'Aerospace & Defense'},
	{id: 1671844, name: 'Agriculture'},
	{id: 17994, name: 'Automotive'},
	{id: 1671845, name: 'Consulting/Market Research'},
	{id: 17995, name: 'Education'},
	{id: 1671848, name: 'Energy'},
	{id: 1671849, name: 'Engineering'},
	{id: 18045, name: 'Financial Services'},
	{id: 190283829, name: 'Food Services'},
	{id: 1671853, name: 'Government (Federal)'},
	{id: 1671851, name: 'Government (State/Local)'},
	{id: 18046, name: 'Healthcare'},
	{id: 1671854, name: 'Hospitality/Leisure'},
	{id: 1671856, name: 'Insurance'},
	{id: 18048, name: 'Manufacturing'},
	{id: 18049, name: 'Media/Entertainment'},
	{id: 18050, name: 'Not For Profit/NGO'},
	{id: 155622870, name: 'Other'},
	{id: 1671858, name: 'Pharmaceuticals'},
	{id: 1671859, name: 'Professional Services (Agency/Business)'},
	{id: 1671861, name: 'Professional Services (Technical/Web/IT)'},
	{id: 1671846, name: 'Retail/Consumer Products'},
	{id: 18047, name: 'Technology'},
	{id: 18052, name: 'Telecommunications'},
	{id: 1849769, name: 'Transportation'},
	{id: 1671862, name: 'Utilities'}
];

const VOCABULARIES = [
	{name: 'Topic', categories: TOPICS},
	{name: 'Type', categories: RESOURCE_TYPES},
	{name: 'Industry', categories: INDUSTRIES},
	{name: 'Solution', categories: SOLUTIONS}
];

// id -> name objects
const topicObject = TOPICS.reduce(
	(map, category) => ({...map, [category.id]: category.name}),
	{}
);
const resourceTypeObject = RESOURCE_TYPES.reduce(
	(map, category) => ({...map, [category.id]: category.name}),
	{}
);
const solutionsTypeObject = SOLUTIONS.reduce(
	(map, category) => ({...map, [category.id]: category.name}),
	{}
);
const industriesTypeObject = INDUSTRIES.reduce(
	(map, category) => ({...map, [category.id]: category.name}),
	{}
);

const allCategories = {
	...topicObject,
	...resourceTypeObject,
	...solutionsTypeObject,
	...industriesTypeObject
};

// id -> vocabulary objects

const topicVocabObject = TOPICS.reduce(
	(map, category) => ({...map, [category.id]: 'Topic'}),
	{}
);
const resourceVocabTypeObject = RESOURCE_TYPES.reduce(
	(map, category) => ({...map, [category.id]: 'Type'}),
	{}
);
const solutionsVocabTypeObject = SOLUTIONS.reduce(
	(map, category) => ({...map, [category.id]: 'Solution'}),
	{}
);
const industriesVocabTypeObject = INDUSTRIES.reduce(
	(map, category) => ({...map, [category.id]: 'Industry'}),
	{}
);

const categoryToVocab = {
	...topicVocabObject,
	...resourceVocabTypeObject,
	...solutionsVocabTypeObject,
	...industriesVocabTypeObject
};

// id arrays
const topicStates = TOPICS.map((category) => category.id);
const resourceTypesStates = RESOURCE_TYPES.map((category) => category.id);
const solutionStates = SOLUTIONS.map((category) => category.id);
const industryStates = INDUSTRIES.map((category) => category.id);

const allCategoryIds = topicStates
	.concat(resourceTypesStates)
	.concat(solutionStates)
	.concat(industryStates);

// TODO fetch these, handle translations...

let Categories = {
	SOLUTIONS: SOLUTIONS,
	INDUSTRIES: INDUSTRIES,
	RESOURCE_TYPES: RESOURCE_TYPES,
	TOPICS: TOPICS,
	allCategories: allCategories,
	allCategoryIds: allCategoryIds,
	VOCABULARIES: VOCABULARIES,
	categoryToVocab: categoryToVocab
};

export default Categories;
