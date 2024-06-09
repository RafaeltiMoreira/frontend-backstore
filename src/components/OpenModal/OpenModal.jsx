/* eslint-disable react/prop-types */
import { useState } from 'react';
import Modal from 'react-modal';
import { formatNumber } from '../../lib/utils';
import { Player } from '@lottiefiles/react-lottie-player';
import { useNavigate } from 'react-router-dom';
import './OpenModal.css';
import add_icon_green from '../../assets/add_icon_green.png';
import remove_icon_red from '../../assets/remove_icon_red.png';

Modal.setAppElement('#root');

export default function OpenModal({ isOpen, onRequestClose, onConfirm, item }) {
  const [quantity, setQuantity] = useState(1);
  const [showAnimation, setShowAnimation] = useState(false);
  const navigate = useNavigate();

  const handleConfirm = () => {
    setShowAnimation(true);
    setTimeout(() => {
      onConfirm(quantity);
      onRequestClose();
      setShowAnimation(false);
      navigate('/');
    }, 1800);
  };

  const incrementQuantity = () => {
    if (quantity < item.quantity) {
      setQuantity(quantity + 1);
    }
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Comprar produto"
      className="content"
      overlayClassName="overlay"
    >
      <div className="confirmation-container">
        {showAnimation && (
          <>
            <Player
              autoplay
              loop
              src="https://lottie.host/df855439-b579-44c5-b4d1-e3ef34b60040/sT6THMVa9C.json"
              style={{ height: '300px', width: '300px' }}
            />
            <h2 className='confirmation-text'>Compra confirmada!</h2>
          </>
        )}
      </div>
      {!showAnimation && (
        <>
          <h2>{item.name}</h2>
          <img src={item.image} width={200} alt='Imagem do produto' />
          <p>{formatNumber(item.price)}</p>
          <div className="quantity-control">
            <label htmlFor="quantity">Quantidade:</label>
            <div className="quantity-buttons">
              <button onClick={decrementQuantity} className="quantity-button">
                <img src={remove_icon_red} alt="" />
              </button>
              <span>{quantity}</span>
              <button onClick={incrementQuantity} className="quantity-button">
                <img src={add_icon_green} alt="" />
              </button>
            </div>
          </div>
          <p>Preço total: {formatNumber(item.price * quantity)}</p>
          <div className='btn-modal'>
            <button className='btn-green' onClick={handleConfirm}>Confirmar</button>
            <button className='btn-red' onClick={onRequestClose}>Cancelar</button>
          </div>
        </>
      )}
    </Modal>
  );
}