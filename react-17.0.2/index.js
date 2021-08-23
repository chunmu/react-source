function App() {
    const [count, setCount] = React.useState(0)
    return <div>
        <div>Hello, React Source Code!</div>
        <div>Number: {count}</div>
        <button onClick={() => setCount(v => v + 1)}>Increment</button>
    </div>
}
const app = <App/>
console.log(app)
ReactDOM.render(app, document.querySelector('#app'))
