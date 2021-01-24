import React from 'react'
import ReactDOM from 'react-dom'
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import LoadingWheel from './LoadingWheel'
import { makeStyles } from "@material-ui/core/styles";
import { Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
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

export default function SavePreview({dataSource, onFeedRefresh, onFeedLoad}) {
    const classes =useStyles();
    var wrapper = React.useRef();
    var refreshingWheel = React.useRef();
    var loadingWheel = React.useRef();
    const [isRefreshing, setIsRefreshing] = React.useState(false)
    const [isLoading, setIsLoading] = React.useState(false)

    var cells = dataSource.map(function (item, index) {
        return (
            <Card elevation={0} className={classes.card} key={index}>
                
                <CardMedia className={classes.cardImage} image="/images/dumplings.jpg"></CardMedia>
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