import React from 'react'
import "@progress/kendo-theme-material/dist/all.css";
import { TileLayout } from "@progress/kendo-react-layout";
import { useState } from "react";

const WidgetOne = () => <div>Widget one</div>;
const WidgetTwo = () => <div>Widget two</div>;

const initialPositions = [
    {
        col: 1,
        colSpan: 2,
        rowSpan: 2,
    },
    {
        col: 3,
        colSpan: 1,
        rowSpan: 1,
    },
];

function Dashboard() {

    const [positions, setPositions] = useState(initialPositions);

    const widgets = [
        {
            header: "Widget one header",
            body: <WidgetOne />,
        },
        {
            header: "Widget two header",
            body: <WidgetTwo />,
        },
    ];

    const handleReposition = e => {
        setPositions(e.value);
    };

    return (
        <div id="dashboard">
            <h1>Jenkins Dashboard</h1>
            <h2>By Ameni Elhassen & Camelia Ben Laamari</h2>
            <TileLayout
                className="tileLayout"
                columns={4}
                rowHeight={255}
                gap={{ rows: 10, columns: 10 }}
                positions={positions}
                items={widgets}
                onReposition={handleReposition}
            />
        </div>
    )

}

export default Dashboard
