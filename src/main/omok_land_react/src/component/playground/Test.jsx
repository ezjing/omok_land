import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';

function MultiplePopovers() {
    const [anchorEl1, setAnchorEl1] = useState(null);
    const [anchorEl2, setAnchorEl2] = useState(null);

    const handlePopoverOpen = (event, anchorElSetter) => {
        anchorElSetter(event.currentTarget);
    };

    const handlePopoverClose = (anchorElSetter) => {
        anchorElSetter(null);
    };

    const open1 = Boolean(anchorEl1);
    const open2 = Boolean(anchorEl2);

    return (
        <div>
            <Button
                aria-owns={open1 ? 'popover1' : undefined}
                aria-haspopup="true"
                onMouseEnter={(e) => handlePopoverOpen(e, setAnchorEl1)}
                // onMouseLeave={() => handlePopoverClose(setAnchorEl1)}
            >
                Open Popover 1
            </Button>
            <Popover
                id="popover1"
                open={open1}
                anchorEl={anchorEl1}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
                onClose={() => handlePopoverClose(setAnchorEl2)}
                disableRestoreFocus
            >
                <Typography>Content for Popover 1</Typography>
            </Popover>

            <Button
                aria-owns={open2 ? 'popover2' : undefined}
                aria-haspopup="true"
                onMouseEnter={(e) => handlePopoverOpen(e, setAnchorEl2)}
                // onMouseLeave={() => handlePopoverClose(setAnchorEl2)}
            >
                Open Popover 2
            </Button>
            <Popover
                id="popover2"
                open={open2}
                anchorEl={anchorEl2}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
                onClose={() => handlePopoverClose(setAnchorEl2)}
                disableRestoreFocus
            >
                <Typography>Content for Popover 2</Typography>
            </Popover>
        </div>
    );
}

export default MultiplePopovers;
