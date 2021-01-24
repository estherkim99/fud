import React from 'react'
import ReactDOM from 'react-dom'
import FeedCard from './FeedCard';
import LoadingWheel from './LoadingWheel'

export default function RefreshableNewsFeed({dataSource, onFeedRefresh, onFeedLoad}) {
    var wrapper = React.useRef();
    var refreshingWheel = React.useRef();
    var loadingWheel = React.useRef();
    const [isRefreshing, setIsRefreshing] = React.useState(false)
    const [isLoading, setIsLoading] = React.useState(false)

    var feed = dataSource.map(function (item, index) {
        return <FeedCard key={index} />
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
        <div ref={wrapper} onScroll={handleScroll}
        style={{ height: 'calc(100vh - 100px)', overflowY: 'scroll' }}>
            <div ref={refreshingWheel} />
            <div>{feed}</div>
            <div ref={loadingWheel} />
        </div>
    )
}