import { v4 as uuid } from "uuid"

export default {
  name: 'workshop',
  columns: [
    {
      name: 'todo',
      tasks: [
        {
          description: 'test',
          name: 'actual first task',
          id: "1",
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
          id: "2",
          userAssigned: null
        },
        {
          description: '',
          name: 'and thrid',
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
          name: 'first task',
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
          name: 'first task',
          id: uuid(),
          userAssigned: null
        }
      ]
    }
  ]
}
