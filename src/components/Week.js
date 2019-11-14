import React from "react";
import {Groups} from "./Groups";
var moment = require('moment');
require('moment/locale/ru');
moment.locale('ru');

export function Week(props) {
    return (
        <div>
            {props.schedule.map((schedule, i) => (
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
                                                    <Groups groups={lesson.groups}/>
                                                    }

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
