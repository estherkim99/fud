import React from 'react'
import { Grid } from "@material-ui/core";
import Header from "../components/Header";
import SavePreview from "../components/SavePreview";
import { makeStyles } from "@material-ui/core/styles";

const userState = {
    dayStart: 7,
    dayEnd: 23
}

const useStyles = makeStyles((theme) => ({
    calendar: {
        height: 'calc(100vh - 84px)',
        overflowY: 'scroll',
        padding: theme.spacing(5)
    }

}))


export default function Plan(props) {
    const classes = useStyles();
    var [savedData, setSaved] = React.useState(getInitData(5))

    function refreshSaved(detach) {
        setTimeout(() => {
            var data = getInitData(10);
            detach();
            setSaved(data);
        }, 1000);
    }

    function loadSaved(detach) {
        setTimeout(() => {
            var newData = Object.assign([], savedData)
            for (var i = 0; i < 3; i++) {
                newData.push(i)
            }
            detach();
            setSaved(newData);
        }, 1000);
    }

    function getInitData(initialCnt = 10) {
        var data = []
        for (var i = 0; i < initialCnt; i++) { data.push(i) }
        return data
    }

    const timeRange = [...Array(userState.dayEnd - userState.dayStart).keys()].map(x => x + userState.dayStart);
    const time = timeRange.map((t, index) => {
        return (
            <tbody key={index}>
                <tr><td>{t}:00</td></tr>
                <tr><td>{t}:30</td></tr>
            </tbody>
        );
    })

    return (
        <div>
            <Header />
            <Grid container maxWidth="md" component="main" className={classes.container}>
                <Grid item xs={12} md={9} className={classes.calendar}>
                    <table>
                        <thead>
                            <tr>
                                <th>Time</th>
                                <th>Monday</th>
                                <th>Tuesday</th>
                                <th>Wednesday</th>
                                <th>Thursday</th>
                                <th>Friday</th>
                                <th>Saturday</th>
                                <th>Sunday</th>
                            </tr>
                        </thead>
                        {time}
                    </table>
                </Grid>
                <Grid item xs={12} md={3} className={classes.previewContainer}>
                    <SavePreview
                        className={classes.preview}
                        dataSource={savedData}
                        onFeedRefresh={refreshSaved}
                        onFeedLoad={loadSaved} />
                </Grid>
            </Grid>
        </div>

    )
}