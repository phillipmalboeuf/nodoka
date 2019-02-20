

interface CartState {
	item_count: number,
	items: {
		id: number,
		key: string,
		url: string,
		title: string,
		quantity: number,
		price: number,
		discounted_price: number,
		original_price: number,
		image: string
	}[],
	total_price: number
}

export class Cart {

  public state: CartState
  private headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
	}

	constructor(state: CartState) {
		this.state = state
	}

	fetch() {
		return fetch("/cart.js", {
			headers: this.headers,
			credentials: 'include',
			method: 'GET'
		}).then((response) => {
			return response.json()

		}).then((json) => {
			this.state = json

			return this
		})
	}

	add(id: string, quantity=1, data={}) {
		return fetch("/cart/add.js", {
			headers: this.headers,
			credentials: 'include',
			method: 'POST',
			body: JSON.stringify({ id, quantity, ...data })
		}).then((response) => {
			if (response.ok) {
				return this.fetch()
			} else {
				return response.json().then((json) => {
					throw new Error(`${json.message}: ${json.description}`)
				})
			}
		})
	}

	change(id: string, quantity: number) {
		return fetch("/cart/change.js", {
			headers: this.headers,
			credentials: 'include',
			method: 'POST',
			body: JSON.stringify({
				id: id.toString(),
				quantity: quantity
			})
		}).then((response) => {
			return response.json()

		}).then((json) => {
			this.state = json
			return this
		})
	}

	remove(id: string) {
		return this.change(id, 0)
	}
}
