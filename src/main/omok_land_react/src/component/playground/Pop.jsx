import React from "react";
import {Box, Button, ClickAwayListener, Popover, Tooltip, Typography} from "@mui/material";

function Pop(props) {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [open, setOpen] = React.useState(false);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleTooltipClose = () => {
        setOpen(false);
    };

    const handleTooltipOpen = () => {
        setOpen(true);
    };

    const oopen = Boolean(anchorEl);
    const id = oopen ? 'simple-popover' : undefined;

    return (
        <div>
            <button type="button" className="btn btn-secondary"
                    data-bs-toggle="popover" data-bs-placement="right"
                    data-bs-title="Custom popover"
                    data-bs-content="This popover is themed via CSS variables.">
                Custom popover
            </button>
            <div>
                <Button aria-describedby={id} variant="contained" onClick={handleClick}>
                    Open Popover
                </Button>
                <Popover
                    open={oopen}
                    anchorEl={anchorEl}
                    onClose={handleClose}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'left',
                    }}
                >
                    <Box sx={{
                        backgroundColor: 'lightblue',
                        border: '2px solid blue',
                        width: '200px',
                        height: '300px'
                    }}>
                        {/* Popover 내용 */}
                        <Typography>Content for Popover</Typography>
                    </Box>
                </Popover>
                <ClickAwayListener onClickAway={handleTooltipClose}>
                    <Tooltip
                        sx={{backgroundColor: 'black'}}
                        PopperProps={{
                            disablePortal: true,
                        }}
                        onClose={handleTooltipClose}
                        open={open}
                        disableFocusListener
                        disableHoverListener
                        disableTouchListener
                        title="Add"
                    >
                        <Button onClick={handleTooltipOpen}>Click</Button>
                    </Tooltip>
                </ClickAwayListener>

            </div>
        </div>
    )
}

export default Pop;