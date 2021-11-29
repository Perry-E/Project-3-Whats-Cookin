
export class Ingredient {
	constructor(amount, unit, name) {
		this.amount = amount || '';
		this.unit = unit || '';
		this.name = name || '';
	}
}

export class Step {
	constructor(title, body) {
		this.title = title || '';
		this.body = body || '';
	}
}
