import PropTypes from 'prop-types';
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Api } from '../api/api'
import Card from '../components/Card/Card'
import OpenModal from '../components/OpenModal/OpenModal'

export default function Home({ onConfirm = () => {} }) {
  const [store, setStore] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  async function fetchData() {
    const apiUrl = Api.backstore.readAll()

    const response = await Api.buildApiGetRequest(apiUrl)

    if (response.ok) {
      const data = await response.json()

      setStore(data)
    } else {
      toast.error('Erro ao carregar lista de produtos.')
    }
  }

  useEffect(function () {
    fetchData()
  }, []);

  const homeModal = (item) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedItem(null);
    setIsModalOpen(false);
  };

  const confirmPurchase = (quantity) => {
    if (selectedItem && typeof onConfirm === 'function') {
      onConfirm(quantity);
    }
    closeModal();
  };

  return (
    <>
      <div className='cards'>
        {store.map(function (sales, index) {
          return <Card key={index} item={sales} onClick={homeModal} />
        })}
      </div>
      {selectedItem && (
        <OpenModal
          isOpen={isModalOpen}
          onRequestClose={closeModal}
          onConfirm={confirmPurchase}
          item={selectedItem}
        />
      )}
    </>
  )
}

Home.propTypes = {
  onConfirm: PropTypes.func,
};