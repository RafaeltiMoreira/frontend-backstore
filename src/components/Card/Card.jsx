/* eslint-disable react/prop-types */
import { formatNumber } from '../../lib/utils'
import './Card.css'

export default function Card(props) {

  return (
    <div className='card'>
      <h2>{props.item.name}</h2>
      <img src={props.item.image} width={200} alt='Imagem do produto' />
      <p>Quantidade: {props.item.quantity}</p>
      <p>Preço: {formatNumber(props.item.price)}</p>
      <button
        className='btn-sales'
        onClick={() => props.onClick(props.item)}
      >
        Comprar
      </button>
    </div>
  )
}

