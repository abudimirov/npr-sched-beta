import React from "react";
var moment = require('moment');
require('moment/locale/ru');
moment.locale('ru');


const teacher_id = "2559";



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
    }

    render() {
        let ofset = i;

        let link = this.props.link;

        if (this.state.loading) {
            return <div>Загрузка...</div>;
        }

        if (!this.state.person) {
            return <div>Нет данных</div>;
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
            <div>
                <header>
                    <h3>{this.state.person.full_name}</h3>
                    <h4>Расписание с&nbsp;
                        {moment(this.state.week.date_start, "YYYY-MM-DD").format("DD MMMM")}
                        &nbsp;по&nbsp;
                        {moment(this.state.week.date_end, "YYYY-MM-DD").format("DD MMMM")}&nbsp;
                        ({this.state.week.is_odd ? 'нечётная неделя' : 'чётная неделя'})
                    </h4>
                </header>
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
                                                <ul className="sched__lesson__groups">
                                                    {lesson.groups.map(function(group, i) {
                                                        return (
                                                            <li key={i} className="groups__item">
                                                                {group.name}
                                                            </li>
                                                        )
                                                    })}
                                                </ul>
                                                <ul className="sched__lesson__auditories">
                                                    {lesson.auditories.map(function(auditorie, i) {
                                                        return (
                                                            <li key={i}>
                                                                {auditorie.building.name}, каб. {auditorie.name}
                                                            </li>
                                                        )
                                                    })}
                                                </ul>
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