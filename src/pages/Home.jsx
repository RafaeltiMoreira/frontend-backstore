import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Api } from '../api/api'
import Card from '../components/Card/Card'

export default function Home() {
  const [store, setStore] = useState([])

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

  async function handleSale(backstore, quantity) {
    const apiUrl = Api.backstore.sale(backstore._id);
    const response = await Api.buildApiPatchRequest(apiUrl, { quantity });

    if (response.ok) {
      const updatedBackstore = await response.json();
      setStore(store.map(p => p._id === backstore._id ? updatedBackstore : p));
      toast.success("Venda realizada com sucesso!");
    } else {
      const body = await response.json();
      toast.error(`Erro ao realizar a venda: ${body.error}`);
    }
  }

  useEffect(function () {
    fetchData()
  }, [])

  return (
    <>
      <div className='cards'>
        {store.map(function (stock, index) {
          return <Card key={index} item={stock} onSale={() => handleSale(stock, 1)} />
        })}
      </div>
    </>
  )
}