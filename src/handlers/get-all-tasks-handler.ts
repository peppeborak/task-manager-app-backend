import { Request, Response } from 'express'

export const getTasksAllHandler = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const tasks = [
      {
        id: 1,
        userId: 1,
        title: 'Test',
        category: null,
        priorityLevel: 'low',
        status: null,
      },
      {
        id: 2,
        userId: 1,
        title: 'Gym',
        category: null,
        priorityLevel: 'high',
        status: null,
      },
    ]

    res.status(200).json(tasks)
    return
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Internal Server Error' })
    return
  }
}
