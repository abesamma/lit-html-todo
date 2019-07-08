import { html, LitElement, css } from 'https://unpkg.com/lit-element@2.2.0/lit-element.js?module'

class TodoApp extends LitElement {
    constructor () {
        super();
        this._todos = [];
        this._inputNode;
    }
    static get styles () {
        return css`
            :host {
                display: block;
            }
            button {
                border: none;
                cursor: pointer;
            }
            ul {
                padding: 20px;
                margin: auto;
                width: 50%;
                height: 100%; 
            }
        `
    }
    addTodo () {
        this._inputNode = this.shadowRoot.querySelector('input');
        this._todos.push({
            text: this._inputNode.value,
            checked: false
        });
        this.requestUpdate().then(() => this._inputNode.value = '');
    }
    handleRemoveTodo (e) {
        this._todos.splice(e.detail, 1);
        this.requestUpdate();
    }
    handleToggleTodo (e) {
        const todo = this._todos[e.detail];
        this._todos[e.detail] = Object.assign({}, todo, {
            checked: !todo.checked
        });
        this.requestUpdate();
    }
    render () {
        return html`
            <input type='text' placeholder="Write a todo...">
            <button @click=${this.addTodo} title="Add todo">➕</button>
            <ul>
                ${this._todos.map((todo, index) => html`<todo-item  
                @remove-todo=${this.handleRemoveTodo}
                @toggle-todo=${this.handleToggleTodo}
                index=${index}
                text=${todo.text}
                ?checked=${todo.checked}
                ></todo-item>`)}
            </ul>
        `;
    }
    set todos (obj) {
        this._todos.push(obj);
        this.requestUpdate();
    }
    get todos () {
        return this._todos;
    }
}

self.customElements.define('todo-app', TodoApp);