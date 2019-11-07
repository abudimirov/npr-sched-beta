import React from "react";
import { teacher_id } from "../App";
import {Header} from "./Header";
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

        if (!this.state.schedule.length) {
            return <div>
                <Header name={this.state.person.full_name}
                            date_start={this.state.week.date_start}
                            date_end={this.state.week.date_end}
                            is_odd={this.state.week.is_odd}/>
                <h3>На эту неделю занятия не поставлены</h3>
            </div>;
        }

        return (
            <div>
                <Header name={this.state.person.full_name}
                            date_start={this.state.week.date_start}
                            date_end={this.state.week.date_end}
                            is_odd={this.state.week.is_odd}/>

                {this.state.schedule.map((schedule, i) => (
                    <div key={i} className="week__body">
                        <div className="day__body flex">
                            <div className="day__body__flex flex__item__date">
                                <div className="card-title">{moment(schedule.date, "YYYY-MM-DD").format("DD MMM, ddd")}</div>
                            </div>
                            <ul className="day__body__flex flex__item__sched">
                                {schedule.lessons.map(function(lesson, i) {
                                    return (
                                        <li key={i} className="flex flex__item__sched__lesson">
                                            <div className="lesson__time">
                                                {lesson.time_start} - {lesson.time_end}
                                            </div>
                                            <div className="lesson__item">
                                                <h4>{lesson.subject}</h4>
                                                <span>{lesson.typeObj.name}</span>
                                                <div className="sched__lesson__groups">
                                                    {lesson.additional_info ? lesson.additional_info  :
                                                        <div>
                                                            Группы:
                                                            {lesson.groups.map(function(group, i) {
                                                                return (
                                                                    <div key={i} className="groups__item">
                                                                        {group.name}
                                                                    </div>
                                                                )
                                                            })}
                                                        </div>}

                                                </div>
                                                <div className="sched__lesson__auditories">

                                                    {lesson.auditories.map(function(auditorie, i) {
                                                        return (
                                                            <div key={i}>
                                                                {auditorie.building.name}, каб. {auditorie.name}
                                                            </div>
                                                        )
                                                    })}
                                                </div>
                                            </div>
                                        </li>
                                    )
                                })}
                            </ul>
                        </div>
                    </div>
                ))}
            </div>
        );
    }
}

