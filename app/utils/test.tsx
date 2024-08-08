import client from "./postgres"

export default async function Test() {
    const piani = [1,2]
    const sezioni = ["C"]
    const text = 'INSERT INTO cella (id_piano, id_blocco, id_cella, num_letti, tipo) VALUES ($1, $2, $3, 2, $4)'
    for (let index = 0; index < 2; index++) {
        for (let i = 1; i <= 10; i++) {
            let values = [piani[index], sezioni[0], i, 'letto']
            const res = await client.query(text, values)
            console.log(res.rows[0])
        }   
    }
}

Test()

