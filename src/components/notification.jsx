
import * as React from "react";
import Button from "@mui/joy/Button";
import Snackbar from "@mui/joy/Snackbar";
import PlaylistAddCheckCircleRoundedIcon from "@mui/icons-material/PlaylistAddCheckCircleRounded";

export default function SnackbarWithDecorators({
    open,
    setOpen,
    type,
    errorMessage,
}) {
    return (
        <React.Fragment>
            <Snackbar
                variant="soft"
                color={type}
                open={open}
                autoHideDuration={1500}
                onClose={() => setOpen(false)}
                anchorOrigin={{ vertical: "top", horizontal: "right" }}
                startDecorator={<PlaylistAddCheckCircleRoundedIcon />}
                endDecorator={
                    <Button
                        onClick={() => setOpen(false)}
                        size="sm"
                        variant="soft"
                        color={type}>
                        Dismiss
                    </Button>
                }>
                {errorMessage}
            </Snackbar>
        </React.Fragment>
    );
}
