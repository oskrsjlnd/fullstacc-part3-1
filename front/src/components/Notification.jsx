const Notification = ({ notification }) => {
  if (notification === null) {
    return null
  }
  const notificationStyle = {
    color: null,
    padding: '10px',
    fontSize: '20px',
    borderStyle: 'solid',
    marginRight: '10px',
    marginBottom: '10px',
    backgroundColor: '#F0F8FF',
    borderRadius: '5px'
  }
  if (notification.type === 'info') {
    notificationStyle.color = 'green'
  } else if (notification.type === 'error') {
    notificationStyle.color = 'red'
  }
  return (
    <div style={notificationStyle}>
      {notification.content}
    </div>
  )
}

export default Notification