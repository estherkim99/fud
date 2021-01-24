import React from "react";
import { useSession } from "../firebase/UserProvider";
import Header from "../components/Header";
// import Footer from "../components/Footer";
import NewsFeed from "../components/NewsFeed";
import SavePreview from "../components/SavePreview";
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const dummy = [
    {
        title:"Pork and Leak Dumplings", 
        user:"viv.s.li", 
        image:"/images/dumplings.jpg", 
        description:"",
        loves:"1.4k",
        time:"15min",
        cost:"5"
    },
    {
        title:"Homemade Lasagna", 
        user:"estherkim99", 
        image:"/images/lasagna.jpeg", 
        description:"",
        loves:"1.4k",
        time:"20min",
        cost:"4"
    },
    {
        title:"Bibimbap", 
        user:"phong.nguyen", 
        image:"/images/bibimbap.jpeg", 
        description:"",
        loves:"1.4k",
        time:"15min",
        cost:"9"
    },
    {
        title:"Vietnamese Pho", 
        user:"viv.s.li", 
        image:"/images/pho.jpg", 
        description:"",
        loves:"1.4k",
        time:"17min",
        cost:"6"
    },
    {
        title:"Korean Friend Chicken", 
        user:"estherkim99", 
        image:"/images/koreanfriendchicken.jpeg", 
        description:"",
        loves:"1.5k",
        time:"35min",
        cost:"12"
    },
    {
        title:"Seafood Tomato Pasta", 
        user:"viv.s.li", 
        image:"/images/seafoodpasta.jpeg", 
        description:"",
        loves:"1.8k",
        time:"15min",
        cost:"5"
    },
    {
        title:"Chicken Tikka Masala", 
        user:"phong.nguyen", 
        image:"/images/chickentikkamasala.jpeg", 
        description:"",
        loves:"1.7k",
        time:"20min",
        cost:"5"
    }
]


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
        for (var i = 0; i < initialCnt; i++) { data.push(dummy[Math.round(Math.random() * 6)]) }
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
                newData.push(dummy[i % 7])
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
            var newData = Object.assign([], savedData)
            for (var i = 0; i < 3; i++) {
                newData.push(dummy[i % 7])
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
