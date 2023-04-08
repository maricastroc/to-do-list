import styles from './CreateBar.module.css'
import { PlusCircle } from 'phosphor-react'
import { ChangeEvent, FormEvent, InvalidEvent, useState } from 'react'

interface CreateBarProps {
  onCreateNewTask: (taskText: string) => void
}

export function CreateBar(props: CreateBarProps) {
  const [taskText, setTaskText] = useState('')

  function handleSetTaskText(ev: ChangeEvent<HTMLInputElement>) {
    ev.target.setCustomValidity('')
    setTaskText(ev.target.value)
  }

  function handleCreateTask(ev: FormEvent) {
    ev.preventDefault()
    props.onCreateNewTask(taskText)
    setTaskText('')
  }

  function handleNewTaskInvalid(ev: InvalidEvent<HTMLInputElement>) {
    ev.target.setCustomValidity('This field is required!')
  }

  return (
    <form className={styles.createBar} onSubmit={handleCreateTask}>
      <input
        type="text"
        placeholder="Add a new task"
        onChange={handleSetTaskText}
        onInvalid={handleNewTaskInvalid}
        value={taskText}
        spellCheck={false}
        required
      />
      <button>
        Create <PlusCircle size={18} />
      </button>
    </form>
  )
}
