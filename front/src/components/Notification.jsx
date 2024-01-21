const Notification = ({ message }) => {
    const notification = {
        color: 'green',
        padding: '10px',
        fontSize: '20px',
        borderStyle: 'solid',
        marginRight: '10px',
        marginBottom: '10px',
        backgroundColor: '#F0F8FF',
        borderRadius: '5px'
    }
    if (message === null) {
      return null
    }
  
    return (
      <div style={notification}>
        {message}
      </div>
    )
  }

export default Notification