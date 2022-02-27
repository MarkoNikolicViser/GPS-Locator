const Fetching=()=>{
    const url='http://192.168.1.103:3001/'

    const RandomColor=()=>{
    return `#${Math.floor(Math.random()*16777215).toString(16)}`
    }
    const Login=async(email,password)=>{
        const params={email:email, password:password}
        const data=await(await fetch(`${url}login`, {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(params)
          })).json()
          return data
    }
    const Register=async(name,email,password)=>{
      const params={name:name,email:email, password:password,pinColor:RandomColor()}
      const data=await(await fetch(`${url}register`, {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(params)
        })).json()
        return data
  }
  const InsertLocation=async(userId)=>{
    const params={userId}
    const data=await(await fetch(`${url}insert/location`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(params)
      })).json()
      return data
}
    const Tracer=async(userId)=>{
        const params={userId:userId}
        const data=await(await fetch(`${url}tracer`, {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(params)
          })).json()
          return data
    }
    const Tracking=async(userId,locationId)=>{
      const params={userId:userId, locationId:locationId}
        const data=await(await fetch(`${url}constraints/insert`, {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(params)
          })).json()
    }
    const GetAllTracers=async(locationId)=>{
      const params={locationId:locationId}
        const data=await(await fetch(`${url}constraints/getall`, {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(params)
          })).json()
          return data
  }
    const ConstraintsUpdate=async(id,allow)=>{
      const params={id:id, allow:allow}
        const data=await(await fetch(`${url}constraints/update`, {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(params)
          })).json()
    }
    return {Login,Tracer,Register,InsertLocation,Tracking,GetAllTracers,ConstraintsUpdate}
}
export default Fetching