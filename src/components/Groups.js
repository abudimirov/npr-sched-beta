import React from "react";

export function Groups(props) {
    return (
        <div>
            Группы:
            {props.groups.map(function(group, i) {
                return (
                    <div key={i} className="groups__item">
                        {group.name}
                    </div>
                )
            })}
        </div>
    );
}
