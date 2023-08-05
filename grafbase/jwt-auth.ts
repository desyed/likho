export default function ({ request } : any): { identity: { sub: string, groups: string[] } } {
    const { headers } = request

    const jwt = headers['authorization']

    // Verify JWT...

    console.log('JWT: ', jwt)

    return { identity: { sub: 'user1', groups: ['g1'] } }
}