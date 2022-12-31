export default class Bbbr {
  #left = [null]
  #right = []

  constructor(...initial) {
    const len = initial.length
    const half = (len / 2) | 0.5
    for (let i = half - 1; i >= 0; --i) this.#addLeft(initial[i])
    for (let i = half; i < len; ++i) this.#addRight(initial[i])
  }

  get #offsetLeft() {
    return (this.#left.length - 1) * -1
  }

  get #offsetRight() {
    return this.#right.length
  }

  get length() {
    return this.#left.length + this.#right.length - 1
  }

  get first() {
    return this.getItem(0)
  }

  get last() {
    return this.getItem(this.length - 1)
  }

  clear() {
    this.#left.length = 1
    this.#right.length = 0
    return this
  }

  getItem(i) {
    const offset = i + this.#offsetLeft
    const index = offset < 0 ? offset * -1 : offset
    return offset >= 0 ? this.#right[index] : this.#left[index]
  }

  setItem(i, value) {
    const offset = i + this.#offsetLeft
    if (offset >= 0) this.#right[offset] = value
    else this.#left[offset * -1] = value
    return this
  }

  #addLeft(item) {
    this.#left.push(item)
  }

  #addRight(item) {
    this.#right.push(item)
  }

  #removeLeft() {
    const len = this.length
    if (len) {
      if (len === 1) this.clear()
      else if (this.#left.length > 0) this.#left.pop()
    }
  }

  #removeRight() {
    const len = this.length
    if (len) {
      if (len === 1) this.clear()
      else if (this.#right.length > 0) this.#right.pop()
    }
  }

  toArray() {
    const out = []
    for (let i = 0, len = this.length; i < len; ++i) out.push(this.getItem(i))
    return out
  }

  #balance() {
    const initial = this.toArray()
    const len = this.length
    this.clear()
    const half = (len / 2) | 0.5
    for (let i = half - 1; i >= 0; --i) this.#addLeft(initial[i])
    for (let i = half; i < len; ++i) this.#addRight(initial[i])
  }

  append(item) {
    this.#addRight(item)
    return this
  }

  prepend(item) {
    this.#addLeft(item)
    return this
  }

  head() {
    if (this.#offsetRight === 0) this.#balance()
    this.#removeRight()
    return this
  }

  tail() {
    if (this.#offsetLeft === 0) this.#balance()
    this.#removeLeft()
    return this
  }
}
