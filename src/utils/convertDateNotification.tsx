function timeAgo(dateString: string) {
	const date = new Date(dateString);
	const now = new Date();

	// Time differences in milliseconds
	const diffMs = now.getTime() - date.getTime();
	const diffSeconds = Math.floor(diffMs / 1000);
	const diffMinutes = Math.floor(diffSeconds / 60);
	const diffHours = Math.floor(diffMinutes / 60);
	const diffDays = Math.floor(diffHours / 24);
	const diffWeeks = Math.floor(diffDays / 7);
	const diffMonths = Math.floor(diffDays / 30.44); // Average month length
	const diffYears = Math.floor(diffDays / 365.25); // Account for leap years

	// Format date for "after 1 year" case
	const formatDate = (date: Date) => {
		const months = [
			'January',
			'February',
			'March',
			'April',
			'May',
			'June',
			'July',
			'August',
			'September',
			'October',
			'November',
			'December',
		];
		const month = months[date.getMonth()];
		const day = date.getDate();
		const year = date.getFullYear();
		return `${month} ${day}, ${year}`;
	};

	// Return appropriate string based on time difference
	if (diffSeconds < 60) {
		return diffSeconds === 1 ? '1 second ago' : `${diffSeconds} seconds ago`;
	} else if (diffMinutes < 60) {
		return diffMinutes === 1 ? '1 minute ago' : `${diffMinutes} minutes ago`;
	} else if (diffHours < 24) {
		return diffHours === 1 ? '1 hour ago' : `${diffHours} hours ago`;
	} else if (diffDays < 7) {
		return diffDays === 1 ? '1 day ago' : `${diffDays} days ago`;
	} else if (diffWeeks < 4) {
		return diffWeeks === 1 ? '1 week ago' : `${diffWeeks} weeks ago`;
	} else if (diffMonths < 12) {
		return diffMonths === 1 ? '1 month ago' : `${diffMonths} months ago`;
	} else {
		// For dates over a year ago, return the formatted date
		return diffYears === 1
			? '1 year ago'
			: `${diffYears} years ago (${formatDate(date)})`;
	}
}

export default timeAgo;
