
const Notification = ({ notification }) => {
    console.log(' in notification', notification)

    if (notification.message === null){
        console.log(`${notification.message} if null`)
        return null
    }
    {console.log(`${notification.message} not null`)}
    return (
        <div className={notification.type}>
            {notification.message}
        </div>
    )
}

export default Notification