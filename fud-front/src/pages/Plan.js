import React from 'react'
import { Grid, Table, TableHead, TableRow, TableCell, TableBody } from "@material-ui/core";
import Header from "../components/Header";
// import SavePreview from "../components/SavePreview";
import { makeStyles } from "@material-ui/core/styles";
import ReactDOM from 'react-dom'
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import LoadingWheel from '../components/LoadingWheel'
import { Typography } from '@material-ui/core';
import Draggable from 'react-draggable';

const userState = {
    dayStart: 7,
    dayEnd: 23
}

const useStyles = makeStyles((theme) => ({
    calendar: {
        height: 'calc(100vh - 84px)',
        overflowY: 'scroll',
        padding: theme.spacing(5)
    },
    wrapper: {
        backgroundColor: '#FFF5F5',
    },
    sectionTitle: {
        fontFamily: 'Redressed, cursive',
        marginTop: theme.spacing(3)
    },
    card: {
        backgroundColor: '#FFF5F5',
        margin: theme.spacing(3)
    },
    cardImage: {
        width: '100%',
        height: '100px',
    }
}))

function SavePreview({ dataSource, onFeedRefresh, onFeedLoad, calendarRef }) {
    const classes = useStyles();
    var wrapper = React.useRef();
    var refreshingWheel = React.useRef();
    var loadingWheel = React.useRef();
    const [isRefreshing, setIsRefreshing] = React.useState(false)
    const [isLoading, setIsLoading] = React.useState(false)

    var cells = dataSource.map(function (item, index) {
        return (

            <Card elevation={0} className={classes.card} key={index}>
                <Draggable
                bounds={calendarRef.current}
                >
                    <CardMedia className={classes.cardImage} image="/images/dumplings.jpg"></CardMedia>
                </Draggable>
            </Card>

        )
    })

    const handleScroll = () => {
        var ref = wrapper.current
        var position = ref.scrollTop + ref.clientHeight

        if (position <= ref.clientHeight) {
            if (!onFeedRefresh || isRefreshing) { return };
            setIsRefreshing(true)
            ReactDOM.render(<LoadingWheel />, refreshingWheel.current);

            onFeedRefresh(() => {
                setIsRefreshing(false)
                ReactDOM.render(<div />, refreshingWheel.current);
            });

        } else if (position >= ref.scrollHeight) {
            if (!onFeedLoad || isLoading) { return };
            setIsLoading(true)
            ReactDOM.render(<LoadingWheel />, loadingWheel.current);

            onFeedLoad(() => {
                setIsLoading(false)
                ReactDOM.render(<div />, loadingWheel.current);
            });
        }

    }
    return (
        <div ref={wrapper} onScroll={handleScroll} className={classes.wrapper}
            style={{ height: 'calc(100vh - 84px)', overflowY: 'scroll' }}>
            <Typography component="h2" className={classes.sectionTitle}>Saved Recipes</Typography>
            <div ref={refreshingWheel} />

            <div>{cells}</div>
            <div ref={loadingWheel} />
        </div>
    )
}

export default function Plan(props) {
    const classes = useStyles();
    var calendar = React.useRef();
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

    const timeRange = [...Array(userState.dayEnd - userState.dayStart + 1).keys()].map(x => x + userState.dayStart);
    const time = timeRange.map((t, index) => {
        return (
            <TableBody key={index}>
                <TableRow><TableCell>{t}:00</TableCell></TableRow>
            </TableBody>
        );
    })

    return (
        <div>
            <Header />
            <Grid ref={calendar} container maxWidth="md" component="main" className={classes.container}>
                <Grid item xs={12} md={9} className={classes.calendar}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Time</TableCell>
                                <TableCell>Monday</TableCell>
                                <TableCell>Tuesday</TableCell>
                                <TableCell>Wednesday</TableCell>
                                <TableCell>Thursday</TableCell>
                                <TableCell>Friday</TableCell>
                                <TableCell>Saturday</TableCell>
                                <TableCell>Sunday</TableCell>
                            </TableRow>
                        </TableHead>
                        {time}
                    </Table>
                </Grid>
                <Grid item xs={12} md={3} className={classes.previewContainer}>
                    <SavePreview
                        className={classes.preview}
                        dataSource={savedData}
                        onFeedRefresh={refreshSaved}
                        onFeedLoad={loadSaved}
                        calendarRef={calendar} />
                </Grid>
            </Grid>
        </div>

    )
}