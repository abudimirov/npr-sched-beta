import React from "react";


const teacher_id = "2559";

export default class FetchTeacherSchedule extends React.Component {
    state = {
        loading: true,
        person: null,
        lessons: null,
        week: null,
        days: null,
        groups: null
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
        console.log(this.state.lessons);
    }

    render() {
        if (this.state.loading) {
            return <div>Загрузка...</div>;
        }

        if (!this.state.person) {
            return <div>Нет данных</div>;
        }
        return (
            <div>
                <h3>{this.state.person.full_name}</h3>
                <div>Расписание с {this.state.week.date_start} по {this.state.week.date_end}</div>
                <div>{this.state.person.id}</div>
                <div>{this.state.person.full_name}</div>
                <div>{this.state.person.chair}</div>
                {this.state.schedule.map((schedule, i) => (
                    <div key={i} className="week__card">
                        <div className="card-body">
                            <h5  className="card-title">{schedule.weekday}</h5>
                            <h5 className="card-title">{schedule.date}</h5>
                            <h5>{this.state.schedule[0].lessons[0].auditories[0].building.name}, ауд. {this.state.schedule[0].lessons[0].auditories[0].name}</h5>


                            {this.state.schedule[i].lessons.map(function(lessons, i) {
                                return (
                                    <span key={i} className="lesson__group">
                                        <ul className="lessons__list">
                                            <li className="lesson__item">
                                                <h5>{lessons.time_start} - {lessons.time_end}</h5>
                                                <p>{lessons.subject}</p>
                                                <p>{lessons.typeObj.name}</p>
                                                <p>{lessons.additional_info}</p>
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