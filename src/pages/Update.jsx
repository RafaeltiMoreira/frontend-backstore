import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Api } from '../api/api';
import CardUpdate from '../components/CardUpdate/CardUpdate';
import { useNavigate } from "react-router-dom"

export default function Update() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate()

  async function fetchData() {
    try {
      const apiUrl = Api.backstore.readAll();
      const response = await Api.buildApiGetRequest(apiUrl);

      if (response.ok) {
        const data = await response.json();
        setProducts(data);
      } else {
        const error = await response.json();
        toast.error('Erro ao carregar produtos: ' + error.message);
      }
    } catch (error) {
      console.error('Erro ao carregar produtos:', error);
      toast.error('Erro ao carregar produtos.');
    }
  }

  async function handleUpdate(id, updatedProduct) {
    try {
      const apiUrl = Api.backstore.update(id);
      const response = await Api.buildApiPutRequest(apiUrl, updatedProduct);

      if (response.ok) {
        setProducts((prevProducts) =>
          prevProducts.map((product) =>
            product._id === id ? { ...updatedProduct, _id: id } : product
          )
        );
        toast.success('Produto alterado com sucesso!');
        navigate('/')
      } else {
        const error = await response.json();
        toast.error('Erro ao alterar produto: ' + error.message);
      }
    } catch (error) {
      console.error('Erro ao alterar produto:', error);
      toast.error('Erro ao alterar produto.');
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <h1>Alterar produto</h1>
      <div className='cards'>
        {products.map((product) => (
          <CardUpdate key={product._id} item={product} onUpdate={handleUpdate} />
        ))}
      </div>
    </>
  );
}