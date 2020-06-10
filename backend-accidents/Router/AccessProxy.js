const MS_PER_MINUTE = 60000;

class AccessProxy {
	constructor(durationInMinutes, numberOfRequestsAllowed) {
		this.origins = new Map();
		this.restriction = {
			durationInMinutes,
			numberOfRequestsAllowed,
		};
	}

	makeRequest(origin, date) {
		const originValue = this.origins.get(origin) ? this.origins.get(origin) : [];
		const startDate = new Date(
			date - this.restriction.durationInMinutes * MS_PER_MINUTE,
		);

		const requestsInTimePeriod = originValue.filter(
			(reqDate) => startDate <= reqDate && reqDate <= date,
		);
		const nrOfRequestsInTimePeriod = requestsInTimePeriod.length;

		if (!this.isRequestAllowed(nrOfRequestsInTimePeriod)) {
			return {
				success: false,
				message: `You are not allowed to make more than ${this.restriction.numberOfRequestsAllowed} requests in ${this.restriction.durationInMinutes} minutes!`,
			};
		}

		this.addOrigin(origin, date);
		return {
			success: true,
		};
	}

	addOrigin(origin, date) {
		const originValue = this.origins.get(origin) ? this.origins.get(origin) : [];

		this.origins.set(origin, [...originValue, date]);
	}

	isRequestAllowed(nrOfRequestsInTimePeriod) {
		return nrOfRequestsInTimePeriod < this.restriction.numberOfRequestsAllowed;
	}
}

module.exports = AccessProxy;
