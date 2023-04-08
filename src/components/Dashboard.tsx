import styles from './Dashboard.module.css'
import Clipboard from '../assets/Clipboard.png'
import { CreateBar } from './CreateBar'
import { ChangeEvent, useState } from 'react'
import { Task } from './Task'

export function Dashboard() {
  const [allTasks, setAllTasks] = useState<any[]>([])

  const [taskID, setTaskID] = useState<number[]>([])

  const [hideTasks, setHideTasks] = useState(true)

  const [tasksNumber, setTasksNumber] = useState(0)

  const [hideEditArea, setHideEditArea] = useState(true)

  const [finishedTasksNumber, setFinishedTasksNumber] = useState(0)

  function createNewTask(newTask: string) {
    setTaskID([...taskID, taskID.length])

    setAllTasks([...allTasks, [taskID.length, newTask, 'unchecked', 'visible']])

    setHideTasks(false)
    setTasksNumber(tasksNumber + 1)
    console.log(allTasks)
  }

  function checkTask(id: number, status: string) {
    const updatedStatusTasks = allTasks.map((task) => {
      if (task[0] === id) {
        if (task[2] === 'unchecked') {
          return [id, task[1], 'checked', task[3]]
        } else {
          return [id, task[1], 'unchecked', task[3]]
        }
      } else {
        return [task[0], task[1], task[2], task[3]]
      }
    })

    setAllTasks(updatedStatusTasks)

    if (status === 'unchecked') {
      setFinishedTasksNumber(finishedTasksNumber - 1)
    } else {
      setFinishedTasksNumber(finishedTasksNumber + 1)
    }
  }

  function updateTask(id: number, newTaskText: string) {
    const updatedTasks = allTasks.map((task) => {
      if (task[0] === id) {
        return [id, newTaskText, task[2], task[3]]
      } else {
        return [task[0], task[1], task[2], task[3]]
      }
    })

    setAllTasks(updatedTasks)
    setHideEditArea(false)
  }

  function deleteTask(idToRemove: number, uncheckButton: boolean) {
    const allTasksWithoutRemovedOne = allTasks.filter((task) => {
      console.log(typeof task[1])
      return task[0] !== idToRemove
    })

    setTasksNumber(tasksNumber - 1)
    setAllTasks(allTasksWithoutRemovedOne)

    if (!uncheckButton) {
      setFinishedTasksNumber(finishedTasksNumber - 1)
    }
  }

  function handleFilterToDo() {
    const tasksToDo = allTasks.map((task) => {
      if (task[2] === 'unchecked') {
        return [task[0], task[1], task[2], 'visible']
      } else {
        return [task[0], task[1], task[2], 'hidden']
      }
    })

    setAllTasks(tasksToDo)
  }

  function handleFilterFinished() {
    const tasksFinished = allTasks.map((task) => {
      if (task[2] === 'checked') {
        return [task[0], task[1], task[2], 'visible']
      } else {
        return [task[0], task[1], task[2], 'hidden']
      }
    })

    setAllTasks(tasksFinished)
  }

  function handleFilterAll() {
    const tasksAll = allTasks.map((task) => {
      return [task[0], task[1], task[2], 'visible']
    })

    setAllTasks(tasksAll)
  }

  function handleSearchTask(ev: ChangeEvent<HTMLInputElement>) {
    const taskToSearch = allTasks.map((task) => {
      if (task[1].includes(ev.target.value)) {
        return [task[0], task[1], task[2], 'visible']
      } else {
        return [task[0], task[1], task[2], 'hidden']
      }
    })

    setAllTasks(taskToSearch)
  }

  return (
    <div className={styles.dashboard}>
      <CreateBar onCreateNewTask={createNewTask} />
      <div
        className={hideEditArea ? styles.hiddenEditArea : styles.editArea}
      ></div>
      <header>
        <strong className={styles.created}>
          Created Tasks <span>{tasksNumber}</span>
        </strong>
        <strong className={styles.finished}>
          Finished{' '}
          <span>
            {finishedTasksNumber} of {tasksNumber}
          </span>
        </strong>
      </header>
      <main>
        <div hidden className={hideTasks ? styles.empty : styles.emptyHidden}>
          <img src={Clipboard} alt="Clipboard" />
          <strong>You do not have any created tasks yet</strong>
          <p>Create tasks and organize your to-do items</p>
        </div>
        <div className={hideTasks ? styles.toolBarHidden : styles.toolBar}>
          <div className={styles.filter}>
            <strong>Filter:</strong>
            <input type="radio" name="filter" onClick={handleFilterAll} />
            <label htmlFor="">All</label>
            <input type="radio" name="filter" onClick={handleFilterToDo} />
            <label htmlFor="">To-Do</label>
            <input type="radio" name="filter" onClick={handleFilterFinished} />
            <label htmlFor="">Finished</label>
          </div>
          <div className={styles.search}>
            <input
              type="text"
              onChange={handleSearchTask}
              placeholder="Search Task"
            />
          </div>
        </div>
        <div className={hideTasks ? styles.tasksHidden : styles.tasks}>
          {allTasks.map((task) => {
            return (
              <Task
                key={task[0]}
                id={task[0]}
                content={task[1]}
                status={task[2]}
                visibility={task[3]}
                onCheck={checkTask}
                onUpdate={updateTask}
                onDelete={deleteTask}
              />
            )
          })}
        </div>
      </main>
    </div>
  )
}
