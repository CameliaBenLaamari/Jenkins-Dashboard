import * as React from 'react';
import { IconButton } from '@mui/material';
import SimpleDialog from './SimpleDialog';

const links = ['GitHub Repo', 'Trello Board'];

export default function AddWidget() {

    const [open, setOpen] = React.useState(false);
    const [selectedValue, setSelectedValue] = React.useState("github");

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = (value) => {
        setOpen(false);
        setSelectedValue(value);
    };

    return (
        <div>
            <IconButton>
                <img src="icons/add.png" alt="add" style={{ height: "20vh", opacity: "20%" }} onClick={handleClickOpen} />
            </IconButton>
            <SimpleDialog
                selectedValue={selectedValue}
                open={open}
                onClose={handleClose}
            />
        </div>
    );
}