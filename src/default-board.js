import { v4 as uuid } from "uuid"

export default {
  name: 'workshop',
  columns: [
    {
      name: 'todo',
      tasks: [
        {
          description: 'test',
          name: 'sixth task',
          id: uuid(),
          userAssigned: null
        }, {
          description: '',
          name: 'first task',
          id: uuid(),
          userAssigned: null
        },
        {
          description: '',
          name: 'second task',
          id: uuid(),
          userAssigned: null
        },
        {
          description: '',
          name: 'and third',
          id: uuid(),
          userAssigned: null
        }
      ]
    },
    {
      name: 'in-progress',
      tasks: [
        {
          description: 'create this trello clone to impress my future employers',
          name: 'fourth task',
          id: uuid(),
          userAssigned: null
        }
      ]
    },
    {
      name: 'done',
      tasks: [
        {
          description: '',
          name: 'fifth task',
          id: uuid(),
          userAssigned: null
        }
      ]
    }
  ]
}
