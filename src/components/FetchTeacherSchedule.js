import React from "react";
import { teacher_id } from "../App";
import {Header} from "./Header";
import {Week} from "./Week";
var moment = require('moment');
require('moment/locale/ru');
moment.locale('ru');


export default class FetchTeacherSchedule extends React.Component {
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
            return  <h3>Загрузка...</h3>;
        }

        if (!this.state.person) {
            return  <h3>Нет данных</h3>;
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

