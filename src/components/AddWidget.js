import * as React from 'react';
import PropTypes from 'prop-types';
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import AddIcon from '@mui/icons-material/Add';
import { Button, IconButton, TextField } from '@mui/material';
import { useRef } from 'react';
import { auth, setWidget } from '../firebase';

const links = ['GitHub Repo', 'Trello Board'];

function SimpleDialog(props) {
    const { onClose, selectedValue, open } = props;

    const handleClose = () => {
        onClose(selectedValue);
    };

    const handleListItemClick = (link) => {
        addLink(props, link);
    };

    return (
        <Dialog onClose={handleClose} open={open}>
            <DialogTitle>Add widget</DialogTitle>
            <List sx={{ pt: 0 }}>
                {links.map((link) => (
                    <ListItem button onClick={() => handleListItemClick(link)} key={link}>
                        <ListItemAvatar>
                            <Avatar sx={{ bgcolor: 'transparent', color: 'transparent' }}>
                                {(link === "GitHub Repo") ?
                                    <img src="icons/github.svg" alt="github-logo" style={{ height: "4vh" }} />
                                    : <img src="icons/trello.png" alt="trello-logo" style={{ height: "4vh" }} />
                                }

                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary={link} />
                    </ListItem>
                ))}

                <ListItem autoFocus button onClick={() => handleListItemClick('addWidget')}>
                    <ListItemAvatar>
                        <Avatar>
                            <AddIcon />
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary="Add another widget" />
                </ListItem>
            </List>
        </Dialog>
    );
}

function addLink(props, link) {
    const { onClose, selectedValue, open } = props;
    let linkRef;

    const handleClose = () => {
        onClose(selectedValue);
    };

    const git = "https://github-link-card.s3.ap-northeast-1.amazonaws.com/" + linkRef.current.value.splice(19) + ".png";

    const widget = {
        header: link,
        body: (link === "GitHub Repo") ? <a href={linkRef} target="_blank" rel="noreferrer">
            <img src={git} width="460px" />
        </a>
            : <iframe src={linkRef.current.value}></iframe>
    };

    function change(e) {
        linkRef = e.target.value;
    }

    async function handleSubmit(e) {
        e.preventDefault();
        await setWidget(auth.currentUser.uid, widget);
    }

    return (
        <Dialog onClose={handleClose} open={open}>
            <DialogTitle>Enter a link</DialogTitle>
            <TextField
                id="outlined-link-input"
                label="Link"
                type="link"
                size="small"
                onChange={change}
            />
            <Button onClick={handleSubmit}>Add</Button>
        </Dialog>
    );
}

SimpleDialog.propTypes = {
    onClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
    selectedValue: PropTypes.string.isRequired,
};

export default function AddWidget() {

    const [open, setOpen] = React.useState(false);
    const [selectedValue, setSelectedValue] = React.useState(links[1]);

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