import * as React from 'react';
import { TreeView, processTreeViewItems } from '@progress/kendo-react-treeview';
import { auth, getJenkins } from '../firebase';
import { useState, useEffect } from 'react';

function ListJobs() {
    const [jobs, setJobs] = useState({});

    useEffect(() => {
        async function getData(uid) {
            getJenkins(uid).then((result) => {
                setJobs(result['jobs']);
            });
        }
        getData(auth.currentUser.uid);
    }, []);

    console.log(jobs);

    const [expand, setExpand] = React.useState({
        ids: ['Item2'],
        idField: 'text'
    });
    const [select, setSelect] = React.useState(['']);

    const onItemClick = event => {
        setSelect([event.itemHierarchicalIndex]);
    };

    const onExpandChange = event => {
        let ids = expand.ids.slice();
        const index = ids.indexOf(event.item.text);
        index === -1 ? ids.push(event.item.text) : ids.splice(index, 1);
        setExpand({
            ids,
            idField: 'text'
        });
    };

    const json = Object.keys(jobs).map((key) => key = {
        text: jobs[key]['displayName'],
        items: Object.keys(jobs[key]['builds']).map(i => i = { text: "Build n°" + (parseInt(i) + 1) })
    });
    console.log(json);

    return <TreeView id="tree" data={processTreeViewItems(json, {
        select: select,
        expand: expand
    })} expandIcons={true} onExpandChange={onExpandChange} aria-multiselectable={true} onItemClick={onItemClick} />;
};

export default ListJobs;