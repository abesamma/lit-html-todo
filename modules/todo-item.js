import { html, LitElement, css } from 'https://unpkg.com/lit-element@2.2.0/lit-element.js?module'

class TodoItem extends LitElement {
    static get properties () {
        return {
            index: { type: Number, reflect: true },
            text: { type: String, reflect: true },
            checked: { type: Boolean, reflect: true }
        }
    }
    static get styles () {
        return css`
            :host {
                display: block;
                text-align: center;
            }
            li {
                overflow-wrap: anywhere;
            }
            button {
                border: none;
                cursor: pointer;
            }
            .checked {
                text-decoration: line-through;
            }
        `
    }
    removeTodo () {
        this.dispatchEvent(new CustomEvent('remove-todo',
            { detail: this.index, bubble: true }
        ));
    }
    toggleTodoDone () {
        this.dispatchEvent(new CustomEvent('toggle-todo',
            { detail: this.index, bubble: true }
        ));
    }
    render () {
        return html`
            <li index=${this.index}>
                <button @click=${this.removeTodo}>✖️</button>
                <label class=${this.checked ? 'checked': ''}>${this.text}</label>
                <input @click=${this.toggleTodoDone} type="checkbox">
            </li>
        `
    }
}

self.customElements.define('todo-item', TodoItem);