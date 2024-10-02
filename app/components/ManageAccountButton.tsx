import { generatePortalLink } from '@/actions/generatePortalLink'
import React from 'react'

const ManageAccountButton = () => {
    return (
        <form action={generatePortalLink}>
            <button type='submit'>Manage Billings</button>
            </form>
    )
}

export default ManageAccountButton