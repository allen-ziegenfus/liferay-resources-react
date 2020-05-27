import React from 'react';

class Pagination extends React.Component {
	render() {
		/*
        lastPage: 0,
        page:  0,
        pageSize: 0,
        totalCount: 0*/

		var pages = [];
		for (var i = 1; i <= this.props.lastPage; i++) {
			var className = i === this.props.page ? 'active' : 'inactive';
			pages.push({
				page: i,
				className: className
			});
		}
		const pageItems = pages.map((page) => (
			<a
				onClick={() => this.props.onClick(page.page)}
				key={page.page}
				className={`${page.className} page`}
			>
				<span key={page.page}>{page.page}</span>
			</a>
		));

		return <div className="pager">{pageItems}</div>;
	}
}

export default Pagination;
