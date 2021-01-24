import React from "react";
import { useSession } from "../firebase/UserProvider";
import Header from "../components/Header";
import Footer from "../components/Footer";
import NewsFeed from "../components/NewsFeed";
import { Container } from "@material-ui/core";

function Home(prop) {
    const { user } = useSession();
    var [data, setData] = React.useState(getInitData())
    if (!user) {
        prop.history.push(`/signin`);
    }
    function getInitData() {
        var data = []
        for (var i = 0; i < 10; i++) { data.push(i) }
        return data
    }

    function refresh(detach) {
        setTimeout(() => {
            var data = getInitData();
            detach();
            setData(data);
        }, 1000);
    }

    function load(detach) {
        setTimeout(() => {
            var newData = Object.assign([], data)
            for (var i = 0; i < 3; i++) {
                newData.push(i)
            }
            detach();
            setData(newData);
        }, 1000);
    }

    return (
        <div>
            <Header></Header>
            <Container maxWidth="md" component="main">
                <Container>
                    <div></div>
                    <NewsFeed
                        dataSource={data}
                        onFeedRefresh={refresh}
                        onFeedLoad={load} />
                </Container>
            </Container>
            <Footer></Footer>
        </div>
    );
};

export default Home;
