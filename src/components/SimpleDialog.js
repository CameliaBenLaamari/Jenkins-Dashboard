import React from 'react';
import PropTypes from 'prop-types';
import List from '@mui/material/List';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import { Alert, Button, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { useRef } from 'react';
import { useState } from 'react';
import { auth, setCustomWidget } from '../firebase';

function SimpleDialog(props) {

    const { onClose, selectedValue, open } = props;
    const urlRef = useRef();
    const [widgetType, setWidgetType] = useState('github');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    let col = parseInt(localStorage.getItem(auth.currentUser.uid + "/col")) || 3;

    const handleClose = () => {
        onClose(selectedValue);
    };

    const handleListItemClick = (e) => {
        setWidgetType(e.target.value);
    };

    async function handleSubmit(e) {
        e.preventDefault();
        setLoading(true);
        try {
            const item = {
                header: (widgetType === "reddit") ? "Reddit Thread" : "GitHub Repo",
                body: urlRef.current.value
            };
            const position = {
                col: col,
                colSpan: 2,
                rowSpan: (widgetType === "reddit") ? 2 : 1
            };
            await setCustomWidget(auth.currentUser.uid, item, position);
            col = (col + 2) % 4;
            localStorage.setItem(auth.currentUser.uid + "/col", col);
        } catch (err) {
            setError('Failed to add widget');
            console.log(err);
        }

        setLoading(false);
        onClose(selectedValue);
        window.location.reload();
    }

    return (
        <Dialog onClose={handleClose} open={open}>
            <DialogTitle>Add widget</DialogTitle>
            <List style={{ padding: "0 3vh 3vh 3vh", textAlign: "left" }}>
                <p>Choose a widget type and insert the link below:</p>
                <FormControl sx={{ mt: 2, width: "50vh" }}>
                    <InputLabel htmlFor="widget">Widget Type</InputLabel>
                    <Select
                        autoFocus
                        value={widgetType}
                        onChange={handleListItemClick}
                        label="Widget Type"
                        size="small"
                        inputProps={{
                            name: 'widget',
                            id: 'widget',
                        }}
                    >
                        <MenuItem value="github">GitHub Repo</MenuItem>
                        <MenuItem value="reddit">Reddit Thread</MenuItem>
                    </Select>
                    <TextField
                        sx={{ mt: 2 }}
                        label="URL"
                        type="url"
                        size='small'
                        inputRef={urlRef}
                    />
                    {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
                    <Button
                        id="main-button"
                        disabled={loading}
                        type="submit"
                        onClick={handleSubmit}
                    >Add</Button>
                </FormControl>
            </List>
        </Dialog>
    );
}

SimpleDialog.propTypes = {
    onClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
    selectedValue: PropTypes.string.isRequired,
};

export default SimpleDialog
