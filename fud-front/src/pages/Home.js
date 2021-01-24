import React from "react";
import { useSession } from "../firebase/UserProvider";
import Header from "../components/Header";
// import Footer from "../components/Footer";
import NewsFeed from "../components/NewsFeed";
import SavePreview from "../components/SavePreview";
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    newsfeedContainer: {
        paddingTop: theme.spacing(1),
        paddingBottom: theme.spacing(1),
        paddingLeft: theme.spacing(5),
        paddingRight: theme.spacing(5),
        [theme.breakpoints.up('md')]: {
            paddingLeft: theme.spacing(10),
            paddingRight: theme.spacing(10),
        },
        [theme.breakpoints.up('lg')]: {
            paddingLeft: theme.spacing(20),
            paddingRight: theme.spacing(20),
        },
    },
    newsfeed: {
        [theme.breakpoints.up('md')]: {
            margin: 'auto',
        },
    },
    preview: {

    }

}))

function Home(prop) {
    const classes = useStyles();
    const { user } = useSession();
    var [data, setData] = React.useState(getInitData())
    var [savedData, setSaved] = React.useState(getInitData(5))

    if (!user) {
        prop.history.push(`/signin`);
    }
    function getInitData(initialCnt=10) {
        var data = []
        for (var i = 0; i < initialCnt; i++) { data.push(i) }
        return data
    }

    function refreshFeed(detach) {
        setTimeout(() => {
            var data = getInitData();
            detach();
            setData(data);
        }, 1000);
    }

    function loadFeed(detach) {
        setTimeout(() => {
            var newData = Object.assign([], data)
            for (var i = 0; i < 3; i++) {
                newData.push(i)
            }
            detach();
            setData(newData);
        }, 1000);
    }
    function refreshSaved(detach) {
        setTimeout(() => {
            var data = getInitData(5);
            detach();
            setSaved(data);
        }, 1000);
    }

    function loadSaved(detach) {
        setTimeout(() => {
            var newData = Object.assign([], data)
            for (var i = 0; i < 3; i++) {
                newData.push(i)
            }
            detach();
            setSaved(newData);
        }, 1000);
    }

    return (
        <div>
            <Header></Header>
            <Grid container maxWidth="md" component="main" className={classes.container}>
                <Grid item xs={12} md={9} className={classes.newsfeedContainer}>
                    <NewsFeed
                    className={classes.newsfeed}
                        dataSource={data}
                        onFeedRefresh={refreshFeed}
                        onFeedLoad={loadFeed} />
                </Grid>
                <Grid item xs={12} md={3} className={classes.previewContainer}>
                    <SavePreview 
                    className={classes.preview}
                        dataSource={savedData}
                        onFeedRefresh={refreshSaved}
                        onFeedLoad={loadSaved} />
                </Grid>
            </Grid>
            {/* <Footer></Footer> */}
        </div>
    );
};

export default Home;
