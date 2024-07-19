import { Cella } from '@/app/dashboard/detenuti/nuovo/page'
import type { NextApiRequest, NextApiResponse } from 'next'
 
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const data = req.body
  const id = await createItem(data)
  res.status(200).json({ id })
}

function createItem(data: Cella) {
    throw new Error('Function not implemented.')
}
