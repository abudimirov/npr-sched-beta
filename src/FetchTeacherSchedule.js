import React from "react";

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

    }

    render() {
        if (this.state.loading) {
            return <div>Загрузка...</div>;
        }

        if (!this.state.person) {
            return <div>Нет данных</div>;
        }

        if (!this.state.schedule.length) {
            return <div>На эту неделю занятия не поставлены</div>;
        }

        return (
            <div>
                <h3>{this.state.person.full_name}</h3>
                <div>{this.state.person.chair}</div>
                <h4>Расписание с {this.state.week.date_start} по {this.state.week.date_end}</h4>
                {this.state.schedule.map((schedule, i) => (
                    <div key={i} className="week__card">
                        <div className="card-body">
                            <div className="flex__group">
                                <div  className="card-title">{schedule.weekday}</div>
                                <div className="card-title">{schedule.date}</div>
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