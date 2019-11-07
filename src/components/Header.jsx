import React from "react";
var moment = require('moment');
require('moment/locale/ru');
moment.locale('ru');

export function Header(props) {
    return (
        <header>
            <h3>{props.name}</h3>
            <h4>Расписание с&nbsp;
                {moment(props.date_start, "YYYY-MM-DD").format("DD MMMM")}
                &nbsp;по&nbsp;
                {moment(props.date_end, "YYYY-MM-DD").format("DD MMMM")}&nbsp;
                ({props.is_odd ? 'нечётная неделя' : 'чётная неделя'})
            </h4>
        </header>
    );
}
