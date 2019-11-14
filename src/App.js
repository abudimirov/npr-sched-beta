import React from 'react';
import './App.css';
import {Header} from "./components/Header";
import {Week} from "./components/Week";
import {Pager} from "./components/Pager";
import UseAnimations from "react-useanimations";

const teacher_id = "2559";

export default class App extends React.Component {
    state = {
        loading: true,
        person: null
    };

    async componentDidMount() {

        const url = `https://ruz.spbstu.ru/api/v1/ruz/teachers/${teacher_id}/scheduler`;
        const response = await fetch(url);
        const data = await response.json();
        this.setState({
            schedule: data.days,
            person: data.teacher,
            week: data.week,
            days: data.days,
            loading: false
        });
    }
    render() {

        if (this.state.loading) {
            return    <div class="flex center">
                <UseAnimations animationKey="loading" size={56} style={{ padding: 100 }} />
            </div>;
        }

        if (!this.state.person) {
            return <div className="flex center">
                <h3>Нет данных</h3>
            </div>;
        }

        return (
            <div>
                <Header name={this.state.person.full_name}
                        date_start={this.state.week.date_start}
                        date_end={this.state.week.date_end}
                        is_odd={this.state.week.is_odd}/>
                        
                {this.state.schedule.length ? <Week schedule={this.state.schedule}/> : <h3>На эту неделю занятия не поставлены</h3>}
            </div>
        );
    }
}
