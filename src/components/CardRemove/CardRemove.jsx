/* eslint-disable react/prop-types */
import { formatNumber } from '../../lib/utils'
import './CardRemove.css'

export default function CardRemove(props) {
  const handleRemoveClick = () => {
    props.onRemove();
  };

  return (
    <div className='card'>
      <h2>{props.item.name}</h2>
      <img src={props.item.image} width={200} alt='Imagem do produto' />
      <p>Quantidade: {props.item.quantity}</p>
      <p>Preço: {formatNumber(props.item.price)}</p>
      <button
        className='btn-remove'
        onClick={handleRemoveClick}
      >
        Remover
      </button>
    </div>
  )
}

