import React from "react";
import {HashRouter as Router, Route, Link, Switch} from "react-router-dom";


const Home = () => <ul>
    <li><Link to="/t1">Visit the 1</Link></li>
    <li><Link to="/t2">Visit the 2</Link></li>
    <li><Link to="/t3">Visit the 3</Link></li>
    <li><Link to="/t4">Visit the 4</Link></li>
</ul>

const T1 = () => <div>test 1 <Home/></div>
const T2 = () => <div>test 2 <Home/></div>
const T3 = () => <div>test 3 <Home/></div>
const T4 = () => <div>test 4
    <li><Link to="/t1">Visit the 1</Link></li>
    <li><Link to="/t5">Visit the 5</Link></li>
</div>
const T5 = () => (
    <div>5
    </div>

)

const ModalGallery = () => (
    <Router>
        <div>
            <input />
            <Route exact path="/" component={Home} />
            <Route exact path="/t1" component={T1} />
            <Route exact path="/t2" component={T2} />
            <Route exact path="/t3" component={T3} />
            <Route exact path="/t4" component={T4} />
            <Route exact path="/t5" component={T5} />
        </div>
    </Router>
);

export default ModalGallery;
