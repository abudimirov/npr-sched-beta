import React from "react";
var moment = require('moment');
require('moment/locale/ru');

const teacher_id = "2559";
moment.locale('ru');

const weekdayTypes = {
    '1': "Понедельник",
    '2': "Вторник",
    '3': "Среда",
    '4': "Четверг",
    '5': "Пятница",
    '6': "Суббота"
}




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
        console.log(this.state.schedule);
        console.log(this.state.week);
        const date = moment(this.state.schedule.date, "YYYY-MM-DD").format("DD MMM, ddd");

    }

    render() {
        if (this.state.loading) {
            return <div>Загрузка...</div>;
        }

        if (!this.state.person) {
            return <div>Нет данных</div>;
        }

        if (!this.state.schedule.length) {
            return <div>
                <h3>{this.state.person.full_name}</h3>
                <h4>Расписание с {this.state.week.date_start} по {this.state.week.date_end} ({this.state.week.is_odd})</h4>
                <h3>На эту неделю занятия не поставлены</h3>
            </div>;
        }

        return (
            <div>
                <h3>{this.state.person.full_name}</h3>
                <h4>Расписание с {this.state.week.date_start} по {this.state.week.date_end} ({this.state.week.is_odd ? 'нечётная неделя' : 'чётная неделя'})</h4>
                {this.state.schedule.map((schedule, i) => (
                    <div key={i} className="week__card">
                        <div className="card-body">
                            <div className="flex__group">
                                <div className="card-title">{moment(schedule.date, "YYYY-MM-DD").format("DD MMM, ddd")}</div>
                            </div>

                            {schedule.lessons.map(function(lesson, i) {
                                return (
                                    <span key={i} className="flex__group">
                                        <ul className="lessons__list">
                                            <li className="lesson__item">
                                                <h5>{lesson.time_start} - {lesson.time_end}</h5>
                                                <p>{lesson.subject}</p>
                                                <p>{lesson.typeObj.name}</p>
                                                {lesson.groups.map(function(group, i) {
                                                    return (
                                                        <span key={i}>
                                                            <ul className="groups__list">
                                                                <li className="group__item">
                                                                    <p>{group.name}</p>
                                                                </li>
                                                            </ul>
                                                        </span>
                                                    )
                                                })}
                                                {lesson.auditories.map(function(auditorie, i) {
                                                    return (
                                                        <span key={i}>
                                                            <ul className="auditories__list">
                                                                <li className="auditories__item">
                                                                    <p>{auditorie.building.name}, каб. {auditorie.name}</p>
                                                                </li>
                                                            </ul>
                                                        </span>
                                                    )
                                                })}

                                            </li>
                                        </ul>
                                    </span>
                                )
                            })}




                        </div>
                    </div>
                ))}







            </div>
        );
    }
}