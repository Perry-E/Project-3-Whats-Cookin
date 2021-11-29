import {ModalBack, ModalCard} from "./components"

export default function Modal(props) {
  return(
    <ModalBack>
      <ModalCard>
        {props.children}
      </ModalCard>
    </ModalBack>
  )
}