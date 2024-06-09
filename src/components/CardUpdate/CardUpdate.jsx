/* eslint-disable react/prop-types */
import { formatNumber } from '../../lib/utils';
import './CardUpdate.css';

export default function CardUpdate({ item, onUpdate }) {
  const handleUpdateClick = (e) => {
    e.preventDefault();
    const updatedProduct = {
      name: e.target.name.value,
      image: e.target.image.value,
      quantity: parseInt(e.target.quantity.value),
      price: parseFloat(e.target.price.value)
    };
    onUpdate(item._id, updatedProduct);
  };

  return (
    <div className='cardUpdate'>
      <h2>{item.name}</h2>
      <img className='card-img' src={item.image} width={200} alt='Imagem do produto' />
      <form className='form-update' onSubmit={handleUpdateClick}>
        <div>
          <label htmlFor={`name-${item._id}`}>Nome:</label>
          <input type="text" id={`name-${item._id}`} name="name" defaultValue={item.name} />
        </div>
        <div>
          <label htmlFor={`image-${item._id}`}>Imagem (URL):</label>
          <input type="text" id={`image-${item._id}`} name="image" defaultValue={item.image} />
        </div>
        <div>
          <label htmlFor={`quantity-${item._id}`}>Quantidade:</label>
          <input type="number" id={`quantity-${item._id}`} name="quantity" defaultValue={item.quantity} />
        </div>
        <div>
          <label htmlFor={`price-${item._id}`}>Preço:</label>
          <input type="number" step="0.01" id={formatNumber(`price-${item._id}`)} name="price" defaultValue={item.price} />
        </div>
        <div className="btn-update">
          <button className="btn-update-submit" type="submit">Alterar</button>
        </div>
      </form>
    </div>
  );
}