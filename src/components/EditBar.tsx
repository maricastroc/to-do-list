import styles from './EditBar.module.css'
import { CheckCircle } from 'phosphor-react'
import { ChangeEvent, FormEvent, InvalidEvent, useState } from 'react'

interface EditBarProps {
  initialValue: string
  onSubmit: (updatedText: string) => void
}

export function EditBar(props: EditBarProps) {
  const [updatedText, setUpdatedText] = useState(props.initialValue)

  function handleChangeTextToEdit(ev: ChangeEvent<HTMLInputElement>) {
    ev.target.setCustomValidity('')
    setUpdatedText(ev.target.value)
  }

  function handleSubmitText(ev: FormEvent) {
    ev.preventDefault()
    props.onSubmit(updatedText)
  }

  function handleNewTaskInvalid(ev: InvalidEvent<HTMLInputElement>) {
    ev.target.setCustomValidity('This field is required!')
  }

  return (
    <form className={styles.editBar} onSubmit={handleSubmitText}>
      <input
        value={updatedText}
        onChange={handleChangeTextToEdit}
        spellCheck={false}
        onInvalid={handleNewTaskInvalid}
        required
      />
      <button>
        Update <CheckCircle size={18} />
      </button>
    </form>
  )
}
