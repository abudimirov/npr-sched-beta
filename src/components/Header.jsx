import React from "react";
import { teacher_id } from "../App";
var moment = require('moment');
require('moment/locale/ru');
moment.locale('ru');


export default class Header extends React.Component {
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
            return <h4>Загрузка...</h4>;
        }

        if (!this.state.person) {
            return <h4>Нет данных</h4>;
        }

        if (!this.state.schedule.length) {
            return <div>
                <header>
                    <h3>{this.state.person.full_name}</h3>
                    <h4>Расписание с&nbsp;
                        {moment(this.state.week.date_start, "YYYY-MM-DD").format("DD MMMM")}
                        &nbsp;по&nbsp;
                        {moment(this.state.week.date_end, "YYYY-MM-DD").format("DD MMMM")}&nbsp;
                        ({this.state.week.is_odd ? 'нечётная неделя' : 'чётная неделя'})
                    </h4>
                </header>
                <h3>На эту неделю занятия не поставлены</h3>
            </div>;
        }

        return (

                <header>
                    <h3>{this.state.person.full_name}</h3>
                    <h4>Расписание с&nbsp;
                        {moment(this.state.week.date_start, "YYYY-MM-DD").format("DD MMMM")}
                        &nbsp;по&nbsp;
                        {moment(this.state.week.date_end, "YYYY-MM-DD").format("DD MMMM")}&nbsp;
                        ({this.state.week.is_odd ? 'нечётная неделя' : 'чётная неделя'})
                    </h4>
                </header>

        );
    }
}