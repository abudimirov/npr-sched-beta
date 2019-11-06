import React from 'react';
import './App.css';
import FetchTeacherSchedule from "./components/FetchTeacherSchedule";

const teacher_id = "2559";

export default class App extends React.Component {
    render() {
        return (
            <div className="App">
                <FetchTeacherSchedule/>
            </div>
        );
    }
}


export { teacher_id };
