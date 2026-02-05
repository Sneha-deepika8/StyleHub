import React from 'react'

const User = ({userName = "GuestUser"}) => {
  return (
    <div>
        <p>Hello{userName}</p>
    </div>
  )
}

export default User;