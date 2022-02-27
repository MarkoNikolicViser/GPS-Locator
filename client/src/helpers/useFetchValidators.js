const useFetchValidators = () => {
    const url = 'http://192.168.1.103:3001/'

    const UserExist = async (id) => {
        const params = { id: id }
        const data = await (await fetch(`${url}user/get`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(params)
        })).json()
        return data
    }
    const AllreadyFollowing = async (locationId, userId) => {
        const params = { locationId: locationId, userId:userId }
        const data = await (await fetch(`${url}constraints/check`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(params)
        })).json()
        return data
    }
    return { UserExist, AllreadyFollowing }
}
export default useFetchValidators